## Modern Java, not 1998 Java

The Java people complain about — pages of boilerplate, a getter for every field, `AbstractSingletonProxyFactoryBean` — is real, but it's *old*. The language on your screen in 2026 is far leaner. Same static safety, a fraction of the ceremony.

### The clearest example: a data class

Here's how you modelled a simple immutable point for most of Java's history — a field, a constructor, two getters, plus `equals`, `hashCode`, and `toString` to be well-behaved:

```java
public final class Point {
    private final int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    public int x() { return x; }
    public int y() { return y; }
    // …equals, hashCode, toString: ~20 more lines
}
```

Modern Java says all of that in one line — a **record**:

```java
public record Point(int x, int y) {}
```

Same immutability, same accessors, and `equals`/`hashCode`/`toString` generated for you. The intent — *"a point is just an x and a y"* — is no longer buried in boilerplate.

### It's a pattern, not one lucky feature

- **`var`** drops the repeated type name: `var users = new ArrayList<String>();` instead of writing `ArrayList<String>` twice.
- **Switch expressions** *return a value* and use `->` arms with no fall-through: `var day = switch (n) { case 6, 7 -> "weekend"; default -> "weekday"; };`.
- **Text blocks** kill escape-character soup:

```java
String json = """
    { "id": 1, "city": "Mumbai" }
    """;
```

- **Streams** turn a loop-and-accumulate into a readable pipeline: `names.stream().filter(s -> s.length() > 3).sorted().toList()`.

### Why it kept improving: the cadence

Since **Java 9**, a new version ships **every six months**, with a **long-term-support (LTS)** release every couple of years — **8, 11, 17, 21**. Features incubate as *previews*, get feedback, then become permanent. That steady rhythm is why the language modernized without breaking the billions of lines already in production — old code still compiles and runs.

The takeaway for this course: we write **modern, idiomatic Java 21** from the start. When you see verbose Java in an old codebase, you'll recognize it as legacy style, not as *the* way Java has to look.
