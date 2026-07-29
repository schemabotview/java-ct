## Immutable factories & defensive copies

A collection you hand to a caller is a shared, mutable object — and if you're not careful, they can change *your* internal state through it. This section is about controlling that: how to create collections that **can't** be modified, and how to defend the mutable ones at your boundaries. It's the collection-level version of the immutability discipline from records.

### The `of` factories — compact immutable collections

Since Java 9, each interface has static **`of`** factories that build a small, **unmodifiable** collection in one call:

```java
List<String> colors = List.of("red", "green", "blue");
Set<String>  tags   = Set.of("java", "jvm");
Map<String, Integer> caps = Map.of("red", 0xFF0000, "green", 0x00FF00);
```

These are perfect for constants and literals. Three things to know about them:

- They are **truly immutable** — any `add`/`remove`/`set`/`put` throws `UnsupportedOperationException`.
- They are **null-hostile** — a `null` element or key throws immediately (a deliberate design choice).
- `Set.of`/`Map.of` **reject duplicate** elements/keys at construction (throws), since a fixed literal shouldn't contain them.

For a snapshot of an existing collection, **`List.copyOf(other)`** makes an immutable copy.

### Unmodifiable *view* vs immutable *copy* — a real distinction

Two different things are easy to confuse:

```java
List<String> live = new ArrayList<>(List.of("a", "b"));
List<String> view = Collections.unmodifiableList(live);   // a read-only WINDOW onto live
view.add("c");     // throws — you can't change it through the view…
live.add("c");     // …but changing the ORIGINAL is visible through the view!  view is now [a, b, c]

List<String> snap = List.copyOf(live);                    // an independent SNAPSHOT
live.add("d");     // snap is unaffected — it's a separate copy
```

An **unmodifiable view** blocks changes *through that reference*, but still reflects edits to the underlying collection. A **copy** is independent. When you want a guarantee that *nothing* changes, take a **copy**, not a view.

### Defensive copies — guarding your own state

The classic leak: a class stores a collection it was handed, or hands out its internal one. Either way, an outsider now holds a reference to your private state and can mutate it behind your back.

```java
public final class Team {
    private final List<String> members;

    public Team(List<String> members) {
        this.members = List.copyOf(members);   // copy IN — later edits to the arg don't touch us
    }
    public List<String> members() {
        return members;                        // already immutable — safe to return directly
    }
}
```

Copy **in** at the constructor (so the caller can't keep a back-door reference), and either copy **out** or return an unmodifiable view from getters (so callers can't mutate your field). This is exactly the `List.copyOf` idiom from records — here applied to any class holding a collection.

### The habit

Prefer **immutable** collections wherever the contents are fixed — `List.of` for literals, `copyOf` for snapshots — because immutable objects are safe to share, cache, and use as map keys, with no defensive copying at all. Where you *must* hold a mutable collection, **copy at the boundary**: in on the way in, out (or as a view) on the way out. Leaks of internal collections are one of the most common real-world bugs, and this one habit prevents them. Next: putting collections in order — `Comparable` and `Comparator`.
