## Records — one-line immutable data classes

A huge amount of code exists only to carry data from one place to another — a pair of coordinates, a row from a database, a response body. Written as an ordinary class, that "just data" carrier drowns in boilerplate: private final fields, a constructor, an accessor each, and correct `equals`, `hashCode`, and `toString`. A **`record`** collapses all of it into one line.

### The whole class, in a line

```java
public record Point(int x, int y) {}
```

That header — the **record components** `(int x, int y)` — is the entire specification. From it the compiler generates:

- a `private final` field for each component;
- a **canonical constructor** `Point(int x, int y)` that assigns them;
- an **accessor** per component, named for it: `x()` and `y()` (note: `x()`, *not* `getX()`);
- **`equals`** and **`hashCode`** based on all components — value equality, honouring the contract from module 02;
- a readable **`toString`**: `Point[x=1, y=2]`.

```java
var p = new Point(1, 2);
p.x();                      // 1
p.equals(new Point(1, 2));  // true — value equality, for free
p.toString();               // Point[x=1, y=2]
```

Fifty lines of hand-written, bug-prone boilerplate become a header you can read at a glance.

### Records are immutable by design

Every component is `final`; there are no setters. A record's state is fixed at construction — to "change" one, you create a new one:

```java
var moved = new Point(p.x() + 1, p.y());   // a new Point; p is untouched
```

That immutability is the point, not a limitation. Immutable values are safe to share across threads, safe as `Map` keys and `Set` members (their `hashCode` never changes), and easy to reason about — nobody can mutate one behind your back.

### What a record *is*, underneath

A record is a normal class that `extends Record`. So it can implement interfaces, declare extra methods, hold static fields and static factories, and be generic (`record Pair<A, B>(A first, B second) {}`). What it **cannot** do: extend another class (its superclass is fixed as `Record`), or add mutable instance fields beyond its components. It's deliberately narrow — a record is a *transparent carrier for an immutable tuple of values*, and the restrictions are what keep that promise honest.

### When to use one

Reach for a record whenever a type's identity *is* its data and that data doesn't change: DTOs and API payloads, coordinates and money and ranges, a compound map key, the return value when a method needs to hand back two things, the events and value-objects of a domain model. Records also pair beautifully with the sealed types and pattern matching still to come in this module — a sealed family of records is the idiomatic way to model "one of these shapes" in modern Java. The next section shows how to add validation and behaviour without giving up the one-line spirit.
