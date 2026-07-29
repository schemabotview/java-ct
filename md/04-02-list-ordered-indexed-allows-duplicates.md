## `List` — ordered, indexed, allows duplicates

A **`List`** is the collection you'll reach for most: an **ordered sequence** where every element has a position (a zero-based **index**), order is preserved, and **duplicates are allowed**. If you're thinking "a bunch of things in a row," you want a `List`.

### The core operations

`List` is an interface; its methods all speak in terms of position and value:

```java
List<String> names = new ArrayList<>();
names.add("Ada");            // append → index 0
names.add("Grace");          // append → index 1
names.add("Ada");            // duplicates are fine → index 2

names.get(1);                // "Grace"  — read by index
names.set(0, "Alan");        // replace index 0
names.size();                // 3
names.indexOf("Ada");        // 0        — first match
names.contains("Grace");     // true
names.remove("Ada");         // removes the FIRST "Ada" (by value)
names.remove(0);             // removes index 0 (by position) — mind the overload
```

Watch that last pair: `remove(Object)` and `remove(int index)` are different methods. For a `List<Integer>`, `list.remove(2)` removes *index 2*, not the value 2 — a classic trap. Use `list.remove(Integer.valueOf(2))` when you mean the value.

### `ArrayList` — the default implementation

**`ArrayList`** is a resizable array, and it's the right default the vast majority of the time:

- **`get(i)` and `set(i, …)` are O(1)** — instant random access by index.
- **`add(e)` at the end is O(1) amortised** — occasionally it grows the backing array, but on average appending is cheap.
- **Inserting or removing in the *middle* is O(n)** — everything after the gap shifts. Fine occasionally; avoid in a hot loop.

If you know roughly how many elements you'll hold, `new ArrayList<>(1000)` pre-sizes the array and skips the regrowth.

### `LinkedList` — rarely the answer

`LinkedList` implements `List` too, as a doubly-linked chain of nodes. In theory it inserts/removes in O(1) *once you're at the spot* — but `get(i)` is O(n) because it must walk the chain, and the per-node memory overhead and cache-unfriendliness make it slower than `ArrayList` in practice. The honest guidance: **default to `ArrayList`**; reach for `LinkedList` almost never (and when you want a queue or stack, use `ArrayDeque`, section 05, not `LinkedList`).

### Order, and a modern convenience

A `List` keeps insertion order, so iterating gives elements back in the sequence you added them. Java 21 formalises this "has a first and last, in order" idea with the **`SequencedCollection`** interface, which `List` now implements — giving handy endpoint methods like `getFirst()`, `getLast()`, `addFirst(…)`, `addLast(…)`, and `reversed()`:

```java
names.getFirst();   // clearer than names.get(0)
names.getLast();    // clearer than names.get(names.size() - 1)
```

Reach for a `List` whenever order matters or duplicates are meaningful — a log of events, items in a cart, the rows of a result. When you instead care about *"is this present?"* with **no** duplicates, that's a `Set` — next.
