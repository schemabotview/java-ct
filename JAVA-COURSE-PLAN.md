# Java — From a First Program to Reliable Applications

## Audience and prerequisites

For learners new to Java and programming who have basic computer and file familiarity. Introduce algorithms, terminal use, network requests, and relational concepts when needed. The integration chapters provide a bounded introduction; the companion SQL course supports deeper database study.

Scope: language foundations, object and API design, failure handling, generics, collections, functional transformations, files and core utilities, application organisation, concurrency, external integration, and JVM diagnosis. Use annotated Java, expected output, object graphs, tests, configuration, failure timelines, and diagnostic evidence. Following examples is optional; submitted exercises and learner monitoring are not required. This course is independent of certifications.

Reference baseline: **Java SE/JDK 25**, deliberately pinned, with sources checked on **2026-10-12**. Stable features form the main path. Label preview/incubator features separately; they are not prerequisites. Use Maven and JUnit Jupiter as the concrete build/test illustrations, selecting compatible pinned releases/plugins for detailed lessons. Record the JDK distribution and versions rather than assuming vendor support/licensing policies are universal. Older books inform progression and depth; versioned official documentation governs current semantics.

Target: construct and explain Java programs, reason about object and API contracts, trace failures and concurrent behaviour, and justify application and runtime choices. Completion does not establish assessed professional competence.

Structure: **12 chapters, 91 sections**, distributed **6, 8, 8, 8, 7, 8, 7, 8, 7, 9, 7, and 8**. Section counts reflect conceptual weight and do not imply equal teaching duration. The final chapter separates runtime models, evidence, and application synthesis into explicit sections.

## Learning spine

Run a small program → express computations → model domain objects → define contracts and variation → handle failures and establish evidence → manage typed collections → compose transformations → cross text/time/file boundaries → organise and build the application → coordinate concurrent work → connect external systems → diagnose and evolve the running application.

Recurring example: an order-processing application calculates one total, develops an explicit domain model, validates inputs, aggregates orders, imports/exports files, calls an external endpoint, persists results, and processes independent work concurrently. Start with integer minor units under explicit currency/range assumptions; introduce decimal arithmetic and rounding when requirements demand them. Supply small inputs and labelled expected results. Secondary examples expose where the main example's assumptions stop applying.

Why this progression: an immediate observable result gives the learner a reason to continue. Computations precede object abstraction; interfaces precede lambdas; object contracts and type parameters precede substantial collection use. Failure awareness starts immediately and resource handling deepens before external I/O. Concurrency correctness precedes throughput optimisation. Runtime diagnosis explains behaviour already encountered rather than introducing an unrelated catalogue of JVM flags.

Teaching method: objective → mental model → annotated code and execution/result trace → contrasting failure or design → outcome → bridge. Introduce basic debugging and result checks early, then deepen tests as engineering techniques. Keep plans at TOC level; the illustrations below specify lesson evidence rather than mandatory learner assignments.

## Chapter 1 — A First Program and the Java Execution Model

Objective: Follow a small program from source to observable output and distinguish the tools and failure stages involved.

1. Problems, algorithms, programs, and observable behaviour
2. Source code, JDK tools, bytecode, JVM, and platform boundaries
3. A first compile/run sequence and interpreting its output
4. JShell, terminal, editor, and IDE roles
5. Entry points, command-line arguments, and conventional class structure
6. Compiler errors, runtime failures, wrong results, and first debugging steps

Worked illustrations: Calculate one order total and trace inputs → computation → printed result. Show a small Java 25 compact source file and its conventional named-class/main equivalent; explain the extra structure progressively. Compare `javac` compilation, class execution, and source-file launch without treating them as identical workflows. Read `java --version` and `javac --version`, a compiler message, and a wrong-but-running result. An IDE is a convenient tool rather than the definition of Java execution.

Outcome: Explain the source-to-result path, choose a suitable first tool workflow, and locate a failure at the appropriate stage.

Bridge: A working result raises the next question: how do values, decisions, and repetition express more useful computations?

## Chapter 2 — Values, Expressions, and Control Flow

Objective: Trace computations through Java's value, type, scope, and control-flow rules.

1. Primitive types, reference values, null, and type distinctions
2. Variables, initialisation, scope, final, and local type inference
3. Expressions, operators, conversions, overflow, and numerical limits
4. Strings, text blocks, identity, and content equality
5. Conditions, branching, and switch statements/expressions
6. Loops, termination, break, and continue
7. Arrays, indexing, iteration, and multidimensional structures
8. Methods, parameters, return values, overloading, and bounded recursion

Worked illustrations: Trace a running total, an empty input, an off-by-one loop, integer division, and overflow. Compare `==` with string content equality. Draw copied primitive values and copied references at a method call: Java passes values, including reference values, rather than passing variables by reference. Contrast rebinding a parameter with mutating an accessible array. Use a short recursive trace with an explicit stopping condition; deep algorithms remain outside this introduction.

Outcome: Construct and explain small computations, predict scope and argument effects, and identify boundary cases that change results.

Bridge: Related values and operations now need a model that preserves their meaning together.

## Chapter 3 — Objects and Domain Modelling

Objective: Model domain state with explicit ownership, invariants, and equality decisions.

1. Classes, instances, fields, methods, and object identity
2. Constructors, validation, and invariants
3. Encapsulation, access control, and information hiding
4. Instance/static members, object lifetime, and reachability introduction
5. Composition, delegation, and relationships between objects
6. Records, final references, and shallow versus deep immutability
7. Enums and explicit domain states
8. equals, hashCode, toString, aliases, and value semantics

Worked illustrations: Develop Order and LineItem from loose variables; draw shared references before and after a mutation. Reject an invalid quantity at a meaningful boundary. Compare a mutable class with a record containing a mutable list, then show defensive copying and its limits. Contrast object identity with business/value equality and explain why matching hash codes do not prove equality. Avoid exposing credentials or personal data through generated/debug output. Garbage collection does not replace explicit management of external resources.

Outcome: Explain an object model's invariants and ownership, choose an appropriate representation, and predict equality and aliasing effects.

Bridge: A useful model must also support multiple behaviours without making every caller depend on one implementation.

## Chapter 4 — Interfaces, Variation, and Reusable Design

Objective: Express behavioural contracts and judge mechanisms for extension and substitution.

1. Interfaces, contracts, default methods, and implementation choices
2. Inheritance, overriding, dynamic dispatch, and overload resolution
3. Abstract classes and shared implementation
4. Composition versus inheritance and substitutability
5. Sealed hierarchies, instanceof patterns, and pattern-based switch
6. Nested, local, and anonymous classes
7. Annotations, retention, and reflection boundaries
8. API design, documentation, compatibility, and controlled change

Worked illustrations: Give the order calculator two pricing policies behind one interface; trace dispatch separately from compile-time overload selection. Contrast a subclass that violates expectations with delegation preserving the contract. Use a small sealed result hierarchy to show exhaustive handling and null considerations. Compare annotations as metadata with the processor/runtime mechanism that gives them an effect. Reflection accesses runtime structure under access/module rules; it is not a universal bypass. Explain a compatible implementation change versus a caller-visible contract change.

Outcome: Design and interpret a small interface, explain dispatch and extension choices, and justify an API boundary.

Bridge: Contracts also need to describe what happens when work cannot complete normally.

## Chapter 5 — Failures, Resources, Testing, and Debugging

Objective: Make failure behaviour and evidence explicit while preserving resource ownership and diagnostic context.

1. Exceptions, propagation, stack traces, and Error boundaries
2. Checked and unchecked exceptions and caller responsibilities
3. Catching, rethrowing, wrapping, and preserving causes
4. try-with-resources, closure, and suppressed exceptions
5. Validation, domain failures, and application error boundaries
6. Unit tests, boundary cases, test doubles, and expected behaviour
7. Debuggers, logging, assertions, and limitations of evidence

Worked illustrations: Trace a rejected order through several calls and annotate the causal stack. Show a resource failure during both work and closure, with the primary and suppressed exceptions distinguished. Compare catching at a useful boundary with swallowing a failure. Demonstrate a small JUnit Jupiter test for totals and a failed expectation; use a simple fake pricing dependency. Distinguish Java assertions from externally required input validation. Passing tests provide evidence for covered cases rather than proof of all possible behaviour.

Outcome: Explain exception and resource lifecycles, select useful failure boundaries, and interpret test/debugging evidence.

Bridge: The application can now handle many domain objects through typed containers with explicit behavioural contracts.

## Chapter 6 — Generics and Collection Contracts

Objective: Choose typed collections and reason about their equality, ordering, mutation, and cost assumptions.

1. Generic classes/methods, type parameters, inference, and boxing
2. Invariance, bounds, wildcards, and producer/consumer reasoning
3. Erasure, raw types, unchecked operations, and heap pollution
4. List, Set, Map, Queue, and implementation choices
5. Iteration, mutation, views, and fail-fast limitations
6. Hashing, natural order, comparators, and contract consistency
7. Ordering guarantees, basic complexity, and workload trade-offs
8. Unmodifiable/immutable structures, copies, and element mutability

Worked illustrations: Build a typed in-memory order repository. Compare duplicate handling in a list, set, and keyed map; trace a mutable key that becomes difficult to find after insertion. Contrast a backed view, an unmodifiable wrapper, and a defensive copy, including mutable elements. Explain why `List<Subtype>` is not a subtype of `List<Supertype>` through a possible invalid insertion. Compare hash and ordered lookup using stated workload assumptions; fail-fast iterators are not a concurrency correctness mechanism.

Outcome: Explain a generic signature, choose a collection for stated requirements, and predict contract and mutation failures.

Bridge: Collections provide the data; next we express reusable transformations over it.

## Chapter 7 — Lambdas and Stream Transformations

Objective: Explain functional operations and stream pipelines in terms of evaluation, results, and side effects.

1. Functional interfaces, lambda expressions, and target types
2. Method references, captured variables, and effectively final bindings
3. Stream sources, intermediate/terminal operations, and laziness
4. Filtering, mapping, flattening, and short-circuiting
5. Reduction, collectors, grouping, and combination laws
6. Optional, absence, and API choices
7. Side effects, encounter order, and parallel-stream trade-offs

Worked illustrations: Transform the order aggregation loop into a pipeline and compare expected results. Trace a short-circuiting operation and a single-use stream. Explain how an effectively final captured reference can still refer to mutable state. Contrast a valid aggregation with a shared mutable accumulator and a non-associative reduction. Use Optional where absence is part of the interface rather than as a universal replacement for every null. Parallel execution needs suitable work, data, and combination behaviour; it does not automatically improve latency.

Outcome: Read and construct a bounded transformation pipeline, explain its evaluation, and justify loop versus stream and sequential versus parallel choices.

Bridge: Real input introduces text encodings, time semantics, and file/resource boundaries that collections alone do not resolve.

## Chapter 8 — Text, Time, Files, and Data Boundaries

Objective: Preserve meaning and resource control as data enters and leaves the application.

1. Unicode, UTF-16 char values, code points, and encodings
2. Parsing, formatting, regular expressions, and locale
3. BigDecimal, currency assumptions, scale, and rounding
4. Dates, instants, time zones, durations, and injectable clocks
5. Path, Files, directories, and path-resolution boundaries
6. Byte/character streams, buffering, and bounded reading
7. CSV/JSON/schema choices and Java serialization boundaries
8. Closure, partial writes, atomic replacement, and failure recovery

Worked illustrations: Compare a character count with code-point count and decode a small UTF-8 file explicitly. Demonstrate decimal construction from text and a rounding decision. Contrast a local time with an instant across a daylight-saving transition; test a time-dependent rule with a supplied clock. Read a small file and a bounded large-file workflow, closing returned resources. Show partial output versus temporary-file publication under checked filesystem support; atomic movement and durable persistence are distinct concerns. Use suitable format libraries for quoted CSV/JSON. Treat untrusted native Java deserialization as a security boundary, not a default interchange strategy.

Outcome: Explain representation and resource assumptions, choose appropriate utilities, and identify boundary conditions that threaten data correctness.

Bridge: As files and dependencies grow, the application needs repeatable organisation and delivery.

## Chapter 9 — Application Structure, Builds, and Delivery

Objective: Explain how source, dependencies, tests, and runtime configuration form a reproducible application.

1. Packages, imports, visibility, and dependency direction
2. Source, test, and resource layout
3. Classpath, dependencies, JARs, and executable packaging
4. Maven lifecycle, dependency resolution, and version/plugin control
5. Automated tests, configuration, logging, and CI build evidence
6. Modules, services, exports, opens, and reflective access
7. Source/target/runtime compatibility and runtime images

Worked illustrations: Split the application into domain, input, and integration packages. Read a small POM and trace compile → test → package; distinguish declared dependencies from classes actually available at runtime. Explain why dependency/plugin pinning supports repeatability without proving byte-for-byte reproducibility. Compare a missing class with a module-access failure. Introduce an annotation/reflection consumer and the relevant access boundary. Show a clean build report and explain Maven test discovery/provider configuration. Use `--release` and a runtime compatibility example; a JAR alone does not package every required dependency or a complete runtime.

Outcome: Interpret an application layout and build, locate dependency/configuration failures, and justify packaging and module choices.

Bridge: A larger application can perform independent work concurrently, provided its correctness and resource limits are explicit.

## Chapter 10 — Concurrency and Coordinated Work

Objective: Reason about concurrent correctness, lifecycle, and resource usage before optimising throughput.

1. Tasks, threads, executors, and lifecycle ownership
2. Races, atomicity, visibility, and happens-before
3. Synchronisation, locks, condition waiting, and protected invariants
4. Atomics, concurrent collections, and compound operations
5. Futures, CompletableFuture, and composing results/failures
6. Cancellation, interruption, deadlines, and timeouts
7. Virtual threads, blocking workloads, and platform threads
8. Bounded work, backpressure, connection limits, and overload
9. Deadlocks, starvation, liveness, and diagnostic timelines

Worked illustrations: Trace a lost update and a visibility problem separately. Compare a volatile field with a multi-step invariant requiring coordination. Show a concurrent collection whose separate operations still race, then an appropriate atomic operation. Annotate executor shutdown, failure observation, and interruption-aware cancellation. Contrast CPU-heavy aggregation with many waiting calls; virtual threads provide a scaling model rather than faster CPU computation. Bound calls to a scarce external resource even when threads are inexpensive. Read a deadlock timeline and supplied thread dump. Structured concurrency remains an optional version-labelled preview signpost, not a dependency of these examples.

Outcome: Explain a concurrent execution, identify the required ordering and ownership, and justify a coordination or workload-limit strategy.

Bridge: Concurrency becomes useful only when connected work also handles network and database failure semantics.

## Chapter 11 — Network and Database Integration

Objective: Explain external calls and persistence as contracts involving partial failure, resource ownership, and data consistency.

1. Requests, responses, protocols, endpoints, and network foundations
2. HTTP client configuration, status/body handling, and lifecycle
3. Deadlines, retries, idempotency, and uncertain outcomes
4. JDBC, drivers, connections, prepared values, and result mapping
5. Transactions, auto-commit, rollback, and connection ownership
6. Credentials, TLS validation, untrusted input, and permissions
7. Integration boundaries, test evidence, and failure diagnosis

Worked illustrations: Annotate an HTTP request and distinguish transport failure from an unsuccessful HTTP status. Compare connection and request time limits with an overall operation deadline. Walk through a server applying an order before the client times out; explain why a retry may duplicate effects. Map a small SQL result through JDBC and show commit/rollback with explicit resource ownership. Prepared parameters bind values, while dynamic identifiers need separate controlled design. Introduce connection pooling as bounded resource reuse with driver/pool-specific checks. Use fake/local integration evidence and labelled responses; frameworks and a full web server are outside the core example.

Outcome: Explain request and transaction timelines, identify uncertain outcomes, and justify resource, retry, and security choices.

Bridge: The complete application now supplies the behaviour and evidence needed to reason about the running JVM.

## Chapter 12 — JVM Behaviour, Diagnosis, and Application Evolution

Objective: Connect runtime evidence to application design and evaluate changes without relying on folklore.

1. Class loading, linking, initialisation, and runtime identity
2. Interpretation, JIT compilation, and implementation-specific optimisation
3. Heap, stacks, garbage collection, and allocation models
4. Retained objects, memory leaks, and resource exhaustion
5. JFR, thread dumps, heap evidence, and diagnostic costs
6. Measurement, profiling, warm-up, and benchmark pitfalls
7. Compatibility, dependency updates, security, and controlled releases
8. Integrated application review and continued specialisation

Worked illustrations: Trace an initialisation failure separately from a missing class. Draw a retained collection and distinguish unreachable objects from still-referenced unwanted data. Compare memory exhaustion, blocked threads, and slow external calls through supplied diagnostic excerpts. Explain warm-up and why timing one loop is weak evidence for a general optimisation. Connect a measured symptom to a hypothesis, bounded change, and subsequent measurement. Finish with the order application's domain contracts, tests, files, requests, transactions, thread ownership, dependencies, and runtime evidence in one lifecycle diagram. HotSpot-specific tools and collector details must be labelled by implementation/version.

Outcome: Interpret basic runtime evidence, propose justified diagnostic steps, and assess an application change against correctness, maintainability, and operational assumptions.

Bridge: Continue with supervised implementation and specialist study in frameworks, algorithms, distributed systems, JVM performance, or application security. Practical expertise grows through experience beyond this course.

## Sources and scope

Sources checked on **2026-10-12** support curriculum coverage and targeted conceptual checks, not an exhaustive verification of every API or a completed executable lab.

- [dev.java learning index](https://dev.java/learn/) supplies official coverage/navigation. [Java SE 25 Language Specification](https://docs.oracle.com/javase/specs/jls/se25/html/index.html) contents and targeted [startup/entry-point material](https://docs.oracle.com/javase/specs/jls/se25/html/jls-12.html#jls-12.1.4) and [memory-ordering material](https://docs.oracle.com/javase/specs/jls/se25/html/jls-17.html#jls-17.4.5) anchor language boundaries. The complete specification was not read.
- [Java 25 API overview](https://docs.oracle.com/en/java/javase/25/docs/api/index.html) and selected descriptions for [Record](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Record.html), [AutoCloseable](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/AutoCloseable.html), [streams](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/package-summary.html), [concurrency](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/package-summary.html), [Files](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/nio/file/Files.html), [modules](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/module/package-summary.html), [HTTP client](https://docs.oracle.com/en/java/javase/25/docs/api/java.net.http/java/net/http/HttpClient.html), and [JDBC](https://docs.oracle.com/en/java/javase/25/docs/api/java.sql/java/sql/package-summary.html) support targeted contracts; individual methods were not exhaustively audited.
- [Virtual-thread guide](https://docs.oracle.com/en/java/javase/25/core/virtual-threads.html) and [diagnostic tools](https://docs.oracle.com/en/java/javase/25/troubleshoot/diagnostic-tools.html) support concurrency/runtime teaching. Verify tool support, runtime implementation, and collection overhead for concrete lessons.
- [Maven getting-started guide](https://maven.apache.org/guides/getting-started/index.html) and [JUnit 6.1.3 overview](https://docs.junit.org/6.1.3/overview.html) support build/test orientation. Pin compatible tool/plugin versions and check detailed Jupiter examples when lessons are written. The attempted separate JUnit writing-tests URL failed; no full testing-guide audit is claimed.
- Marc Loy, Patrick Niemeyer, and Daniel Leuck, [Learning Java, sixth edition](https://www.oreilly.com/library/view/learning-java-6th/9781098145521/): publisher contents inspected for beginner progression and coverage. Cay S. Horstmann, [Core Java, Volume I: Fundamentals, thirteenth edition](https://ptgmedia.pearsoncmg.com/images/9780135328378/samplepages/9780135328378_Sample.pdf): publisher contents and introductory sample material inspected for deeper object/API/tool coverage. Neither complete book was accessed. These are selected pedagogical comparisons, not an exhaustive ranking of Java books or claims of latest editions.

Some dev.java topic fetches failed or returned no usable text; successful versioned API/specification pages supply targeted alternatives. Detailed lessons must check exact signatures, prerequisites, dependency versions, platform assumptions, and expected results. No Java examples were executed during TOC authoring.

Boundaries: Spring/Jakarta EE, Android, JavaFX/desktop UI, advanced algorithms, native interoperation, exhaustive reflection/bytecode engineering, collector tuning, cryptographic implementation, distributed transactions, and certification preparation need separate depth. Native serialization, preview features, and low-level concurrency receive explicit limits. Use the companion [SQL plan](SQL-COURSE-PLAN.md) for relational depth and [Linux plan](LINUX-COURSE-PLAN.md) for operating-system context; those courses are not prerequisites for the opening chapters.
