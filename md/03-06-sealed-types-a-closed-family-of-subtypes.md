## Sealed types — a closed family of subtypes

An ordinary interface is *open*: anyone, anywhere, can write a new class that implements it, and you can never be sure you've seen them all. Usually that's a feature. But sometimes a type has a **fixed, known set of variants** — a shape is a circle, square, or triangle; a result is a success or a failure — and you *want* the compiler to know the list is complete. That's what a **sealed** type gives you: an interface (or class) that names exactly which types may extend it.

### Declaring a sealed hierarchy

Use `sealed` and a **`permits`** clause listing the allowed subtypes:

```java
public sealed interface Shape permits Circle, Square, Triangle {}

public record Circle(double radius)          implements Shape {}
public record Square(double side)            implements Shape {}
public record Triangle(double base, double h) implements Shape {}
```

`Shape` now has exactly three implementations, and the compiler enforces it — a fourth class trying to `implements Shape` from anywhere simply won't compile. (When the subtypes sit in the same file, you can even omit `permits` and let the compiler infer it.)

### Every subtype must declare its own openness

Sealing draws a boundary, so each permitted subtype has to say what happens at *it*. Every direct subtype must be exactly one of:

- **`final`** — it cannot be extended further (records are implicitly final — the common case);
- **`sealed`** — it continues the closed hierarchy with its *own* `permits` list;
- **`non-sealed`** — it deliberately re-opens, allowing unknown subclasses again.

This rule is what stops someone quietly escaping the seal by subclassing a permitted type.

### The real payoff: exhaustiveness

A sealed type tells the compiler the *complete* set of possibilities — so a `switch` covering every variant is provably exhaustive and needs **no `default`**:

```java
double area = switch (shape) {
    case Circle c   -> Math.PI * c.radius() * c.radius();
    case Square s   -> s.side() * s.side();
    case Triangle t -> 0.5 * t.base() * t.h();
};   // exhaustive — the compiler knows there are no other shapes
```

And here's the maintenance win: add a `Pentagon` to the `permits` list, and **every** `switch` like this stops compiling until you handle it. The compiler becomes a checklist that finds every place a new case must be considered — the single biggest reason to seal a hierarchy.

### Sealed + records = algebraic data types

Sealed interfaces and records are designed to work together: the **sealed interface** names a closed *family* ("a `Shape` is one of these"), and each **record** is one variant carrying its own data. Together they express what other languages call *sum types* or *algebraic data types* — model a domain as "a `PaymentResult` is a `Success(id)` or a `Failure(reason)`", and the compiler guarantees you handle both. This pairing, unlocked by pattern matching, is one of modern Java's most powerful modelling tools — and the next three sections are exactly how you take these families apart.
