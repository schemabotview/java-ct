## `Set` — no duplicates

A **`Set`** models a group where **each element appears at most once**. It answers *"is this in the group?"*, not *"what's at position 3?"* — there are no indexes. Add the same value twice and the second add is simply ignored. Whenever you find yourself writing "the *unique* …" or checking membership, you want a `Set`.

### The defining behaviour

```java
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("jvm");
tags.add("java");        // ignored — already present
tags.size();             // 2
tags.contains("jvm");    // true — this is what Set is for, and it's fast
tags.remove("java");
```

`add` returns a `boolean` — `true` if the element was new, `false` if it was already there — which is a neat way to detect first-seen values in one step.

### How a `Set` knows two elements are "the same"

This is the crucial point: a `Set` decides duplicates using **`equals`** and **`hashCode`** — the exact contract from module 02 and 03. Two elements are "the same" if they're `equals` (and a correct `Set` requires their `hashCode`s to match). So a `HashSet<Point>` deduplicates correctly **only if `Point` overrides `equals`/`hashCode`** — which is another reason value types should be records. Put objects with the default identity-based `equals` into a `HashSet` and *nothing* looks duplicate, even two objects with identical fields.

### The three implementations — pick by ordering

All three are `Set`s; they differ in the **iteration order** they give you:

- **`HashSet`** — the default. **No order** at all (don't rely on it). Backed by a hash table, so `add`, `remove`, and `contains` are **O(1)** on average. Reach for this unless you need ordering.
- **`LinkedHashSet`** — keeps **insertion order** while iterating, at a small memory cost. Use it when you want "unique, but remember the order I saw them."
- **`TreeSet`** — keeps elements in **sorted order** (natural order, or a `Comparator`). Operations are **O(log n)**, not O(1), because it's a balanced tree. It also adds range queries via `NavigableSet` — `first()`, `last()`, `ceiling(x)`, `floor(x)`, `headSet`/`tailSet`. Note: a `TreeSet` uses `compareTo`/`Comparator` — *not* `equals` — to decide duplicates, so its ordering must be consistent with equality (more in section 09).

### Set operations

Because a `Set` is a mathematical set, the bulk methods give you union, intersection, and difference:

```java
a.addAll(b);       // union      → a becomes a ∪ b
a.retainAll(b);    // intersection → a becomes a ∩ b
a.removeAll(b);    // difference  → a becomes a \ b
```

### When to reach for it

Use a `Set` for **membership and de-duplication**: unique visitor ids, the set of permissions a user has, "have I processed this key already?", removing duplicates from a `List` (`new HashSet<>(list)`). Choose `HashSet` by default, `LinkedHashSet` when order-seen matters, `TreeSet` when you need sorted or range access. And for enum elements specifically, remember `EnumSet` from module 03 — faster still. Next: the `Map`, which is a `Set` of *keys* each carrying a value.
