## What is a thread?

Every program you've written so far has run as a single sequence of steps — one line, then the next, top to bottom. A **thread** is exactly that: one such sequence of execution. The moment you want two things to happen *at once* — serve two web requests, download a file while the UI stays responsive, use all eight of your CPU cores — you need more than one thread, and you step into **concurrency**. This module is about doing that correctly, and about the change in Java 21 that makes it dramatically easier.

### One process, many threads

When the JVM starts your program it already has one thread — the `main` thread, running `main`. A thread is a path of execution *within* a process, and a process can hold many. Crucially, all threads in a process **share the same heap** — the same objects, the same static fields:

```
Process (one JVM)
├── shared heap: your objects, static fields   ← every thread sees these
├── Thread "main"     — its own call stack, its own program counter
├── Thread "worker-1" — its own stack
└── Thread "worker-2" — its own stack
```

Each thread has its *own* call stack and program counter (where it is in the code), but they all reach into *one shared heap*. That single fact — private stacks, shared heap — is the source of both concurrency's power and its every hazard.

### Concurrency vs parallelism — not the same word

Two terms people blur, worth separating once:

- **Concurrency** is *structure*: a program dealing with many tasks in overlapping time periods. A single CPU core switches rapidly between threads, making progress on all of them — they're *interleaved*, not literally simultaneous.
- **Parallelism** is *execution*: tasks literally running at the same instant, which requires multiple cores.

Concurrency is about *how you organize* independent work; parallelism is about *physically running* it at once. You can have concurrency on one core (by interleaving) and you need multiple cores for true parallelism. Java's threads give you both: the OS schedules them across whatever cores exist.

### Why threads, and why they've been hard

Two motivations drive almost all concurrency:

- **Responsiveness** — don't freeze while waiting. A server handling one request shouldn't block the other thousand; a UI shouldn't lock up during a network call. Overlap the waiting.
- **Throughput** — finish faster by using every core. A task that splits into independent pieces can run them in parallel (module 07's `parallelStream` was one taste of this).

But classic threads carry two long-standing problems this module confronts. First, they are **expensive**: a traditional Java thread maps one-to-one to an OS thread and costs around a megabyte of stack, so you can afford only *thousands*, not millions — a real ceiling for a server. Second, the shared heap makes them **dangerous**: two threads touching the same object without coordination corrupt it in ways that are timing-dependent and maddening to reproduce.

### The shape of the module

We build up in two movements. First, the **tools for running tasks**: raw `Thread`s, then the `ExecutorService` pool that manages them, then Java 21's **virtual threads** — the headline change that makes threads so cheap you can have millions — and the modern composition tools (`CompletableFuture`, structured concurrency). Then the **hard part**: the shared-mutable-state problem and the machinery to tame it — `synchronized` and locks, atomic variables and concurrent collections, and finally `volatile` and the memory model that explains *why* all of it is necessary. The throughline: concurrency multiplies what your program can do, but only if every thread agrees on what the shared heap says.
