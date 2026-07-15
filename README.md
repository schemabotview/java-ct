# java-ct

Video-first **Java** content for the [`graphl-movie`](../graphl-movie) app. A **content repo** — no build, no run. The app fetches this repo's `manifest.json` + notebooks + slides + audio at runtime and renders/records the lesson.

- **Source of truth:** the graphl-ux-era `../java-content` (12 module notebooks) is the reference the per-section notebooks are split from and refined for video.
- **Scenes** live app-side in `graphl-movie/src/scenes/` (`java-jvm`, `java-anatomy`), referenced here by id.

## Curriculum (12 modules)

| # | Module |
| - | ------ |
| 01 | Java Essentials |
| 02 | OOP & Modern Types |
| 03 | Collections & Generics |
| 04 | Functional Java & Streams |
| 05 | Errors, Files & I/O |
| 06 | Concurrency & Virtual Threads |
| 07 | JVM, Reflection, Build & Testing |
| 08 | Spring Core |
| 09 | Spring Web |
| 10 | Spring Data |
| 11 | Spring Boot in Production |
| 12 | Spring Cloud |

## Layout

```
java-ct/
  notebooks/   # one .ipynb per SECTION (one ## section each) — source of truth
  tts/         # one .tts per section (spoken narration script)
  audio/       # one .wav per section (generated from tts/ via Colab)
  slides/      # one .slide per section (authored right-pane title + bullets)
  scripts/     # colab_generate_audio.ipynb (tts → wav)
  manifest.json  # wires sections → notebook / slide / scene / highlight / focus / audio
```

Every artifact for a section shares the stem `<NN>-<SS>-<slug>`.
