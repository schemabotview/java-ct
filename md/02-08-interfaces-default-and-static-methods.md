## Interfaces — with default and static methods

An **interface** is a pure **contract**: a named set of methods a type promises to provide, with no state of its own. Where an abstract class says "you *are* a kind of thing," an interface says "you can *do* this thing" — a capability. It's the most important tool in Java for keeping code loosely coupled.

### A contract that types `implement`

```java
public interface Shape {
    double area();          // any Shape must be able to give its area
    double perimeter();
}

public class Circle implements Shape {
    private final double r;
    public Circle(double r) { this.r = r; }
    public double area()      { return Math.PI * r * r; }
    public double perimeter() { return 2 * Math.PI * r; }
}
```

`Circle implements Shape` promises both methods. Now any code that needs "something with an area" can accept a `Shape` and never care which concrete class it got — the same dynamic dispatch as before, but with **no shared base class** forced on the implementers.

### The superpower: implement many

A class extends **one** superclass but can implement **many** interfaces. That's how a type mixes in several unrelated capabilities:

```java
public class Circle implements Shape, Comparable<Circle>, Serializable { ... }
```

`Circle` *is* a shape, *can be* compared, and *can be* serialized — three orthogonal capabilities, no awkward single hierarchy. Interfaces are Java's answer to "I need to be several things at once."

### `default` methods — evolving without breaking

Originally interfaces held only signatures. Since Java 8, an interface can ship a **`default`** method — a real implementation every implementer inherits unless it overrides:

```java
public interface Shape {
    double area();
    default String describe() {         // implementers get this for free
        return "area = " + area();
    }
}
```

This solved a hard problem: you can **add** a method to a widely-used interface without breaking the thousands of classes that already implement it — they simply inherit the default. It's exactly how `List` gained `stream()` and `sort()` without a flag day.

### `static` methods — helpers on the type

An interface can also hold **`static`** methods — utilities that belong to the concept but aren't tied to an instance, called on the interface itself:

```java
Shape unit = Shape.unitCircle();   // a static factory on the interface
```

### The design habit

Program to **interfaces**, not concrete classes. Accept a `List`, not an `ArrayList`; a `Shape`, not a `Circle`. Your code then depends on the *capability*, not the implementation — so you can swap implementations freely, test with fakes, and extend the system with new types. This "depend on abstractions" instinct is the through-line of good object-oriented design, and it sets up the final question of the module: when to combine objects by **inheriting** versus by **composing**.
