# java-ct

Video-first content for the **Java** concept (**core language + runtime only — no Spring**), consumed at runtime by the [`graphl-movie`](../graphl-movie) app. Content only — notebooks, narration (`.tts` → `.wav`), authored one-screen slides (`.slide`: a `# Title`, `## ` sub-labels, short prose, fenced code, and `- `/numbered lists with **bold** key terms), and the wiring `manifest.json`. Nothing to build or run here. For the authoring contract and folder layout, see [`CLAUDE.md`](./CLAUDE.md).

This file is the **course outline** — the human-facing map of modules and sections. It is the plan we author against; the machine source of truth for structure is `manifest.json`.

**Status:** re-scoped to **Java-only** and reset to a clean spine (**10 modules × 10 sections = 100 sections**, below). All per-section artifacts (`notebooks/`, `slides/`, `tts/`, `audio/`) are cleared and `manifest.json` is reset to the empty 10-module spine — nothing authored yet. Scenes `java-jvm` and `java-anatomy` are the two app-side scenes these modules wire to; the former `spring` scene is out of scope for this concept.

## Module spine

Ten modules take the learner from first run to the JVM, build tools, and tests — **no Spring**. Each module is normalized to **10 tight teaching sections** (a section = one narrated slide + scene focus, ≈ one page). **§1 of each module is the hook** — the picture the rest of the module zooms into.

Scene assignment: **core-language modules (02–08) → `java-anatomy`** (the "grammar of a program" map), **runtime/JVM modules (09, 10) → `java-jvm`** (the source→classloader→memory→execution runtime map). **Module 01 straddles both** (a runtime intro on `java-jvm`, then language basics on `java-anatomy`).

| # | Module | Scene |
|---|---|---|
| 01 | Java Essentials | `java-jvm` + `java-anatomy` |
| 02 | Object-Oriented Java | `java-anatomy` |
| 03 | Modern Types & Data Modeling | `java-anatomy` |
| 04 | Collections | `java-anatomy` |
| 05 | Generics | `java-anatomy` |
| 06 | Functional Java & Lambdas | `java-anatomy` |
| 07 | Streams & Optional | `java-anatomy` |
| 08 | Exceptions, Files & I/O | `java-anatomy` |
| 09 | Concurrency & Virtual Threads | `java-jvm` |
| 10 | JVM, Build & Testing | `java-jvm` |

## Sections

### 01 — Java Essentials (10) · `java-jvm` + `java-anatomy`

1. What is Java, and why in 2026? *(hook)*
2. Modern Java, not 1998 Java
3. The JVM context — from source to running code
4. Installing Java & three ways to run it
5. Hello, Java — jshell, jbang, Maven
6. Values, types and the type system
7. `var` and local type inference
8. Expressions, statements and operators
9. Control flow statements
10. Methods, strings and text blocks

### 02 — Object-Oriented Java (10) · `java-anatomy`

1. Classes — the unit of code *(hook)*
2. Encapsulation and visibility
3. Constructors, `this`, and overloading
4. Object basics — `equals`, `hashCode`, `toString`
5. Inheritance and the class hierarchy
6. Polymorphism and dynamic dispatch
7. Abstract classes
8. Interfaces — with default and static methods
9. Nested, inner and anonymous classes
10. Composition over inheritance

### 03 — Modern Types & Data Modeling (10) · `java-anatomy`

1. Modeling data with the right type *(hook)*
2. Enums — a fixed set of constants
3. Enums with state and behaviour
4. Records — one-line immutable data classes
5. Customising and validating records
6. Sealed types — a closed family of subtypes
7. Pattern matching for `instanceof`
8. Pattern matching for `switch` — with guards
9. Record patterns — destructuring
10. Built-in annotations

### 04 — Collections (10) · `java-anatomy`

1. The Collection hierarchy *(hook)*
2. `List` — ordered, indexed, allows duplicates
3. `Set` — no duplicates
4. `Map` — key-to-value lookup
5. `Queue` and `Deque`
6. Iterating collections
7. Immutable factories & defensive copies
8. Sorting — `Comparable` and `Comparator`
9. Equality, hashing and collection contracts
10. Choosing the right collection

### 05 — Generics (10) · `java-anatomy`

1. Why generics *(hook)*
2. Using generic types
3. Writing a generic class
4. Generic methods
5. Bounded type parameters
6. Wildcards — `? extends T`
7. Wildcards — `? super T` and PECS
8. Type erasure — what the JVM actually sees
9. Generics gotchas — arrays and casts
10. Generic APIs in practice

### 06 — Functional Java & Lambdas (10) · `java-anatomy`

1. Functions as values *(hook)*
2. Lambdas — the syntax
3. Method references
4. `Function` and `BiFunction`
5. `Predicate`, `Consumer`, `Supplier`
6. Writing your own functional interface
7. Capturing variables — *effectively final*
8. Composing functions
9. Higher-order methods
10. Functional style — when, and when not

### 07 — Streams & Optional (10) · `java-anatomy`

1. Streams — pipelines over data *(hook)*
2. Creating streams
3. Intermediate operations
4. `map`, `filter` and `flatMap`
5. Terminal operations
6. Reduction and `reduce`
7. Collectors — grouping and joining
8. Parallel streams
9. `Optional<T>` — no more nulls
10. Streams and `Optional` together

### 08 — Exceptions, Files & I/O (10) · `java-anatomy`

1. Why exceptions *(hook)*
2. The `Throwable` hierarchy — checked vs unchecked
3. `try` / `catch` / `finally`
4. Throwing exceptions & custom types
5. Exception chaining — the `cause`
6. `try-with-resources` — safe cleanup
7. The NIO `Path` — modern filesystem paths
8. `Files` — reading and writing
9. Directory operations & streams of files
10. Serialization — a brief note

### 09 — Concurrency & Virtual Threads (10) · `java-jvm`

1. What is a thread? *(hook)*
2. Raw threads and `Runnable`
3. `ExecutorService` and `Future<V>`
4. Virtual threads — Java 21's big shift
5. `CompletableFuture` — composable async
6. Structured concurrency
7. The shared-mutable-state problem
8. Locks — `synchronized` and `ReentrantLock`
9. Atomic variables & concurrent collections
10. `volatile` and the JVM memory model

### 10 — JVM, Build & Testing (10) · `java-jvm`

1. The JVM — what's actually running *(hook)*
2. Garbage collection in one breath
3. Class loading
4. Java modules — the 60-second tour
5. Reflection — looking at code as data
6. Annotations — reading them at runtime
7. Maven — the dominant build tool
8. Gradle — the script-based alternative
9. JUnit 5 & parameterised tests
10. Mockito — testing in isolation

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
