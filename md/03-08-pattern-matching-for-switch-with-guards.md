## Pattern matching for `switch` — with guards

The type pattern from the last section becomes genuinely powerful when you put it inside a `switch`. **Pattern matching for `switch`** (final in Java 21) lets each `case` match on a *type*, bind a variable, and — with a guard — add a condition. Branching over "which kind of thing is this?" collapses from an `instanceof` ladder into one clean, checkable construct.

### `case` on a type pattern

Each arm names a type and binds a variable, exactly like `instanceof`:

```java
String describe(Object obj) {
    return switch (obj) {
        case Integer i -> "int " + i;
        case String s  -> "string of length " + s.length();
        case int[] a   -> "array of " + a.length;
        default        -> "something else";
    };
}
```

Each `case` tests the runtime type and binds the value already cast. This is the `instanceof` ladder rewritten as a single expression that *returns* a value.

### Guards — `when` adds a condition

A type match is often not specific enough — you want "a `String`, **but only if** it's long." A **guarded pattern** appends `when <boolean>`:

```java
String classify(Object obj) {
    return switch (obj) {
        case String s when s.isBlank() -> "blank string";
        case String s                  -> "string: " + s;      // the other strings
        case Integer i when i < 0      -> "negative";
        case Integer i                 -> "non-negative: " + i;
        default                        -> "other";
    };
}
```

Order matters with guards: cases are tried top to bottom, so put the **more specific** guarded case *before* the general one. The guard runs only after the type matches, so `s` is already a `String` when `s.isBlank()` is evaluated.

### Handling `null`

Historically a `switch` threw `NullPointerException` if the value was `null`. A pattern `switch` lets you handle it explicitly with a **`case null`** — and you can fold it in with the default:

```java
switch (obj) {
    case null      -> "nothing";
    case String s  -> "string";
    default        -> "other";
}
// or combine: case null, default -> ...
```

If you write no `case null`, the classic `NullPointerException`-on-null behaviour still applies — so handle `null` deliberately when the value might be one.

### Exhaustiveness with sealed types — the payoff

Put this together with a **sealed** type and the compiler can prove your `switch` covers every case, so you need **no `default`**:

```java
double area = switch (shape) {          // shape is a sealed Shape
    case Circle c   -> Math.PI * c.radius() * c.radius();
    case Square s   -> s.side() * s.side();
    case Triangle t -> 0.5 * t.base() * t.h();
};
```

No `default`, and if a `Pentagon` joins the sealed family, this stops compiling until you handle it. Resist adding a `default` "just in case" over a sealed type — the `default` is exactly what *silences* that helpful error. Sealed family plus pattern `switch` is the idiomatic modern replacement for the visitor pattern and the type-code ladder — and it gets sharper still when the patterns reach *inside* the records, which is destructuring, next.
