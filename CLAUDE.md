# CLAUDE.md — java-ct

> The workspace-level `CLAUDE.md` (one level up, in `graphl-workspace`) holds the invariants that
> span every repo. This file is only what is true *here*.

## What this repo is

The **Java** GraphL concept app, served at `graphl.in/java-ct/`. One concept, twelve courses — one
per chapter of `JAVA-COURSE-PLAN.md` — each a list of sections. A **section** is
`(scene, slide, narration)` and is one segment of the course video. One section = one slide.
`AUTHORING-PLAN.md` is the course-by-course plan: ids, scene shapes and evidence per course.

The render engine is `@graphlearning/flow`; the app shell is `@graphlearning/shell`. Both are
**published packages pinned by version** (`flow@^1.2.0`, `shell@^0.8.0`). This repo's own surface is
`src/content/`, `src/scenes/`, `src/main.tsx` and `src/theme.css` — nothing else.

## Route contract

Routes are `#/<courseId>-<sectionId>`; `#/` is the catalog. Course ids, in syllabus order:

| # | course id | chapter |
| --- | --- | --- |
| 1 | `first-program` | A first program and the Java execution model |
| 2 | `values` | Values, expressions and control flow |
| 3 | `objects` | Objects and domain modelling |
| 4 | `interfaces` | Interfaces, variation and reusable design |
| 5 | `failures` | Failures, resources, testing and debugging |
| 6 | `collections` | Generics and collection contracts |
| 7 | `streams` | Lambdas and stream transformations |
| 8 | `boundaries` | Text, time, files and data boundaries |
| 9 | `build` | Application structure, builds and delivery |
| 10 | `concurrency` | Concurrency and coordinated work |
| 11 | `integration` | Network and database integration |
| 12 | `jvm` | JVM behaviour, diagnosis and application evolution |

Only `first-program` is authored so far. Scene ids are globally unique and carry a course prefix
(`fp-` for `first-program`); section files are `src/content/<course>/NN-<section-id>.ts`.

## Java correctness

Every Java snippet, terminal transcript and printed value on a frame must come from a **real run on
JDK 25** (the course's pinned baseline), not from memory — `java --version` in the transcript is the
reference. Record the build used in the scene file's header comment (`first-program` was run on
OpenJDK 25.0.2). Money is integer cents until course 8 introduces `BigDecimal`. Label preview
features as preview wherever they appear.

## Invariants — do not break

- **Never write `x` or `y`.** Scenes are declarative: nodes, edges, nesting. `computeLayout` is not
  exported, so there is no way around this, and that is the point — reproducible frames.
- **Do not reimplement the shell.** `SectionView`, `CourseIndex`, `SlidePanel` and the hooks are
  withheld on purpose. The route contract (`#/<courseId>-<sectionId>`, `?capture=1`,
  `window.__scene.plan()`) is what every recorder drives, and it holds only if every repo composes
  the pieces identically.
- **`SiteHeader` goes on the catalog page only** — never on a section. A section is a video frame.
- **Three stylesheets, in cascade order**, imported in `main.tsx`. The order is load-bearing:
  1. `@graphlearning/flow/styles.css` — react-flow plus the IBM Plex faces the engine is
     *calibrated* to. `codeMetrics` sizes code nodes from a measured 9.02px glyph advance, so a
     different monospace face mis-sizes every code card. Carries the `.tok-*` colours.
  2. `@graphlearning/shell/styles.css` — the shell paints the canvas (`--bg: #1a1d23`; SceneView
     draws its dots at `#2a2f38` assuming a dark surface).
  3. `./theme.css` — this repo's three brand tokens. **Last, or the brand loses to the defaults.**
- **`file:../ui-flow` / `file:../ui-shell` must never be committed.** Local engine work only; CI has
  no sibling checkout.
- **Narration is never hand-produced.** `.tts` → `.wav` via Colab + Chatterbox only.

## Layout rules the frames actually care about

`npm run check` (`scripts/check-content.mjs`) models four silent failures — each builds green and
breaks only on screen. Its comments carry the measured constants; the short version:

- **Leaf cards are a fixed 210×96** with a ~134px text column. Only containers grow to fit. Keep the
  `label` to 2 wrapped lines; 2 label lines + 2 sub lines fits. Watch unbreakable tokens — `_`, `.`
  and `/` are **not** break opportunities in CSS, so `snake_case` and paths overflow sideways in a
  way the height model cannot see.
- **Slides do not scale to fit.** Type size is fixed by the frame (`zoom = paneWidth / 806`,
  width-proportional only), so an over-long slide **clips at the bottom** with no error.
  `check` fails over 1000 modelled design px; the band below gives the floor too. Bullets cost far
  more than prose of the same length.
- **A `focus:` that names no node in its scene is a silent no-op** — nothing lights up.
- **`icon:` names are NOT guarded.** The engine's lucide registry is `Record<string, LucideIcon>`
  and does not enumerate its keys, so a wrong name type-checks, passes `check`, builds, and renders
  a card with no glyph. There are ~75 valid keys; copy one off an existing scene rather than
  guessing a lucide name (`volume`, `move`, `maximize` and `git` are all absent, for instance).
- **A section with no wav narrates silence** and records a silent segment. Audio resolves purely by
  convention: `public/audio/<course>/<section-id>.wav`.

What `check` does *not* model: an edge label landing on top of a card, or whether the frame is too
empty. Look at the route.

### Density targets — the frame must use the space it has

The guarded failure is a slide that overflows. The unguarded one is its opposite: a frame that
builds green, reads correctly, and leaves half its pane empty. Against the ~1080 design px pane:

| | target | why |
| --- | --- | --- |
| slide height | **80–95 %** of the pane (≈ 865–1025px; `SLIDE_H_MAX` caps the top at 1000) | below 80 % the right half looks empty; above ~95 % it risks clipping |
| scene, binding axis | ≥ 0.85 of the pane | the board should reach the edge it is limited by |
| scene, area | ≥ 0.55 of the pane (w × h) | a wide board that fills the width but a third of the height wastes the pane |
| eyebrow | no node under the top-left eyebrow label | boards that bind on height run up to y≈30 |

Levers: **add real content, not padding**; **restack** a board toward the pane's ~1:1 aspect; lower
scene `padding` to 0.04 for boards that float, **raise** it (0.12–0.17) for tall boards that touch
the eyebrow.

`npm run check -- --density` prints every slide's modelled height against the band.
`npm run density` (with `npm run dev` running) measures the **rendered** frames — slide fill, scene
binding axis, scene area, eyebrow collision — and `SHOTS=<dir>` saves a PNG per route to look at.
Both report and never fail: a deliberately sparse board can sit under the targets.

What this repo's pane taught (the scene pane is ~1114×1080 at 1920×1080, so aim boards at ~1:1):

- **Never put two or more ~45-char code cards side by side.** The board goes ~2.5:1 and fitView
  shrinks the code until it is unreadable. Stack them in one column.
- **A 4-wide row of leaves shrinks the whole board.** Use `cols: 2` for four leaves; a 3-wide row
  under a 2-wide block widens a tall board without flattening it.
- **A tall, narrow board is fixed with real content**, not padding — e.g. the platform row in
  `fp-toolchain` both widened the board and made the portability point concrete.
- **Slides land in the band with** a one-sentence lead, two or three `###` groups and 7–9 short
  bullets (≈ 880–990 modelled px).

## Guards before handing over

```sh
npm run build && npx tsc --noEmit && npm run check
npm run dev & npm run density     # rendered density, then look at the flagged routes
```

All three are a **floor, not proof** — they pass on frames that are visually wrong. The rendered
route is the real bar, and the owner reviews it.

## Working agreement

- **Author the whole unit, then hand over the route.** Scenes, slides and narration together.
- **No ASCII sketches of scenes.** A sketch cannot show what the layout engine will do, which is the
  only thing worth looking at.
- **No silent scaffolding**, no work outside the ask. Say plainly what was built, what was verified,
  and what was left out.
