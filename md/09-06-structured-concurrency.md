## Structured concurrency

When you split one task into several concurrent subtasks — fetch a user *and* their orders at once — you create a scattered family of threads with no natural relationship. If one fails, the others leak on, running pointlessly. If the parent is cancelled, the children keep going. **Structured concurrency** fixes this by borrowing an idea you already trust from ordinary code: a block scope. Subtasks started together live and die together, inside a scope, as one unit.

### The unstructured mess it replaces

With bare executors, concurrent subtasks are independent objects with no lifecycle tie to each other or their parent. The error-handling is genuinely hard to get right:

```java
Future<User>   u = pool.submit(() -> fetchUser(id));
Future<Orders> o = pool.submit(() -> fetchOrders(id));
User user   = u.get();     // if THIS throws, o keeps running — a leak
Orders ord  = o.get();     // and if fetchUser already failed, we still wait here
```

If `fetchUser` fails, nothing cancels `fetchOrders`; if you return early, the other task runs on, orphaned. Cancellation and error propagation are all manual, and easy to botch.

### The idea: subtasks scoped like a code block

Structured concurrency (a recent preview feature, built on virtual threads) says: subtasks forked together should be confined to a **scope**, and that scope doesn't return until *all* of them finish. It mirrors how a method call works — you don't leave the block until the work inside it is done:

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<User>   u = scope.fork(() -> fetchUser(id));    // start subtask
    Subtask<Orders> o = scope.fork(() -> fetchOrders(id));  // start subtask
    scope.join();              // wait for BOTH
    scope.throwIfFailed();     // propagate the first failure
    return new Page(u.get(), o.get());   // both succeeded
}   // leaving the scope guarantees no subtask is still running
```

### What the scope guarantees

The `try`-block boundary now carries real concurrency guarantees — this is the payoff:

- **All-or-nothing lifecycle.** The scope doesn't exit until every forked subtask has completed, failed, or been cancelled. No orphans, ever — closing the scope cleans up.
- **Automatic cancellation.** With `ShutdownOnFailure`, the *instant* one subtask throws, the siblings are **cancelled** — no wasted work on a result you'll discard. (`ShutdownOnSuccess` is the mirror: first success wins, cancel the rest.)
- **Error propagation that composes.** A subtask's failure surfaces at `join`/`throwIfFailed` in the parent, so one `try/catch` around the scope handles it — concurrency errors flow like ordinary ones.

### Why it matters: concurrency that reads like sequential code

The deep win is that the *structure of your code now matches the structure of the work.* Concurrent subtasks are visibly nested inside the operation that owns them — the same way a called method is nested inside its caller. Cancellation, error handling, and cleanup follow that nesting automatically, instead of being hand-wired across loose `Future`s.

This is the capstone of the module's first half. Virtual threads made one-thread-per-subtask free; structured concurrency gives that a *shape* — a scope with a lifecycle — so fanning out into concurrent work is as safe and readable as a plain block. Together they're Java's modern answer to "run several things at once and treat them as one operation." (It's still finalizing across releases, but the model is where Java concurrency is heading.) With the tools for *running* concurrent work now in hand, the module turns to its harder half: what goes wrong when those threads touch the *same data*.
