## `Map` — key-to-value lookup

A **`Map`** stores **key → value** associations: give it a key, get back the value. A phone book (name → number), a cache (request → result), a tally (word → count). It's the workhorse for "look something up by its identifier," and after `List` it's the collection you'll use most.

### The basics

```java
Map<String, Integer> ages = new HashMap<>();
ages.put("Ada", 36);
ages.put("Grace", 45);
ages.put("Ada", 37);          // same key → replaces the old value (keys are unique)

ages.get("Ada");              // 37
ages.get("nobody");           // null — key absent
ages.getOrDefault("nobody", 0);   // 0  — a default instead of null
ages.containsKey("Grace");    // true
ages.size();                  // 2
ages.remove("Grace");
```

The **keys form a `Set`** — each key is unique, so `put` on an existing key *replaces*. `get` on a missing key returns `null`, which is why **`getOrDefault`** is often the safer read.

### The methods that make maps pleasant

Hand-written "look, maybe create, then update" code is where map bugs live. The framework has purpose-built methods that do it atomically and readably:

```java
// count words — no null-checking, no "if absent" branch
counts.merge(word, 1, Integer::sum);          // new key → 1; existing → old + 1

// group items under a key — create the list only if missing
groups.computeIfAbsent(key, k -> new ArrayList<>()).add(item);

ages.putIfAbsent("Ada", 99);   // only sets if the key is absent
```

`merge` and `computeIfAbsent` replace the classic `if (map.containsKey(k)) … else …` dance — learn them; they come up constantly (and in interviews).

### Viewing a map's contents

A `Map` isn't `Iterable` directly; you iterate one of its three **views**:

```java
for (var e : ages.entrySet()) {              // the idiomatic way
    System.out.println(e.getKey() + " = " + e.getValue());
}
ages.keySet();     // Set<String>   — just the keys
ages.values();     // Collection<Integer> — just the values
ages.forEach((name, age) -> ...);            // or a lambda
```

`entrySet()` is the one to reach for when you need both key and value — it's a single pass, versus looking up each value by key.

### The implementations

- **`HashMap`** — the default. **No ordering**, O(1) average `get`/`put`. Allows one `null` key. Use it unless you need order.
- **`LinkedHashMap`** — preserves **insertion order** (and can be configured as an LRU cache).
- **`TreeMap`** — keys kept **sorted**, O(log n), with navigation (`firstKey`, `ceilingKey`, `subMap`). Uses `compareTo`/`Comparator` on keys.

### The keys carry the same contract

Because lookup hashes the key then compares with `equals`, **a `HashMap` key type must have correct `equals`/`hashCode`** — records and `String` are ideal. And never mutate a key after inserting it: change a field that feeds `hashCode` and the entry becomes unreachable, lost in the wrong bucket. Prefer **immutable keys**. That contract — shared by `HashSet` and `HashMap` — gets its own close look in section 09. Next, though, a different shape of collection: `Queue` and `Deque`, for processing elements in order.
