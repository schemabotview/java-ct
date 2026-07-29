## Enums with state and behaviour

In many languages an enum is just a list of named integers. Java's are **full objects** — each constant can carry its own **fields**, and the enum can have **constructors** and **methods**. That single fact turns the enum from a labelled number into a compact, type-safe way to attach data and behaviour to a fixed set of things.

### Constants with data

Give the enum fields and a constructor, then pass each constant its values in parentheses. The constructor is always **`private`** (you never `new` an enum constant — the JVM creates them):

```java
public enum Planet {
    MERCURY(3.30e23, 2.44e6),
    EARTH  (5.97e24, 6.37e6);          // each constant supplies its own args

    private final double mass, radius;

    Planet(double mass, double radius) {   // implicitly private
        this.mass = mass;
        this.radius = radius;
    }

    public double gravity() {              // behaviour, shared by all constants
        return 6.67e-11 * mass / (radius * radius);
    }
}

double g = Planet.EARTH.gravity();
```

Now `Planet.EARTH` isn't a bare label — it *knows* its mass and radius and can compute its own gravity. The data lives with the constant, immutable, defined once.

### Behaviour that differs per constant

Sometimes each constant should behave *differently*. Declare an **abstract method** on the enum and let each constant supply its own body — a clean alternative to a `switch` that would need updating every time you add a constant:

```java
public enum Operation {
    PLUS  { public int apply(int a, int b) { return a + b; } },
    TIMES { public int apply(int a, int b) { return a * b; } };

    public abstract int apply(int a, int b);
}

int r = Operation.TIMES.apply(3, 4);   // 12 — dispatches to TIMES's body
```

Each constant is effectively its own tiny subclass. Add `MINUS` and the compiler *forces* you to give it an `apply` — the behaviour can't be forgotten, because it lives on the constant itself.

### Enums can implement interfaces

An enum can't extend a class (it already extends `Enum` behind the scenes), but it **can implement interfaces**. So `Operation` could implement a `IntBinaryOperator`, letting each constant slot straight into code that expects that capability — enums participate in polymorphism like any other type.

### When to reach for a rich enum

This pattern is perfect for a **fixed set of strategies or categories that each carry data or logic**: units of measurement with conversion factors, HTTP status categories, discount rules, a state machine's states with their allowed transitions. The moment the "list of constants" also needs *"…and each one has a rate / a label / a rule,"* put that data and behaviour on the enum itself rather than in scattered `switch` statements or parallel maps. It stays in one place, immutable, and exhaustively checked. Records, next, do the same trick for *open-ended* immutable data — data whose values aren't a fixed set.
