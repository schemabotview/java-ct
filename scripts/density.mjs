// Rendered density check — the half of CLAUDE.md's "Density targets" that `npm run check` cannot
// model. It opens every section route in a real browser at 1920×1080 and measures what was painted:
//
//   slide   rendered content height of the slide panel, as a share of the pane   target 80–95 %
//   bind    the scene board's extent on its BINDING axis, as a share of the pane   target ≥ 0.85
//   area    board width × height, as a share of the pane's area                   target ≥ 0.55
//   eyebrow a node painted under the top-left eyebrow label                        target none
//
// The board is the union of every react-flow node and edge label — what the eye reads as the
// diagram, not the react-flow viewport (which is padded). Targets, not thresholds: a deliberately
// sparse board can sit under them, which is why this script reports and never fails the build.
//
// Needs the dev server:   npm run dev   (in another terminal)
// Then:                   npm run density                 every section
//                         npm run density -- first-program   one course (prefix match on the slug)
//                         SHOTS=dir npm run density        also save a PNG per route into dir
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import puppeteer from 'puppeteer'

const BASE = process.env.BASE_URL ?? 'http://localhost:5173/'
const SHOTS = process.env.SHOTS
const filter = process.argv[2] ?? ''
// Chromium: puppeteer's own download if present, else the cloud image's preinstalled one.
const executablePath = process.env.CHROME ?? (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined)

const T = { slideMin: 0.8, slideMax: 0.95, bind: 0.85, area: 0.55 }

const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })

// Routes are `#/<courseId>-<sectionId>`. Read both ids off src/content the same way check-content
// does — the course id from each course's index.ts, section ids from its NN-*.ts files in order.
const slugs = readdirSync('src/content', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap(({ name }) => {
    const dir = join('src/content', name)
    const course = (readFileSync(join(dir, 'index.ts'), 'utf8').match(/\bid: '([\w-]+)'/) || [])[1]
    return readdirSync(dir)
      .filter((f) => /^\d+-.*\.ts$/.test(f))
      .sort()
      .map((f) => `${course}-${(readFileSync(join(dir, f), 'utf8').match(/\bid: '([\w-]+)'/) || [])[1]}`)
  })
  .filter((s) => s.startsWith(filter))
if (!slugs.length) {
  console.error(`✗ no sections${filter ? ` matching "${filter}"` : ''} in src/content`)
  await browser.close()
  process.exit(1)
}
try {
  await page.goto(BASE, { waitUntil: 'networkidle0' })
} catch {
  console.error(`✗ nothing at ${BASE} — start \`npm run dev\` first`)
  await browser.close()
  process.exit(1)
}
if (SHOTS) mkdirSync(SHOTS, { recursive: true })

const pct = (x) => `${String(Math.round(x * 100)).padStart(3)}%`
const rows = []
for (const slug of slugs) {
  await page.goto(`${BASE}?capture=1#/${slug}`, { waitUntil: 'networkidle0' })
  await page.waitForSelector('.react-flow__node')
  await new Promise((r) => setTimeout(r, 600)) // fitView settles after the first paint
  const m = await page.evaluate(() => {
    const rect = (el) => el.getBoundingClientRect()
    const pane = rect(document.querySelector('.scene-area'))
    const els = [...document.querySelectorAll('.react-flow__node, .react-flow__edgelabel-renderer > *')]
    const rs = els.map(rect).filter((r) => r.width && r.height)
    const box = {
      l: Math.min(...rs.map((r) => r.left)),
      t: Math.min(...rs.map((r) => r.top)),
      r: Math.max(...rs.map((r) => r.right)),
      b: Math.max(...rs.map((r) => r.bottom)),
    }
    // Slide: the painted extent of the scaler's children (the scaler's own box includes padding).
    const panel = document.querySelector('.slide-panel')
    const kids = [...document.querySelectorAll('.slide-panel__scaler *')].map(rect).filter((r) => r.height)
    const slideH = Math.max(...kids.map((r) => r.bottom)) - Math.min(...kids.map((r) => r.top))
    const clipped = Math.max(...kids.map((r) => r.bottom)) > rect(panel).bottom + 1
    // Eyebrow: the top-left label in the scene pane, found as the topmost short text block.
    const eyebrow = [...document.querySelectorAll('.scene-area *')]
      .filter((e) => e.children.length === 0 && e.textContent.trim() && !e.closest('.react-flow'))
      .map(rect)
      .sort((a, b) => a.top - b.top)[0]
    const underEyebrow = eyebrow ? rs.some((r) => r.top < eyebrow.bottom + 8 && r.left < eyebrow.right) : false
    return {
      paneW: pane.width, paneH: pane.height,
      w: box.r - box.l, h: box.b - box.t,
      slideH, slidePaneH: rect(panel).height, clipped, underEyebrow,
    }
  })
  const fw = m.w / m.paneW
  const fh = m.h / m.paneH
  const bind = Math.max(fw, fh)
  const area = fw * fh
  const slide = m.slideH / m.slidePaneH
  const flags = [
    m.clipped && 'slide CLIPS',
    slide < T.slideMin && 'slide thin',
    slide > T.slideMax && 'slide near edge',
    bind < T.bind && `bind ${fw >= fh ? 'w' : 'h'} short`,
    area < T.area && 'area low',
    m.underEyebrow && 'under eyebrow',
  ].filter(Boolean)
  rows.push({ slug, flags })
  console.log(`  slide ${pct(slide)}  bind ${pct(bind)} (${fw >= fh ? 'w' : 'h'})  area ${pct(area)}  board ${Math.round(m.w)}×${Math.round(m.h)}  ${flags.length ? '⚠ ' + flags.join(', ') : '✓'}  ${slug}`)
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/${slug}.png` })
}
await browser.close()

const off = rows.filter((r) => r.flags.length)
console.log(`\n${rows.length - off.length}/${rows.length} routes inside the density targets` +
  ` (slide ${T.slideMin * 100}–${T.slideMax * 100} %, bind ≥ ${T.bind}, area ≥ ${T.area}). Targets, not thresholds — look at the flagged routes.`)
