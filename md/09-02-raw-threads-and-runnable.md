## Raw threads and `Runnable`

The most direct way to run code on another thread is the `Thread` class itself. You'll rarely use it directly in modern code — pools and executors (next section) are almost always better — but understanding the raw mechanism is essential, because everything above it is built on this. A thread needs two things: some code to run, and the act of starting it.

### The code to run: `Runnable`

The work a thread performs is expressed as a **`Runnable`** — a functional interface (module 06) with one method, `run()`, taking nothing and returning nothing. Because it's a SAM, it's just a lambda:

```java
Runnable task = () -> System.out.println("running on " + Thread.currentThread());
```

`Runnable` is the "unit of work" abstraction. On its own it's inert — a `Runnable` is just an object holding some behaviour; *something* has to actually run it.

### Starting a thread: `start`, not `run`

Wrap the `Runnable` in a `Thread` and call `start()`. This is the single most important detail in the section:

```java
Thread t = new Thread(task);
t.start();     // spawns a NEW thread; run() executes there
// t.run();    // BUG: runs on THIS thread — no concurrency at all
```

`start()` asks the JVM/OS to create a new thread and invoke `run()` **on it** — your current thread keeps going, and the two now run concurrently. Calling `run()` directly is a classic beginner trap: it just invokes the method on the *current* thread, like any ordinary call, with zero concurrency. **`start` spawns; `run` doesn't.**

### The threads run independently — and unpredictably

Once started, threads are scheduled by the OS, and you get **no ordering guarantee** between them:

```java
new Thread(() -> System.out.println("A")).start();
new Thread(() -> System.out.println("B")).start();
System.out.println("main");
// possible outputs: "main A B", "A B main", "B main A", ...
```

The order changes from run to run. This nondeterminism is the essential character of concurrency: you cannot assume one thread reaches a point before another unless you *make* it so.

### Waiting for a thread: `join`

To make the current thread wait for another to finish, call `join()`. It blocks until that thread's `run()` returns:

```java
Thread t = new Thread(task);
t.start();
t.join();      // main pauses here until t is done
System.out.println("t has finished");
```

`join` is the most basic form of coordination — "don't proceed until that work is complete." (`join` throws `InterruptedException`, the checked signal that a blocked thread is being asked to stop — a first hint that blocking calls and interruption are part of the model.)

### Why you'll rarely write this by hand

Raw `Thread` works, but it's the assembly language of concurrency, and it has real drawbacks:

- **Unbounded and expensive.** `new Thread()` per task means no limit and ~1 MB each — spawn one per request and a busy server runs out of memory.
- **No result, no pooling, no lifecycle.** `Runnable` returns nothing, threads aren't reused, and you hand-manage every `start`/`join`.

Every one of these is solved by the `ExecutorService` — a managed pool that you *submit* tasks to, which reuses threads and hands back a `Future` for the result. That's the next section, and it's how real code runs concurrent work. Raw `Thread` is the foundation to understand; the executor is the tool you'll actually reach for.
