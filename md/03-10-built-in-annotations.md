## Built-in annotations

An **annotation** is metadata you attach to code — a class, method, field, or parameter — with an `@` name. It doesn't change what the code *does* on its own; it's a note that the compiler or a tool reads. You've already used one all through module 02: `@Override`. This section rounds out the handful the language and standard library ship, so the syntax stops looking like magic.

### The compiler-facing four

These annotations talk to the **compiler** — it acts on them at build time:

- **`@Override`** — "this method overrides a supertype method." Not required, but it makes the compiler *verify* you actually are; a typo'd signature that silently becomes a new method fails to compile instead. Put it on every override, always.
- **`@Deprecated`** — "avoid this; it may be removed." Callers get a compiler warning. Pair it with a Javadoc `@deprecated` note saying what to use instead, and optionally `@Deprecated(since="21", forRemoval=true)`.
- **`@SuppressWarnings("unchecked")`** — "I know about this warning; stay quiet here." Use it narrowly, on the smallest scope, only when you understand *why* the warning is safe to ignore.
- **`@FunctionalInterface`** — "this interface has exactly one abstract method." The compiler enforces that, so the interface stays usable as a lambda target. It's the subject of module 06 — mentioned here so you recognise it.

(A fifth, `@SafeVarargs`, suppresses a specific generics-plus-varargs warning — you'll meet it if you write such a method.)

### What an annotation actually is

Annotations are declared with `@interface`, and two **meta-annotations** define their reach — worth knowing so the mechanism isn't a black box:

- **`@Target`** — *where* it may be placed (method, field, type, parameter…).
- **`@Retention`** — *how long* it survives: `SOURCE` (discarded after compile, e.g. `@Override`), `CLASS` (in the `.class` file but not loaded), or **`RUNTIME`** (readable while the program runs).

That last one is the important bridge. A `RUNTIME` annotation can be inspected *as the program runs*, via **reflection** — and that's the engine behind every framework you'll meet: `@Test` (JUnit), `@Entity` (JPA), `@Controller` (Spring). The framework scans your classes for its annotations and wires up behaviour accordingly.

### Elements — annotations that carry data

An annotation can take named values in parentheses, called **elements**:

```java
@Test(timeout = 500)
@Deprecated(since = "21", forRemoval = true)
@SuppressWarnings({"unchecked", "deprecation"})
```

A single unnamed value can be written bare — `@SuppressWarnings("unchecked")` is shorthand for `value = "unchecked"`.

### The takeaway

For your own everyday code, the one non-negotiable habit is **`@Override` on every override** — it's free and it catches real bugs. `@Deprecated` and a tight `@SuppressWarnings` show up as you maintain code. The deeper story — writing your own `RUNTIME` annotations and reading them with reflection to build framework-style behaviour — is exactly where **module 10** picks up. For now: an annotation is a labelled note on your code, and knowing `@Target`/`@Retention` tells you who gets to read it. That closes module 03 — you now have the full modern toolkit for *modelling* data; the coming modules turn to *working* with it.
