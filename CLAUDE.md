# CLAUDE.md — java-ct

A **content repo**, not an app. It holds the **Java** concept (**core language + runtime only — no Spring**), authored **video-first** for the `graphl-render-app` app (sibling repo; the local mirror of the reference `graphl-movie`), which loads it **at runtime**. No render engine and no scenes live here — the app fetches this repo's `manifest.json` + slides over the network and renders/records them (the `.md` source is authoring provenance; the app does not render it). Read alongside the workspace map in `../CLAUDE.md`, the app contract in `../graphl-render-app/`, and the sibling `-ct` concepts `../sql-ct/` and `../python-ct/`.

This is a video-target (`-ct`) content repo. It is **authored fresh** to the 10×10 contract — the earlier `java-content` (the graphl-ux-era Java curriculum: notebooks split per section, and bundling Spring modules too) is **reference material in git history, not a sibling**, and never something to port wholesale. This concept draws only the **core-language / runtime** material — **ignore the Spring modules** — reshaped into the **10 Java-only modules** in `README.md`: first run → the object model → modern types → collections → generics → functional Java → streams → exceptions & I/O → concurrency → the JVM, build & testing.

Concretely, each section's `.md` is **authored fresh** — one `## ` section per file, holding **all** the teaching content for that section (it is the source of truth; the `.slide` and `.tts` are distilled from it). Diagram images are dropped — the React Flow scene replaces them. **Narration is authored fresh** — every section gets a newly written `.tts`. **The owner generates the `.wav`s via Colab** (`scripts/colab_generate_audio.ipynb`); authoring never copies or commits audio.

There is **nothing to build, run, or test** here. The one executable is the Colab tool that turns `tts/` scripts into `audio/` `.wav`s (`scripts/colab_generate_audio.ipynb`).

## Working agreement

Same as the app repo: **step by step, one small slice, review gate between each.** Settle the shape first (module spine → per-module sections → …), then fill content deliberately. No batch generation.

## The core contract (from graphl-movie — do not break)

1. **The `.md` is the single source of truth** for a section — it holds **all** the section's teaching content. `manifest.json` only *wires* — it must never duplicate `.md` content, and the `.slide`/`.tts` are distilled *from* the `.md` (never richer than it).
2. **One `.md` per section** (not per module): each `.md` holds exactly one `## ` section. The section is the atomic unit across all four artifacts — `.md` + `.tts` + `.slide` + `.wav` share the same `NN-SS-slug` stem — so a section can be authored and reviewed on its own. The manifest references each artifact by path; the `.md`'s single `## ` heading is the section title (mirror it in the manifest `heading`).
3. Each section is the unit the video steps through and has its own **`.md`** (the full section prose/code — source of truth), **`.tts`** (narration script), **`.wav`** (generated audio), and a **`.slide`** file (the authored right-pane: title + concise bullets, distilled from the `.md`). Module title/lede lives in `README.md` + the manifest, not in the section `.md`s.
4. A section's diagram images (`![]()`) are **stripped** by the app — the React Flow **scene** replaces them.
5. **Scenes live in the app** (`graphl-render-app/src/scenes/*`). Here you only reference a scene **by id**, plus `highlight` (node ids that get the spotlight) and `focus` (a node id the camera frames) per section.

## Folder layout

```
java-ct/
  md/          # one .md per SECTION (one ## section each) — the source of truth, all section content
  tts/         # one .tts per section (plain spoken narration script)
  audio/       # one .wav per section (generated from tts/ via Colab)
  slides/      # one .slide per section (authored right-pane title + bullets)
  scripts/     # colab_generate_audio.ipynb (tts → wav)
  manifest.json  # wires sections → md / slide / scene / highlight / focus / audio
  CLAUDE.md · README.md
```

Naming: every artifact for a section shares the stem `<NN>-<SS>-<slug>`, where `NN` = module number, `SS` = section position (so a sorted glob stays in reading order): `md/<NN>-<SS>-<slug>.md`, `tts/…​.tts` → `audio/…​.wav`, `slides/…​.slide`.

## The `.slide` format

A one-screen, scannable Markdown subset — a `# Title`, then `## ` sub-labels, short paragraphs, fenced ` ```java``` ` blocks (keep snippets tiny and legible — a few lines, not a full listing), and numbered / `- ` lists, each key term marked with inline **`**bold**`** (rendered bright white, the rest a softer gray). **Keep the whole slide inside the fixed 1920×1080 frame:** the app's right pane does not scroll or auto-shrink type, so an over-long slide clips top and bottom — trim it to fit (drop connective prose the narration already carries) rather than expecting the engine to resize. Title may be punchier than the `.md` `## ` heading.

## Narration (per-section TTS)

One `.tts` script **per section**, plain spoken prose — what a teacher would say at a whiteboard. Anchor narration to what's on screen (the `.md` `## ` section + its scene focus). Open each clip by speaking the section heading as a plain sentence. Drop pure-reference tables, any "what you'll learn" overview, and any "what's next" outro — the narration carries the throughline, the slide carries the detail.

### TTS guidelines

`.tts` files are read aloud by ChatterboxTTS (typically on a T4 GPU via `scripts/colab_generate_audio.ipynb`). They must be **plain spoken prose**.

- **Plain prose only** — no markdown, no `#` headings, no bullets, no backticks, no asterisks. Write the section title as a plain sentence ending with a full stop (e.g. `Modern Java, not nineteen ninety-eight Java.`).
- **No raw code** — describe what code does conceptually. Never paste code blocks. Method chains like `stream.filter(...).map(...)` become "filter, then map."
- **Spell out symbols and shorthand:**
  - Operators: `/` (integer) → "division" / "slash", `%` → "modulo", `->` → "arrow" (or "maps to"), `==` → "double equals", `.equals()` → "dot equals", `>>>` → "unsigned right shift", `+` (concat) → "plus", `.` (in `spark.version`) → "dot"
  - Acronyms: JVM → "java virtual machine", JDK → "java development kit", JIT → "just-in-time compiler", GC → "garbage collector", OOP → "object-oriented", API → "ay-pee-eye", REPL → "repl", LTS → "long term support", HTML/JSON/SQL → spoken as-is ("H-T-M-L", "jason", "sequel"/"S-Q-L"), IO → "input-output"
  - Keywords stay as spoken words: `var` → "var", `void` → "void", `record` → "record", `switch` → "switch"
  - Versions & years: `21` → "twenty-one", `3.14` → "three point one four", `1995` → "nineteen ninety-five", `2026` → "twenty twenty-six"
  - Variable names: underscores become spaces, common abbreviations expand — `left_ptr` → "left pointer", `idx` → "index"
- **Natural spoken flow** — write as a teacher explains at a whiteboard. Use transitions: "notice that", "the key insight here", "to put it another way", "picture this".
- **Skip visual-only content** — never narrate diagrams, tables, or console output. Describe what the listener should picture instead.
- **Pace with paragraph breaks** — each paragraph = one idea; a blank line between paragraphs gives the TTS engine a natural pause. Aim for 2–4 sentences per paragraph.

**Naming & generation:** `tts/<NN>-<SS>-<slug>.tts` → `audio/<NN>-<SS>-<slug>.wav`; the stem is shared by the `.tts`, the `.wav`, and the manifest `audio` field. Generate with `scripts/colab_generate_audio.ipynb` (owner runs it on Colab), then the manifest `audio` fields resolve as the `.wav`s land.

## Scenes (app-side, ported from graphl-ux)

Two scenes cover the whole concept; wire modules to them via the manifest, referencing a scene **by id** plus per-section `highlight` (node ids spotlit) and `focus` (node id the camera frames):

- **`java-jvm`** — the Java-on-the-JVM runtime map (source pipeline → class loader → memory areas → execution engine → CPU). For the runtime/JVM modules (**09, 10**; module **01** opens on it).
- **`java-anatomy`** — the language "grammar of a program" (Model ▸ Initialize ▸ Transform ▸ Return + Memory column). For the core-language modules (**02–08**; module **01** continues on it after the runtime intro). *(Ported from the code-free `java-anatomy`, not the later `java-model` code-card variant — the owner does not want code nodes in scenes.)*

There is **no Spring scene** — Spring is out of scope for this concept. Per-section `focus`/`highlight` get wired **after** the scenes' node ids settle; the manifest ships `scene` + `spine` + `role:hook` (§01) first.

## Curriculum

The course outline (module spine + per-module sections) lives in [`README.md`](./README.md) — the single human-facing source for structure while we plan; `manifest.json` is the machine source of truth. Don't duplicate the module/section list here.

**Agreed target:** 10 modules × 10 sections, each authored as one standalone narrated video (one dense scene + a linear section walkthrough).

## Status

Re-scoped to **Java-only** and reset to a clean spine: `manifest.json` holds the **10-module spine** (empty sections), `README.md` carries the full **10 × 10 = 100-section** outline, and all per-section artifacts (`md/`, `slides/`, `tts/`, `audio/`) are cleared — nothing authored yet. The prior 12-module Java+Spring content (and its Colab audio) was superseded on `main`; it remains reachable in git history. Concept is wired into the app (`graphl-render-app/src/content/catalog.ts` → `java`) with both scenes ported + registered; **the app's consumer still references the old section slugs — re-wiring it is a separate task.** **Next:** author module 01 end-to-end (per-section `.md` → `.slide` + `.tts` → manifest wiring → Colab audio), then repeat per module.
