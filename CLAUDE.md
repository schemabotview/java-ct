# CLAUDE.md — java-ct

A **content repo**, not an app. It holds the **Java** concept, authored **video-first** for the `graphl-movie` app (sibling repo), which loads it **at runtime**. No render engine and no scenes live here — the app fetches this repo's `manifest.json` + notebooks + slides + audio over the network and renders/records them. Read alongside the workspace map in `../CLAUDE.md`, the app contract in `../graphl-movie/CLAUDE.md`, and the references below.

**References (not to copy wholesale):**
- `../java-content/` — the graphl-ux-era Java curriculum: **12 module notebooks** (`notebooks/NN-*.ipynb`) that the per-section notebooks are **split from**, then refined for video. Its manifest already maps sections to the two scenes (`java-jvm`, `java-anatomy`) — a useful `highlight`/`focus` id reference.
- `../apache-spark-ct/` — the mature `-ct` template for structure/style (this repo mirrors its layout + contract).
- `../databricks-data-engineer-ct/` — the sibling `-ct` reference.

There is **nothing to build, run, or test** here. The one executable (later) is the Colab tool that turns `tts/` scripts into `audio/` `.wav`s (`scripts/colab_generate_audio.ipynb`).

## Working agreement

Same as the app repo: **step by step, one small slice, review gate between each.** Settle the shape first (module spine → per-module sections → …), then fill content deliberately. No batch generation.

## The core contract (from graphl-movie — do not break)

1. **The notebook is the single source of truth** for a section's prose and code. `manifest.json` only *wires* — never duplicate notebook content.
2. **One notebook per section** (not per module): each `.ipynb` holds exactly one `## ` section. The section is the atomic unit across all four artifacts — `.ipynb` + `.tts` + `.slide` + `.wav` share the same `NN-SS-slug` stem.
3. Each section has its own **`.ipynb`** (prose/code), **`.tts`** (narration script), **`.wav`** (generated audio), and **`.slide`** (authored right-pane: title + concise bullets). Module title/lede lives in `README.md` + the manifest, not in the section notebooks.
4. A section's diagram images (`![]()`) are **stripped** by the app — the React Flow **scene** replaces them.
5. **Scenes live in the `graphl-movie` app** (`src/scenes/*`). Here you only reference a scene **by id**, plus `highlight` (node ids spotlit) and `focus` (node id(s) the camera frames) per section.

## Scenes (app-side, ported from graphl-ux)

Two scenes cover the language + runtime; wire modules to them via the manifest:

- **`java-jvm`** — the Java-on-the-JVM runtime map (source pipeline → class loader → memory areas → execution engine → CPU). For the runtime/JVM modules.
- **`java-anatomy`** — the language "grammar of a program" (Model ▸ Initialize ▸ Transform ▸ Return + Memory column). For the core-language modules. *(Ported from the code-free `java-anatomy`, not the later `java-model` code-card variant — the owner does not want code nodes in scenes.)*

Spring modules (08–12) have **no scene yet** — to be authored later (they may ride a related scene as a full-strength backdrop in the interim).

## Folder layout

```
java-ct/
  notebooks/   # one .ipynb per SECTION (one ## section each) — source of truth for prose/code
  tts/         # one .tts per section (plain spoken narration script)
  audio/       # one .wav per section (generated from tts/ via Colab)
  slides/      # one .slide per section (authored right-pane title + bullets)
  scripts/     # colab_generate_audio.ipynb (tts → wav)
  manifest.json  # wires sections → notebook / slide / scene / highlight / focus / audio
  CLAUDE.md · README.md
```

Naming: every artifact for a section shares the stem `<NN>-<SS>-<slug>` (`NN` = module number, `SS` = section position, so a sorted glob stays in reading order).

## Narration (per-section TTS)

One `.tts` script **per section**, plain spoken prose — what a teacher would say at a whiteboard. Anchor narration to what's on screen (the notebook `## ` section + its scene focus). Drop the notebook's "what you'll learn" overview and any "What's next" outro — those are reading-only.

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

## Status

Scaffolded (this slice): folder skeleton + `manifest.json` with the **12-module spine** (empty sections), README, this file, Colab script copied from `apache-spark-ct`. Concept wired into the app (`graphl-movie/src/content/catalog.ts` → `java`) and both scenes ported + registered. **Next:** author module 01 end-to-end (split `../java-content/notebooks/01-java-essentials.ipynb` into per-section notebooks → `.slide` + `.tts` → manifest wiring → Colab audio), then repeat per module.
