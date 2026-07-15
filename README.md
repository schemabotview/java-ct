# java-ct

Video-first content for the **Java** concept (core language + Spring), consumed at runtime by the [`graphl-movie`](../graphl-movie) app. Content only — notebooks, narration (`.tts` → `.wav`), authored one-screen slides (`.slide`: a `# Title`, `## ` sub-labels, short prose, fenced code, and `- `/numbered lists with **bold** key terms), and the wiring `manifest.json`. Nothing to build or run here. For the authoring contract and folder layout, see [`CLAUDE.md`](./CLAUDE.md).

This file is the **course outline** — the human-facing map of modules and sections. It is the plan we author against; the machine source of truth for structure is `manifest.json` (once authored).

**Status:** scaffolded + section spine drafted (**12 modules × ~10 sections = 127 sections**, below). Nothing authored yet (`notebooks/`, `tts/`, `slides/` empty); `audio/` empty pending the owner's Colab run; nothing pushed. Scenes `java-jvm` + `java-anatomy` are ported/registered app-side in graphl-movie; Spring modules (08–12) have **no scene yet**.

## Module spine (from `../java-content`)

The source curriculum is the **12-module Java path** in `../java-content` (the graphl-ux-era repo, source of truth for the notebook split): seven core-language/runtime modules then five Spring modules. The video set keeps all 12 modules — Java + Spring is a lot of ground, so 12 is the agreed exception to the usual ~10-module shape — each normalized to **~10 tight teaching sections** (a section = one narrated slide + scene focus, ≈ one page). The source notebooks run 10–17 `## ` headings each; we consolidate fine-grained beats (merging tightly related items) and drop the reading-only "what we'll cover" / "What's next" scaffolding to land near ~10. **§1 of each module is the hook** — the picture the rest of the module zooms into.

Scene assignment: **core-language modules → `java-anatomy`** (the "grammar of a program" map), **runtime/JVM modules (06, 07) → `java-jvm`** (the source→classloader→memory→execution runtime map). Module 01 straddles both (a runtime intro on `java-jvm`, then language basics on `java-anatomy`). Spring modules **08–12 have no scene yet** — they may ride a related scene as a full-strength backdrop until their own scenes are authored.

| # | Module | Scene | Source → video |
|---|---|---|---|
| 01 | Java Essentials | `java-jvm` + `java-anatomy` | 17 → 11 |
| 02 | OOP & Modern Types | `java-anatomy` | 14 → 11 |
| 03 | Collections & Generics | `java-anatomy` | 14 → 11 |
| 04 | Functional Java & Streams | `java-anatomy` | 13 → 11 |
| 05 | Errors, Files & I/O | `java-anatomy` | 12 → 10 |
| 06 | Concurrency & Virtual Threads | `java-jvm` | 14 → 11 |
| 07 | JVM, Reflection, Build & Testing | `java-jvm` | 12 → 11 |
| 08 | Spring Core | *(no scene yet)* | 13 → 11 |
| 09 | Spring Web | *(no scene yet)* | 10 → 10 |
| 10 | Spring Data | *(no scene yet)* | 13 → 11 |
| 11 | Spring Boot in Production | *(no scene yet)* | 12 → 10 |
| 12 | Spring Cloud | *(no scene yet)* | 10 → 10 |

## Sections (drafted from `../java-content` — final headings settle per module as authored)

### 01 — Java Essentials (11) · `java-jvm` + `java-anatomy`

1. What is Java, and why in 2026? *(hook)*
2. Modern Java, not 1998 Java
3. The JVM context — from source to running code
4. Installing Java & three ways to run it
5. Hello, Java — jshell, jbang, Maven
6. Values, types and the type system
7. `var` and local type inference
8. Expressions, statements and operators
9. Control flow statements
10. Methods
11. Strings, text blocks and comments

### 02 — OOP & Modern Types (11) · `java-anatomy`

1. Classes — the unit of code *(hook)*
2. Encapsulation and visibility
3. Constructors, `this`, and overloading
4. Inheritance and polymorphism
5. Abstract classes
6. Interfaces — with default and static methods
7. Enums — a fixed set of constants
8. Records — one-line immutable data classes
9. Sealed types — a closed family of subtypes
10. Pattern matching for `switch` — with guards
11. Built-in annotations

### 03 — Collections & Generics (11) · `java-anatomy`

1. The Collection hierarchy *(hook)*
2. `List` — ordered, indexed, allows duplicates
3. `Set` — no duplicates
4. `Map` — key-to-value lookup
5. `Queue` and `Deque`
6. Immutable factories & iterating
7. Generics — what and why
8. Writing a generic class & generic methods
9. Bounded type parameters
10. Wildcards & PECS — `? extends T` / `? super T`
11. Type erasure — what the JVM actually sees

### 04 — Functional Java & Streams (11) · `java-anatomy`

1. Lambdas — functions as values *(hook)*
2. Method references
3. The four core functional interfaces — and writing your own
4. Capturing variables — *effectively final*
5. Streams — pipelines over collections
6. Creating streams
7. Intermediate operations
8. Terminal operations
9. Collectors
10. Parallel streams
11. `Optional<T>` — and streams together

### 05 — Errors, Files & I/O (10) · `java-anatomy`

1. Why exceptions *(hook)*
2. The `Throwable` hierarchy — checked vs unchecked
3. `try` / `catch` / `finally`
4. Throwing exceptions & custom types
5. Exception chaining — the `cause`
6. `try-with-resources` — safe cleanup
7. The NIO `Path` — modern filesystem paths
8. `Files` — reading and writing
9. Directory operations
10. Serialization — a brief note

### 06 — Concurrency & Virtual Threads (11) · `java-jvm`

1. What is a thread? *(hook)*
2. Raw threads with the `Thread` class
3. `Runnable` vs `Callable<V>`
4. `ExecutorService` and `Future<V>`
5. Virtual threads — Java 21's big shift
6. `CompletableFuture` — composable async
7. Structured concurrency
8. The shared-mutable-state problem
9. Locks — `synchronized` and `ReentrantLock`
10. Atomic variables & concurrent collections
11. `volatile` and the JVM memory model

### 07 — JVM, Reflection, Build & Testing (11) · `java-jvm`

1. The JVM — what's actually running *(hook)*
2. Garbage collection in one breath
3. Class loading
4. Java modules — the 60-second tour
5. Annotations — revisited and extended
6. Reflection — looking at code as data
7. Reading annotations via reflection — the Spring bridge
8. Maven — the dominant build tool
9. Gradle — the script-based alternative
10. JUnit 5 & parameterised tests
11. Mockito — testing in isolation

### 08 — Spring Core (11) · *(no scene yet)*

1. The problem: manual wiring *(hook)*
2. Inversion of Control and Dependency Injection
3. The `ApplicationContext`
4. Component scanning — `@Component` and its specialisations
5. `@Configuration` and `@Bean` — explicit registration
6. Three injection styles — and which to use
7. Bean scopes & lifecycle
8. Profiles & externalised configuration
9. Aspect-Oriented Programming
10. `ApplicationContext` events
11. Putting it together

### 09 — Spring Web (10) · *(no scene yet)*

1. How a Spring MVC request flows *(hook)*
2. `@RestController` vs `@Controller`
3. Extracting request data
4. Returning responses
5. Validation with `@Valid`
6. Centralised error handling
7. Calling other services — `RestClient`
8. Spring Security — the essentials
9. Method security
10. CORS in one paragraph

### 10 — Spring Data (11) · *(no scene yet)*

1. Why Spring Data *(hook)*
2. JPA & the DataSource
3. Entities — mapping a class to a table
4. Relationships
5. Fetch types and the N+1 problem
6. The repository hierarchy
7. Derived query methods
8. `@Query` — when derivation isn't enough
9. Paging and sorting
10. `@Transactional` — what it actually does
11. Dynamic queries & Flyway migrations

### 11 — Spring Boot in Production (10) · *(no scene yet)*

1. What Spring Boot adds *(hook)*
2. Auto-configuration — how it works
3. Externalised configuration & `@ConfigurationProperties`
4. Actuator — health, metrics, and introspection
5. Logging — Logback, SLF4J, structured output
6. Testing — the test slices
7. Testcontainers — real databases, ephemeral
8. Messaging — Kafka, JMS & AMQP
9. Packaging — the fat JAR
10. Container deployment

### 12 — Spring Cloud (10) · *(no scene yet)*

1. Why Spring Cloud *(hook)*
2. What's in the umbrella (and what to skip)
3. Spring Cloud Config — one source of truth for configuration
4. Service discovery with Eureka
5. API Gateway — the edge
6. Circuit breakers with Resilience4j
7. Distributed tracing — Micrometer Tracing + OpenTelemetry
8. Spring Cloud Stream — broker-agnostic messaging
9. The platform overlap — where Spring Cloud meets Kubernetes
10. Track wrap-up

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
