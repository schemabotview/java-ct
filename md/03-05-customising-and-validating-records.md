## Customising and validating records

A one-line record is perfect until you need it to *enforce* something — a temperature above absolute zero, a non-blank name, a normalised value. The mistake is to conclude "records are too rigid, I'll go back to a class." You don't have to: a record is a normal class, so you can add validation, methods, and factories while keeping every generated benefit.

### The compact constructor — validation without ceremony

To validate or normalise the components, write a **compact constructor**: the record name, *no parameter list*, just a body. It runs before the generated field assignments, and the components are in scope as if they were parameters:

```java
public record Temperature(double celsius) {
    public Temperature {                                   // compact — no (double celsius)
        if (celsius < -273.15)
            throw new IllegalArgumentException("below absolute zero");
    }
}
```

Now `new Temperature(-300)` throws, and the record is impossible to construct in an invalid state — the same "valid by construction" guarantee from module 02, in three lines. You can also **normalise** here by reassigning a component; the assignment flows into the final field:

```java
public record Name(String value) {
    public Name {
        value = value.strip();                 // normalise; the field stores the trimmed value
        if (value.isBlank()) throw new IllegalArgumentException("blank name");
    }
}
```

### Adding methods and static factories

A record can hold any methods you like — derived values, helpers, behaviour:

```java
public record Point(int x, int y) {
    public double distanceTo(Point o) {
        return Math.hypot(x - o.x, y - o.y);
    }
    public static Point origin() { return new Point(0, 0); }   // static factory
    public static final Point UNIT = new Point(1, 1);          // static constant
}
```

Instance methods, `static` factories, and `static` constants are all fair game — only *mutable instance* state is off-limits.

### Overriding an accessor or the canonical constructor

You can replace a generated member when you need to. Override an **accessor** to return a defensive copy of a mutable component (records don't copy for you):

```java
public record Team(String name, List<String> members) {
    public Team {
        members = List.copyOf(members);        // defensive copy in → truly immutable
    }
    public List<String> members() {
        return members;                        // already unmodifiable; safe to hand out
    }
}
```

`List.copyOf` is the idiom: guard mutable components at the boundary so the record's immutability isn't a lie.

### The line to hold

Add validation, derivation, and factories freely — but keep a record a **value**: no mutable fields, no identity, no side effects in its methods. If a type needs a lifecycle, mutation, or a superclass, it isn't a record; make it a class. Used this way you keep the one-line ergonomics *and* real invariants — which is exactly what makes records the natural members of the **sealed** families we turn to next.
