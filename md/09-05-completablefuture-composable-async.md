## `CompletableFuture` — composable async

A plain `Future` has one real move: call `get()` and *block* until the answer arrives. That's fine for one result, but the moment you have several async steps that depend on each other — fetch a user, then load their orders, then price them — blocking on each in turn throws away the concurrency. **`CompletableFuture`** fixes this: it's a `Future` you can *chain*, attaching "what to do next" so steps compose into a pipeline that never blocks a thread waiting.

### The problem with plain `Future.get()`

`get()` blocks. Sequence three dependent async calls with it and each `get()` stalls a thread until it returns — you've serialized work that could overlap, and tied up threads doing nothing but waiting:

```java
User u   = fetchUser(id).get();          // block
Orders o = fetchOrders(u).get();          // block again
Price p  = price(o).get();                // and again
```

### The fix: describe the next step, don't wait for it

A `CompletableFuture<T>` lets you *register a callback* that runs when the value is ready — so you build a pipeline of transformations, exactly like a stream, but over async results:

```java
CompletableFuture<Price> result =
    fetchUser(id)                         // CompletableFuture<User>
        .thenCompose(u -> fetchOrders(u)) // chain an async step -> CF<Orders>
        .thenApply(o -> price(o));        // transform the value      -> CF<Price>
// nothing blocked; result completes later
```

This reads like module 07's `map`/`flatMap`, and the parallel is exact:

- **`thenApply(fn)`** — transform the result with a *plain* function (like `map`).
- **`thenCompose(fn)`** — chain a step that *itself* returns a `CompletableFuture`, flattening the nesting (like `flatMap`). Use this to sequence dependent async calls.
- **`thenAccept` / `thenRun`** — consume the result / run an action, returning no value.

### Combining independent futures

When two async results *don't* depend on each other, run them concurrently and join them — no blocking:

```java
CompletableFuture<Weather> w = fetchWeather(city);
CompletableFuture<Events>   e = fetchEvents(city);
w.thenCombine(e, (weather, events) -> buildPage(weather, events));  // both, when ready
```

`thenCombine` waits for both and merges them; `allOf(...)` / `anyOf(...)` fan out to many. This is how you express "do these three things at once, then continue" without a single `get()`.

### Handling failure in the chain

Because there's no `try/catch` around an async callback, `CompletableFuture` carries error handling *in the pipeline*. If any stage throws, the exception propagates down the chain, and a handler catches it:

```java
fetchUser(id)
    .thenApply(this::render)
    .exceptionally(ex -> fallbackPage(ex));   // recover, like a catch for the pipeline
```

`exceptionally` supplies a fallback; `handle((value, ex) -> ...)` sees both outcomes. The failure travels the chain the way a value does — module 08's discipline, applied to async.

### Where it fits now

`CompletableFuture` (Java 8) was the answer to "how do I compose async work without blocking or nesting callbacks," and it remains the tool for **combining multiple independent async operations** into a result. But note the shift: much of what once *forced* you into `CompletableFuture` — the fear of blocking a scarce thread — is dissolved by virtual threads, where plain blocking code now scales. The modern guidance: reach for `CompletableFuture` when you genuinely need to *fan out and combine* independent operations; reach for straightforward blocking calls on virtual threads when the logic is sequential. Which sets up the next section — **structured concurrency** — the newest answer to running several related tasks together and treating them as one unit.
