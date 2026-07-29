## Abstract classes

Sometimes a base class is a genuine concept — every subtype *is* one — but the base itself is too general to instantiate. What is "a shape," with no idea whether it's a circle or a square? An **abstract class** captures exactly that: a partial class you can extend but never `new` directly.

### `abstract` — a class you can't instantiate

Mark a class `abstract` and the compiler forbids `new` on it. It exists only to be extended:

```java
public abstract class Shape {
    public abstract double area();            // no body — subclasses must supply it

    public String describe() {                // concrete — shared by all shapes
        return "A shape with area " + area();
    }
}

new Shape();   // compile error — Shape is abstract
```

### Abstract methods — a promise, not an implementation

An **abstract method** has a signature and no body. It's a *contract*: "every concrete subclass must provide this." A subclass that doesn't implement every abstract method is itself still abstract. Fill them all in and the subclass becomes concrete — instantiable:

```java
public class Circle extends Shape {
    private final double r;
    public Circle(double r) { this.r = r; }
    @Override public double area() { return Math.PI * r * r; }   // fulfils the contract
}
```

`new Circle(2)` works; `describe()` — inherited, unchanged — calls the `Circle`'s `area()` through dynamic dispatch. That's the pattern: **the base defines the shared skeleton and the holes; each subclass fills the holes.**

### The power: template methods

Because an abstract class can mix **concrete** methods with **abstract** ones, it can lay out an algorithm's *structure* while leaving specific steps to subclasses:

```java
public abstract class Report {
    public final void print() {   // the fixed skeleton — final so it can't be overridden
        header();
        body();      // abstract — each report fills this in
        footer();
    }
    protected void header() { ... }   // shared default
    protected abstract void body();   // the varying step
    protected void footer() { ... }   // shared default
}
```

Subclasses supply only `body()`; the ordering and the shared parts are guaranteed. This is real reuse of *behaviour*, not just fields.

### Abstract class vs interface

Both let you program to an abstraction, and the line between them narrowed once interfaces gained default methods — but the distinction stands:

- Reach for an **abstract class** when subtypes share **state** (fields) and **implementation**, and there's a real "is-a" hierarchy. A class extends only **one**.
- Reach for an **interface** (next section) when you're defining a **capability** that unrelated types can implement, and you want a type to mix in **several**.

Rule of thumb: **abstract class for a partial *thing*; interface for a *capability*.** When in doubt, prefer the interface — it couples less — which is exactly where we head next.
