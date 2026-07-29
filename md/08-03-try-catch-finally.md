## `try` / `catch` / `finally`

The three keywords that handle an exception form one construct. `try` marks the code that might fail, `catch` provides the recovery for a given failure type, and `finally` holds cleanup that must run no matter what. Getting their interplay right — especially the order of `catch` blocks and the guarantees of `finally` — is the core mechanic of the whole topic.

### The anatomy

```java
try {
    var text = Files.readString(path);   // guarded code — may throw
    process(text);
} catch (NoSuchFileException e) {         // most specific first
    System.out.println("missing: " + path);
} catch (IOException e) {                  // broader — catches the rest
    System.out.println("read failed: " + e.getMessage());
} finally {
    System.out.println("done");            // runs either way
}
```

If the `try` body throws, normal flow stops *immediately* at the throwing line — the rest of the `try` is skipped — and the runtime looks for the first `catch` whose type matches.

### Ordering: most specific first

`catch` blocks are tested top to bottom, and the **first matching type wins.** Because `NoSuchFileException` *is an* `IOException`, a broad `catch (IOException)` placed first would swallow the specific case and the specific block would be unreachable — in fact the compiler rejects it. **Rule: order catches from most specific to most general.** When two unrelated exceptions share one handler, the multi-catch bar avoids duplication:

```java
catch (IOException | SQLException e) { ... }   // one block, either type
```

### `finally`: the block that always runs

`finally` runs **whether or not** an exception was thrown, whether or not it was caught, and even when the `try` or `catch` exits early via `return`, `break`, or `continue`. Its purpose is cleanup that must not be skipped — closing a file, releasing a lock, resetting state:

```java
Connection c = open();
try {
    return c.query(sql);     // even this return runs finally FIRST
} finally {
    c.close();               // guaranteed, on the normal and the exceptional path
}
```

The only things that skip `finally` are a JVM shutdown (`System.exit`) or the process being killed — otherwise it is Java's strongest "this will run" guarantee.

### The one trap: don't `return` or `throw` from `finally`

Because `finally` runs last and has the final word, a `return` or `throw` inside it **overrides** whatever the `try` was doing — including swallowing an exception that was propagating:

```java
try {
    throw new IOException("real problem");
} finally {
    return 0;    // BUG: discards the IOException entirely — it never propagates
}
```

The genuine failure vanishes without a trace. Keep `finally` to pure cleanup; never let it change the method's result or hide an in-flight exception.

### Why this matters — and the better tool ahead

Ninety percent of `finally` blocks in older code exist for one reason: to close a resource. That pattern is so common, and so easy to get subtly wrong (what if `close()` itself throws? what if you opened two resources?), that Java gave it dedicated syntax — **`try-with-resources`** (section 06) — which writes the correct `finally` for you. Understand `try/catch/finally` first, because it's the foundation and still the right tool for genuine recovery logic; then let `try-with-resources` retire the boilerplate version.
