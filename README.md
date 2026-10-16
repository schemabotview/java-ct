# java-ct

**Java — from a first program to reliable applications**, as a GraphL concept app served at
`graphl.in/java-ct/`. Twelve courses, 91 sections, following `JAVA-COURSE-PLAN.md`; one recurring
example — an order-processing application — grows from one printed total to a concurrent,
persisted, diagnosed application. Baseline: **Java SE / JDK 25**.

Scaffolded from [`schemabotview/content-repo-template`](https://github.com/schemabotview/content-repo-template).

| Doc | What it holds |
| --- | --- |
| `JAVA-COURSE-PLAN.md` | the syllabus — chapters, sections, worked illustrations, sources |
| `AUTHORING-PLAN.md` | how the syllabus becomes courses: ids, scene shapes, evidence, order of work |
| `CLAUDE.md` | the route contract, invariants, layout and density rules |

## Status

| course | sections | state |
| --- | --- | --- |
| `first-program` | 6 | authored · examples run on JDK 25.0.2 · density checked · no audio yet |
| `values` | 8 | authored · examples run on JDK 25.0.2 · density checked · no audio yet |
| `objects` | 8 | authored · examples run on JDK 25.0.2 · density checked · no audio yet |
| `interfaces` | 8 | authored · examples run on JDK 25.0.2 · density checked · no audio yet |
| `failures` | 7 | authored · examples run on JDK 25.0.2 · density checked · no audio yet |
| `collections` | 8 | authored · examples run on JDK 25.0.2 · density checked · no audio yet |
| `streams` | 7 | authored · examples run on JDK 25.0.2 · density checked · no audio yet |
| the other 5 | 39 | planned in `AUTHORING-PLAN.md` |

## Running it

```sh
npm install
npm run dev          # http://localhost:5173 — routes are #/<course>-<section>
```

## Verifying a change

```sh
npm run build        # must be clean
npx tsc --noEmit     # must be clean
npm run check        # content budgets: card overflow, slide clipping, dead focus, missing wavs
npm run density      # rendered density per route (needs `npm run dev`); SHOTS=dir saves PNGs
```

…and **the section looked at in the browser**. The guards pass on frames that are visually wrong;
the rendered route is the real bar.

## Layout

```
src/content/<course>/   NN-<section>.ts files + index.ts, registered in src/content/index.ts
src/scenes/<course>/    scenes, registered in src/scenes/index.ts
src/main.tsx            mounts <ConceptApp> from @graphlearning/shell
src/theme.css           Java orange / Java blue — the repo's whole design surface
scripts/                check-content.mjs · density.mjs · colab notebook · concept.json · titles.json
public/audio/<course>/  narration wavs (Colab + Chatterbox, never by hand)
```
