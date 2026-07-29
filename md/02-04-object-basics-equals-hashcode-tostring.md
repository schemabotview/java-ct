## Object basics — `equals`, `hashCode`, `toString`

Every class in Java secretly extends one root class: **`Object`**. That means every object you ever create already has a handful of methods — and three of them, `equals`, `hashCode`, and `toString`, matter so much that getting them right (or letting the tools generate them) is part of writing any real class.

### The defaults are rarely what you want

Straight from `Object`, the defaults are identity-based:

- `equals` compares **references** — two objects are "equal" only if they're the *same* object.
- `hashCode` returns a number tied to that identity.
- `toString` returns something useless like `BankAccount@6d06d69c`.

For a **value** — a `Point`, a `Money`, a `Name` — that's wrong. Two points at (1, 2) *should* be equal even if they're separate objects. So you **override** these methods to be based on the fields instead.

### `equals` — logical equality

`equals` should answer "do these represent the same value?" by comparing the fields that define identity:

```java
Point p1 = new Point(1, 2);
Point p2 = new Point(1, 2);
p1 == p2;         // false — different objects
p1.equals(p2);    // true  — same value, once equals is overridden
```

This is the payoff of the `==`-vs-`.equals()` rule from module 01: `==` is identity, `.equals()` is value. Override `equals` and value comparison finally works.

### `hashCode` — and the contract that binds it

Here's the rule people trip on: **if you override `equals`, you must override `hashCode` too.** Hash-based collections — `HashMap`, `HashSet` — first bucket an object by its `hashCode`, then confirm with `equals`. The contract: **equal objects must return equal hash codes.** Break it, and a `HashSet` will happily store two "equal" points as separate entries, or fail to find a key you just put in.

The rule of thumb: use the **same fields** in both `equals` and `hashCode`, and you'll never violate the contract.

### `toString` — a readable label

`toString` is what prints when you log or concatenate an object. A good one shows the meaningful fields, which turns debugging from guesswork into reading:

```java
public String toString() {
    return "Point[x=" + x + ", y=" + y + "]";
}
// System.out.println(p1)  ->  Point[x=1, y=2]
```

### You rarely write these by hand

Because the three are mechanical and easy to get subtly wrong, you almost never hand-write them: your **IDE generates** all three from the fields you pick, and — the modern answer — a **`record` generates them for you automatically** from its components. That's a major reason records exist, and exactly where module 03 picks up. For a plain class holding data, know the contract; for most data, let a record honour it.
