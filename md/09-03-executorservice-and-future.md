## `ExecutorService` and `Future<V>`

Raw `Thread` left us with three problems: threads are unbounded and expensive, they return no result, and you manage their lifecycle by hand. The **`ExecutorService`** solves all three. It's the standard way to run concurrent work in Java: you stop *creating threads* and start *submitting tasks* to a pool that owns the threads for you.

### The shift: submit tasks, don't spawn threads

An `ExecutorService` is a **thread pool** — a fixed set of worker threads and a queue of pending tasks. You hand it work; it runs each task on a free worker, reusing threads instead of spawning one per task:

```java
ExecutorService pool = Executors.newFixedThreadPool(4);   // 4 reusable workers
pool.submit(() -> System.out.println("task ran"));         // hand off work
pool.submit(anotherTask);
```

The pool decouples *how many tasks* you have from *how many threads* exist. Ten thousand tasks submitted to a four-thread pool run four at a time — no memory blow-up, because there are only ever four threads.

### Getting a result back: `Callable` and `Future`

`Runnable` returns nothing. When a task must *produce a value*, use a **`Callable<V>`** — like `Runnable`, but its `call()` returns a `V` (and may throw a checked exception). Submitting a `Callable` gives you a **`Future<V>`** — a handle to a result that *isn't ready yet*:

```java
Future<Integer> f = pool.submit(() -> expensiveSum());   // returns immediately
// ... do other work while it computes ...
int result = f.get();    // BLOCKS here until the value is ready
```

`submit` returns *instantly* with the `Future`; the work runs on a pool thread. `f.get()` **blocks** the calling thread until the result exists (or throws `ExecutionException` wrapping whatever the task threw — the cause-chaining of module 08). A `Future` is a promise: "the answer will be here; ask for it when you need it."

### The `Future` toolkit

Beyond `get()`, a `Future` lets you check and control the task:

```java
f.isDone();        // has it finished? (non-blocking)
f.get(2, SECONDS); // wait, but give up after a timeout -> TimeoutException
f.cancel(true);    // attempt to stop it (interrupts if running)
```

`get()` with a timeout is the disciplined way to wait — an unbounded `get()` can hang your thread forever if the task never completes.

### Lifecycle: you must shut it down

A pool's threads keep the JVM alive, so an `ExecutorService` must be **closed** or the program never exits. Modern Java makes this clean — `ExecutorService` is `AutoCloseable` (module 08), so a try-with-resources shuts it down and waits for tasks to finish:

```java
try (ExecutorService pool = Executors.newFixedThreadPool(4)) {
    pool.submit(task1);
    pool.submit(task2);
}   // close(): waits for submitted tasks, then shuts the pool down
```

(Pre-Java-21 you called `shutdown()` then `awaitTermination()` by hand — the try-with-resources does both.)

### Why this is the real baseline

The `ExecutorService` is where practical concurrency starts, because it fixes raw `Thread`'s every flaw: **bounded** (the pool caps thread count and cost), **result-bearing** (`Callable`/`Future`), and **managed** (submit-and-forget, clean shutdown). It also sets up the two directions the rest of the module goes. When you have *many* tasks and the old worry was "too many threads," Java 21's **virtual threads** (next) change the calculus entirely. And when you want to *combine* asynchronous results rather than block on `get()`, **`CompletableFuture`** picks up where `Future` stops. `Future` is the primitive; both are its evolution.
