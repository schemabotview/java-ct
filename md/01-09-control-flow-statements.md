## Control flow statements

By default a method runs top to bottom, one statement after another. **Control flow** is how you break that straight line — choosing between paths and repeating work. Java's toolkit here is small and, in modern versions, unusually clean.

### Choosing: `if` / `else`

The workhorse. A `boolean` condition picks a branch:

```java
if (score >= 90) {
    grade = "A";
} else if (score >= 50) {
    grade = "pass";
} else {
    grade = "fail";
}
```

Always brace your blocks, even one-liners — it prevents a whole family of "dangling statement" bugs.

### Choosing among many: the modern `switch`

When you're branching on one value against many constants, a `switch` reads better than a ladder of `else if`. Modern Java made it far safer with the **arrow form**: no fall-through, and it can be an **expression** that produces a value.

```java
String kind = switch (day) {
    case SATURDAY, SUNDAY -> "weekend";
    default               -> "weekday";
};
```

Each arm handles exactly its labels — no accidental fall-through, no forgotten `break`. Compare that to the old colon-and-`break` form, where dropping a `break` silently ran into the next case. Prefer the arrow form.

### Repeating: the four loops

- **`for`** — when you know the count or need an index. Three parts: init, condition, update.

```java
for (int i = 0; i < 5; i++) { System.out.println(i); }
```

- **Enhanced `for` (for-each)** — when you just want each element, no index. Cleaner and the default for iterating a collection or array:

```java
for (String name : names) { System.out.println(name); }
```

- **`while`** — repeat as long as a condition holds; may run zero times.
- **`do…while`** — the same, but the body runs **at least once** before the check.

### Steering a loop: `break` and `continue`

- **`break`** exits the loop entirely.
- **`continue`** skips the rest of *this* iteration and jumps to the next.

```java
for (int n : numbers) {
    if (n < 0) continue;   // skip negatives
    if (n > 100) break;    // stop at the first big one
    process(n);
}
```

### The habit to build

Reach for **for-each** to walk a collection, an **arrow `switch`** to map one value to many outcomes, and a plain **`for`** only when you genuinely need the index. Keep conditions simple and blocks braced — readable control flow is most of readable code.
