## Equality, hashing and collection contracts

`HashSet`, `HashMap`, and their `Tree` cousins are only as correct as the elements you put in them. They quietly depend on **`equals`**, **`hashCode`**, and (for the tree kinds) **`compareTo`** obeying their contracts. Get those right and collections just work; get them wrong and you'll chase bugs where a key you clearly inserted "isn't there." This section makes the dependency explicit.

### How a `HashMap` actually finds a key

A hash map is a bank of **buckets**. To locate a key it does two steps:

1. Compute the key's **`hashCode`** to pick a bucket (fast — jumps near the right place).
2. Walk that bucket comparing with **`equals`** to find the exact key.

So both methods are load-bearing: `hashCode` decides *where to look*, `equals` decides *which one it is*. This is why the module-02 rule is absolute here — **equal objects must have equal hash codes.** Break it and a key can hash to bucket A while its "equal" twin hashes to bucket B; the lookup checks the wrong bucket and reports "absent."

### The failure modes, concretely

- **Overrode `equals` but not `hashCode`.** Two "equal" keys get different buckets. `map.get(equalKey)` returns `null`; a `HashSet` stores visible duplicates. The single most common collections bug.
- **Neither overridden (default identity).** Every distinct object is its own key, so a `new Point(1,1)` never matches another `new Point(1,1)`. (Fix both by making value types **records** — they generate a correct pair.)
- **A bad `hashCode`** (e.g. `return 0;` for all keys). Everything lands in one bucket; the map degrades from O(1) to **O(n)** — a linear scan wearing a hash map's clothing.

### The mutable-key trap

Even with correct methods, mutating a key *after* inserting it breaks the map:

```java
var key = new ArrayList<>(List.of("a"));
map.put(key, "value");
key.add("b");             // hashCode just changed → entry is now in the WRONG bucket
map.get(key);             // null — the entry is effectively lost
```

The entry sits in the bucket for its *old* hash, but lookups compute the *new* one. The rule: **keys (and `Set` elements) must be immutable**, or at least never mutated in a way that changes `hashCode`/`equals`. This is the deepest reason to reach for records and `String` as keys.

### The tree contract is different — it uses comparison

`TreeMap` and `TreeSet` **don't call `equals` or `hashCode` at all** — they decide both ordering *and* equality by `compareTo` (or a `Comparator`). Two elements are "the same" to a tree when comparison returns `0`. So an ordering **inconsistent with `equals`** makes a `TreeSet` behave oddly: `BigDecimal("1.0")` and `BigDecimal("1.00")` are *not* `equals`, yet `compareTo` says they're equal — put both in a `TreeSet` and it keeps only one. The rule: for tree collections, keep **`compareTo` consistent with `equals`** (`compareTo == 0` ⇔ `equals`), or know precisely why you're deviating.

### The takeaway

The contracts aren't academic — they're the reason your data structures find what you stored. Two habits cover almost everything: make value types **records** (correct `equals`/`hashCode` for free) and keep **keys and set-elements immutable**. For tree-based collections, additionally keep the ordering consistent with equality. Honour that and hashing and sorting are invisible machinery; ignore it and they become the hardest bugs you'll meet. With the contracts clear, the final section pulls the whole module together: choosing the right collection.
