## `try-with-resources` — safe cleanup

Section 03 ended on a promise: the `finally`-to-close-a-resource pattern is so common and so error-prone that Java gave it dedicated syntax. That syntax is **try-with-resources**, and it's the correct, modern way to work with anything that must be closed — files, streams, sockets, database connections. It writes the `finally` for you, and gets the hard parts right that hand-written code usually gets wrong.

### The pattern it replaces

Closing a resource by hand is deceptively tricky. The naive version leaks on some paths; the correct version is verbose and subtle:

```java
BufferedReader r = Files.newBufferedReader(path);
try {
    return r.readLine();
} finally {
    r.close();          // must remember; and what if close() ALSO throws?
}
```

You have to declare outside the `try`, remember the `finally`, and with two resources it nests into a pyramid — each level another chance to leak.

### The syntax: declare the resource in parentheses

Put the resource declaration in parentheses after `try`. Java closes it **automatically** at the end of the block — normal exit or exception, no `finally` needed:

```java
try (BufferedReader r = Files.newBufferedReader(path)) {
    return r.readLine();
}   // r.close() is called here, guaranteed, on every path
```

Declare several, separated by semicolons, and they close in **reverse order** of opening — the correct order for nested resources:

```java
try (var in = Files.newInputStream(src);
     var out = Files.newOutputStream(dst)) {
    in.transferTo(out);
}   // out closed first, then in
```

### What makes a resource: `AutoCloseable`

The magic isn't specific to files. Any object whose class implements **`AutoCloseable`** (a single `close()` method) can go in the parentheses — streams, readers, `Connection`, `Scanner`, and any type of your own. That's the whole contract: implement `AutoCloseable`, and your type works with try-with-resources for free.

```java
class Session implements AutoCloseable {
    public void close() { /* release */ }   // called automatically
}
```

### The subtle win: suppressed exceptions

Here's the correctness bug hand-written `finally` almost always has. Suppose the `try` body throws, *and then* `close()` also throws while cleaning up. Which exception wins? In a manual `finally`, the `close()` exception **replaces** the original — you lose the real error and see only the cleanup failure. Try-with-resources gets this right: the **original exception propagates**, and the `close()` exception is attached to it as a **suppressed** exception (visible in the trace as `Suppressed:`, retrievable via `getSuppressed()`). The real failure stays primary; nothing is silently lost.

### Why this is the default now

Try-with-resources isn't a convenience — it's a correctness upgrade you should reach for by reflex:

- **No leaks.** Close is guaranteed on every exit path, including ones you forgot to think about.
- **Less code, read top-down.** The resource's lifetime is exactly the block; there's no `finally` to scan for.
- **Right exception semantics.** The primary failure survives; cleanup failures are suppressed, not swapped in.

The rule is simple: **if it's `AutoCloseable`, open it in a try-with-resources.** Reserve a bare `finally` for cleanup that isn't a closeable resource. This is also what makes the file API in the rest of the module safe to use — every stream and channel you're about to open is `AutoCloseable`.
