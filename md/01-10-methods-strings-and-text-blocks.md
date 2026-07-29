## Methods, strings and text blocks

Two everyday tools round out the essentials: **methods**, the way you name and reuse a piece of behaviour, and **strings**, the type you'll handle text with in almost every program.

### Methods — named, reusable behaviour

A method has a **return type**, a **name**, a **parameter list**, and a **body**. It takes inputs, does work, and hands back a result (or `void` for nothing):

```java
int add(int a, int b) {
    return a + b;
}
```

Call it by name — `add(2, 3)` gives `5`. Methods are how you avoid repetition and give a name to intent: a well-named method turns a block of logic into a single readable line at the call site.

**Overloading** — Java lets several methods share a name as long as their parameter lists differ. The compiler picks the right one by the arguments you pass:

```java
double area(double r)            { return Math.PI * r * r; }   // circle
double area(double w, double h)  { return w * h; }             // rectangle
```

Same idea ("area"), two shapes of input — no need to invent `areaCircle` and `areaRect`.

### Strings — text, and immutable

A `String` is a sequence of characters, written in double quotes. The one fact that governs everything: **strings are immutable**. Every "modifying" method returns a *new* string and leaves the original untouched.

```java
String s = "Hello";
s.toUpperCase();          // returns "HELLO" — but s is STILL "Hello"
String loud = s.toUpperCase();   // keep the result
```

The everyday methods: `length()`, `charAt(i)`, `substring(from, to)`, `indexOf(...)`, `toUpperCase()` / `toLowerCase()`, `trim()` / `strip()`, `replace(...)`, `split(...)`, `contains(...)`, and `isBlank()`. And to compare text, **always use `.equals()`** — `==` asks whether two references point at the same object, not whether the characters match.

### Building strings

- `+` concatenation is fine for a handful of pieces: `"Hi, " + name`.
- **`String.format`** (and `formatted`) build a templated string with placeholders: `"%s is %d".formatted(name, age)`.
- Building a string in a **loop**? Use a **`StringBuilder`** — because strings are immutable, `s += x` in a loop quietly allocates a new string every pass; `StringBuilder.append` mutates one buffer instead.

### Text blocks — multi-line strings

For anything spanning lines — JSON, SQL, HTML, a help message — a **text block** (triple quotes) drops the escape-character soup and keeps the text readable as-is:

```java
String json = """
    { "id": 1, "city": "Mumbai" }
    """;
```

No `\n`, no `\"` — what you see is what you get. It's the modern default whenever a string runs past one line. With methods to name behaviour and strings to carry text, you now have the full essentials toolkit — module 02 turns to the objects those methods live on.
