# Authoring plan — `JAVA-COURSE-PLAN.md` → GraphL courses

How the 12-chapter, 91-section syllabus becomes 12 courses of `(scene, slide, narration)` sections.
The syllabus decides **what** is taught; this file decides **how each frame shows it** and in what
order the work is done. `CLAUDE.md` holds the rules every frame must meet.

## Mapping

- **One chapter = one course. One syllabus section = one GraphL section.** Section counts stay
  exactly 6, 8, 8, 8, 7, 8, 7, 8, 7, 9, 7, 8 = 91.
- **Course id** = a short noun for the chapter (table below). **Section id** = kebab-case of the
  section's core idea, unique within its course. Route = `#/<course>-<section>`.
- **Scene ids** carry a course prefix because ids are global: `fp-` `val-` `obj-` `ifc-` `fail-`
  `col-` `str-` `bnd-` `bld-` `cc-` `int-` `jvm-`.
- **The order example runs through every course.** Each scene reuses the same names (`Order`,
  `LineItem`, `unitCents`, `quantity`, `shippingCents`, 1250 × 3 + 499 = 4249) so a learner never
  re-reads a new domain. Secondary examples appear only where the syllabus says the main example's
  assumptions stop applying.

## Per-section recipe

Follows the syllabus's teaching method: objective → mental model → annotated code and result trace →
contrasting failure or design → outcome → bridge.

| Part | Rule |
| --- | --- |
| **Scene** (left) | The mental model or the evidence: a diagram, a code card, or a code card plus the diagram it implies. Code and transcripts are **run on JDK 25** first and pasted from the run. One `focus` per section, on the node the slide is about. |
| **Slide** (right) | One-sentence lead, two or three `###` groups, 7–9 short bullets. Modelled 865–1000px (`npm run check -- --density`). The contrasting failure goes here as a bullet group when the scene shows the correct path, or vice versa. |
| **Narration** | 150–200 words of flowing prose that walks the scene in reading order, names the expected value, and ends on the bridge to the next section. Never a reading of the bullets. |

## Scene vocabulary — what each kind is for in this course

| Engine kind | Use it for |
| --- | --- |
| `code` | source, `javap` output, terminal transcripts, stack traces, `jshell` sessions, POM excerpts, thread dumps |
| `memory` | stack frames and heap objects: copied primitives vs copied references (ch 2), aliasing (ch 3), retained objects (ch 12) |
| `table` | collection contents and keyed maps (ch 6), JDBC result sets (ch 11), comparison matrices |
| `list` | step sequences, checklists, "first debugging steps" |
| container + leaves | architectures: JDK/JVM, packages and dependency direction, executor + workers, client/server |
| `plot` | measured behaviour only: warm-up curves (ch 12), latency under load (ch 10) — data from a real run |
| `evolution` | release lines where the comparison is the point (Java versions for `--release`, ch 9) |
| edges with labels | the verb that connects two artefacts — `javac`, `java`, `throws`, `commits` |

## The twelve courses

Section ids are proposals; the shape column is the scene each section is planned around.

### 1 · `first-program` — A first program and the Java execution model — 6 — **authored**
`problem-to-output` · `source-to-jvm` · `compile-and-run` · `tool-roles` · `entry-points` · `failure-stages`
Shapes: inputs → algorithm → code → output chain; `javap` bytecode between source and JVM container;
compact source file + two terminal workflows; `jshell` session + four tool cards; compact vs named
class + `args` transcript; three failure-stage cards + debugging list.

### 2 · `values` — Values, expressions and control flow — 8 — **authored**
`types-and-null` · `variables-and-scope` · `operators-and-overflow` · `strings-and-equality` ·
`branching-and-switch` · `loops` · `arrays` · `methods-and-recursion`
Shapes: `memory` stack-vs-heap for primitives/references/null; scope boxes; overflow transcript
(`Integer.MAX_VALUE + 1`); `==` vs `equals` on two `memory` boards; switch-expression code card;
running-total trace table with an off-by-one row; array `memory`; method-call `memory` showing a
copied reference value, rebinding vs mutation.

### 3 · `objects` — Objects and domain modelling — 8 — **authored**
`classes-and-identity` · `constructors-and-invariants` · `encapsulation` · `static-and-lifetime` ·
`composition` · `records-and-immutability` · `enums-and-states` · `equality-and-hashing`
Shapes: `Order`/`LineItem` grown from loose variables; shared-reference `memory` before and after a
mutation; rejected-quantity stack trace; record with a mutable list → defensive copy; enum state
graph; identity vs value equality board.

### 4 · `interfaces` — Interfaces, variation and reusable design — 8 — **authored**
`interfaces-and-contracts` · `dispatch-and-overloading` · `abstract-classes` · `composition-vs-inheritance` ·
`sealed-and-patterns` · `nested-classes` · `annotations-and-reflection` · `api-evolution`
Shapes: two `PricingPolicy` implementations behind one interface; compile-time overload vs runtime
dispatch side by side; broken-subclass vs delegation; sealed `Result` hierarchy + exhaustive switch;
annotation → processor/runtime consumer; compatible vs caller-visible change.

### 5 · `failures` — Failures, resources, testing and debugging — 7 — **authored**
`exceptions-and-traces` · `checked-unchecked` · `wrapping-causes` · `try-with-resources` ·
`error-boundaries` · `unit-tests` · `debugging-evidence`
Shapes: rejected order through three calls with the causal trace; primary + suppressed exception
timeline; catch-at-boundary vs swallow; JUnit Jupiter test + its failure report (pinned JUnit and
Surefire versions, run with Maven).

### 6 · `collections` — Generics and collection contracts — 8 — **authored**
`generics-basics` · `variance-and-wildcards` · `erasure` · `collection-choices` · `iteration-and-views` ·
`hashing-and-ordering` · `complexity-tradeoffs` · `immutable-structures`
Shapes: typed order repository; `List<Subtype>` invalid-insertion board; list/set/map duplicate
`table`s; the mutable-key-lost-in-HashMap `memory`; view vs wrapper vs copy.

### 7 · `streams` — Lambdas and stream transformations — 7 — **authored**
`functional-interfaces` · `captures` · `stream-pipelines` · `filter-map-flatten` · `reduction-and-collectors` ·
`optional` · `side-effects-and-parallel`
Shapes: loop → pipeline with equal results; laziness trace (print per stage); shared mutable
accumulator vs collector; non-associative reduction gone wrong in parallel.

### 8 · `boundaries` — Text, time, files and data boundaries — 8 — **authored**
`unicode-and-encodings` · `parsing-and-locale` · `bigdecimal-and-rounding` · `time-and-clocks` ·
`paths-and-files` · `streams-and-buffering` · `formats-and-serialization` · `atomic-writes`
Shapes: `length()` vs code points on one string; cents → `BigDecimal` with a rounding decision;
local time vs instant across a DST change; temp-file + move vs partial write timeline.

### 9 · `build` — Application structure, builds and delivery — 7 — **authored**
`packages-and-dependencies` · `project-layout` · `classpath-and-jars` · `maven-lifecycle` ·
`tests-and-ci` · `modules` · `compatibility-and-runtimes`
Shapes: package dependency graph; real POM excerpt and `mvn package` transcript; missing class vs
module-access failure; `--release` `evolution` row.

### 10 · `concurrency` — Concurrency and coordinated work — 9 — **authored**
`tasks-and-executors` · `races-and-visibility` · `locks-and-invariants` · `atomics-and-concurrent-collections` ·
`futures` · `cancellation-and-timeouts` · `virtual-threads` · `bounded-work` · `deadlock-and-liveness`
Shapes: lost-update timeline (two threads, interleaved steps); `ConcurrentHashMap` check-then-act race
vs `merge`; executor lifecycle; virtual vs platform threads on waiting work; real thread-dump excerpt
of a deadlock.

### 11 · `integration` — Network and database integration — 7
`network-foundations` · `http-client` · `deadlines-and-retries` · `jdbc-basics` · `transactions` ·
`security-boundaries` · `integration-testing`
Shapes: request/response timeline; transport failure vs HTTP status; "server applied it, client timed
out" timeline; JDBC result → record mapping; commit/rollback with connection ownership. Local
evidence only (JDK `jwebserver`/a stub, an embedded database).

### 12 · `jvm` — JVM behaviour, diagnosis and application evolution — 8
`class-loading` · `jit-and-optimisation` · `heap-and-gc` · `leaks-and-exhaustion` · `jfr-and-dumps` ·
`measurement` · `releases-and-updates` · `application-review`
Shapes: init failure vs missing class; retained-collection `memory`; warm-up `plot` from a measured
run; JFR/thread-dump excerpts; the final lifecycle diagram of the whole order application.

## Order of work, per course

1. **Run the evidence first.** Write every snippet for the course in a scratch project, run it on
   JDK 25, keep the transcripts. Anything that cannot be run here is labelled as supplied evidence.
2. **Scenes**, then `npm run check` (card budgets, focus ids).
3. **Slides**, then `npm run check -- --density` until every slide is in the 865–1000 band.
4. **Render**: `npm run dev`, `SHOTS=<dir> npm run density -- <course>`; fix flagged routes by
   restacking or adding real content, then look at every PNG.
5. **Narration**, then `scripts/titles.json` entry, then hand over the routes for review.
6. **Audio** last, in one Colab pass per course — once any wav exists, `check` requires all of them.

## Density — how every frame is held to "use the whole screen"

| Measure | Target | How it is checked |
| --- | --- | --- |
| slide height | 80–95 % of the pane | `npm run check -- --density` (model) and `npm run density` (rendered) |
| scene, binding axis | ≥ 0.85 | `npm run density` |
| scene area | ≥ 0.55 | `npm run density` |
| eyebrow | no node under it | `npm run density` |

`first-program` result: all 6 routes inside every target (slide 81–87 %, bind 89 %, area 63–76 %).
