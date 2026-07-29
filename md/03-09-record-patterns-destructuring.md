## Record patterns — destructuring

A type pattern tells you *what* an object is and hands you the whole thing. A **record pattern** (final in Java 21) goes one step further: it looks *inside* a record and binds its components directly, in one move. Instead of matching a `Point` and then calling `p.x()` and `p.y()`, you pull `x` and `y` straight out of the pattern.

### Matching and destructuring at once

```java
// type pattern — bind the whole record, then read its parts
if (obj instanceof Point p) {
    int sum = p.x() + p.y();
}

// record pattern — bind the parts directly
if (obj instanceof Point(int x, int y)) {
    int sum = x + y;                    // x and y are in scope, already the right types
}
```

`Point(int x, int y)` is a **record pattern**: it matches when `obj` is a `Point` *and* simultaneously binds `x` and `y` to its components. The shape mirrors how the record was declared, so it reads naturally. You can write `var` for a component's type and let it be inferred: `Point(var x, var y)`.

### Nesting — reach through structure

The real power shows when records contain records. A record pattern can **nest**, destructuring several layers in a single pattern:

```java
record Point(int x, int y) {}
record Line(Point start, Point end) {}

if (obj instanceof Line(Point(var x1, var y1), Point(var x2, var y2))) {
    double len = Math.hypot(x2 - x1, y2 - y1);   // all four coordinates, one pattern
}
```

One pattern reached through `Line` → both `Point`s → all four `int`s. Doing that by hand would be a cascade of casts and accessor calls; the pattern states the shape you expect and binds every piece.

### Where it pays off most: `switch` over sealed records

Combine the three ideas from this module — **sealed** family, **pattern `switch`**, and **record patterns** — and you get remarkably clear code that the compiler still proves exhaustive:

```java
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

double area = switch (shape) {
    case Circle(var r)       -> Math.PI * r * r;
    case Rectangle(var w, var h) -> w * h;
};   // no default — sealed + exhaustive
```

Each arm names the variant *and* unpacks its data in one line. This is the payoff the whole module has been building toward: model the domain as a sealed family of records, then take it apart with pattern-matching `switch` — declarative, exhaustive, and checked.

### Guards and the mental model

Record patterns compose with `when` guards too — `case Circle(var r) when r > 10 -> "big circle"`. The way to read any pattern is as a **shape you're asserting**: *"if this value is a `Line` of two `Point`s, name their coordinates `x1, y1, x2, y2`."* If the shape matches, the names are bound; if not, the arm is skipped. That's the same idea as the `instanceof` type pattern you started with, now able to see *structure*, not just type — the destructuring counterpart to how you build these values with a constructor.
