## What is Java, and why in 2026?

Java is a **statically typed, object-oriented** language that runs on the **Java Virtual Machine** — the JVM. You write source once, compile it to a compact intermediate form called **bytecode**, and that same bytecode runs unchanged on any machine with a JVM. That promise — *write once, run anywhere* — is what made Java the default language of the enterprise, and thirty years on it is still one of the most widely deployed languages on earth.

### It didn't fade — it kept up

Java has a reputation, in some corners, for being verbose and old-fashioned. That reputation is out of date. Since **Java 8** landed lambdas and streams, the language has been on a **six-month release cadence**, and the modern versions look and feel very different from the Java of the 2000s:

- **`var`** for local type inference — less ceremony, same static safety
- **records** — a one-line immutable data class instead of fifty lines of boilerplate
- **sealed types** and **pattern matching** — model a closed family of shapes and branch on them cleanly
- **text blocks** — multi-line strings without escaping
- **virtual threads** (Java 21) — millions of cheap threads, so blocking code scales again

We target **Java 21**, the current **long-term-support (LTS)** release — the version teams actually run in production and pin their builds to.

### Why learn it now

- **It runs the world's backends.** Banks, airlines, retailers, and a huge share of large-scale systems are built on the JVM. The jobs are real and they are not going away.
- **The JVM is a superpower.** Decades of engineering went into its **just-in-time compiler** and **garbage collector**, so well-written Java runs *fast* — close to native — without you managing memory by hand.
- **The ecosystem is enormous.** Mature libraries, build tools (Maven, Gradle), and test frameworks (JUnit) for essentially every problem, plus other languages — Kotlin, Scala, Clojure — that ride the same JVM.
- **What you learn transfers.** Static types, objects, generics, and the JVM memory model are ideas you'll carry into Kotlin, C#, and beyond.

### What this course is — and isn't

This is the **core language and the runtime it lives on**: the type system, objects, modern data modeling, collections, generics, functional style and streams, exceptions and I/O, concurrency, and finally the JVM, build tools, and testing. It is deliberately **not** a Spring course — no web framework, no dependency-injection container. We're building the foundation those frameworks stand on, so that when you meet them, nothing underneath is a mystery.

Picture the two maps we'll keep returning to: the **runtime** — your source flowing down through the compiler and class loader into the JVM's memory and execution engine — and the **anatomy of a program** — how any piece of Java models data, initializes it, transforms it, and returns a result. Every module zooms into one region of those two pictures.
