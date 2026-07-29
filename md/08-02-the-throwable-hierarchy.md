## The `Throwable` hierarchy — checked vs unchecked

Everything you can `throw` or `catch` in Java is an object, and every one of them descends from a single root class: **`Throwable`**. Its shape is not decoration — the branches of this hierarchy encode *who is responsible* for an error, and that determines whether the compiler forces you to deal with it.

### The three tiers under `Throwable`

```
Throwable
├── Error              — the JVM is broken; do NOT catch (OutOfMemoryError, StackOverflowError)
└── Exception          — application problems
    ├── RuntimeException  — UNCHECKED: bugs and misuse (NullPointer, IllegalArgument, ...)
    └── (everything else) — CHECKED: recoverable external failures (IOException, SQLException)
```

- **`Error`** signals a failure in the JVM itself — out of memory, stack overflow. These are not meant to be caught; there's nothing your code can do to recover, so let them stop the program.
- **`Exception`** is the branch for application-level problems — the ones your code throws and handles. It splits into two kinds, and the split is the most important distinction in the whole topic.

### Checked vs unchecked: the compiler's dividing line

The line runs through `Exception`: **`RuntimeException` and its subclasses are *unchecked*; every other `Exception` is *checked*.** The difference is entirely about what the compiler demands.

- A **checked** exception (`IOException`, `SQLException`) represents a failure *outside your control but foreseeable* — the disk is full, the network dropped. The compiler **forces** you to acknowledge it: either `catch` it, or declare `throws IOException` on your method. Skip both and the code won't compile.
- An **unchecked** exception (`NullPointerException`, `IllegalArgumentException`, `IndexOutOfBoundsException`) represents a **programming bug** — a contract you violated. The compiler says nothing; these can be thrown anywhere, and you're expected to *fix the bug*, not catch it.

```java
void read() throws IOException {     // checked — must declare or catch
    Files.readString(path);          // this call itself declares throws IOException
}

void use(List<Integer> xs) {
    xs.get(99);                       // unchecked — IndexOutOfBounds, no declaration needed
}
```

### How to read the split as intent

The distinction is really a design conversation baked into the type system: *is this a condition a caller could reasonably anticipate and recover from, or is it a broken assumption in the code?*

- **Recoverable and external → checked.** "The file might not be there" is a real possibility a caller must plan for; the compiler makes them plan.
- **A bug in the program → unchecked.** "I dereferenced null" or "I passed a negative size" isn't recovered at runtime; it's fixed in the source. Forcing `try/catch` around every possible bug would drown real logic in noise.

### The practical consequences

This tier decides your daily habits. You **catch checked exceptions** because you must and often can do something useful (retry, fall back, report). You generally **don't catch unchecked ones** — you let them surface as the loud stack trace from section 01 that points you at the bug to fix. And you **never catch `Error`**. When you design your own exceptions (section 04), this same choice returns: extend `RuntimeException` for a caller-bug, extend `Exception` for a recoverable condition you want callers to handle deliberately.
