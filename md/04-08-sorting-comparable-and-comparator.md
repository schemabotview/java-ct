## Sorting — `Comparable` and `Comparator`

To sort, Java needs to know how to compare two elements. There are two ways to supply that: **`Comparable`**, which bakes a *natural order* into the type itself, and **`Comparator`**, a *separate* object describing one particular ordering. Numbers and strings already have a natural order; for your own types, you choose one, the other, or both.

### `Comparable` — the type's natural order

Implement `Comparable<T>` and its single method `compareTo`, which returns a negative number, zero, or positive for *"this is before / equal to / after that."* This is the type's *one* built-in order:

```java
public record Money(long cents) implements Comparable<Money> {
    public int compareTo(Money o) {
        return Long.compare(cents, o.cents);   // never subtract — it can overflow
    }
}
Collections.sort(payments);   // uses compareTo — payments must be Comparable
```

One rule to burn in: **compare, don't subtract.** `a - b` on `int`s can overflow and flip sign for large values; `Integer.compare(a, b)` / `Long.compare` are correct and just as short.

### `Comparator` — orderings on demand

Often you need to sort the *same* type several different ways — people by age, then by name, then by name reversed. A `Comparator<T>` is a standalone ordering you pass to the sort. Modern Java builds them declaratively with `Comparator.comparing` and friends — you almost never write `compare` by hand:

```java
people.sort(Comparator.comparing(Person::lastName));                  // by last name
people.sort(Comparator.comparing(Person::lastName)
                      .thenComparing(Person::firstName));             // tie-break by first
people.sort(Comparator.comparingInt(Person::age).reversed());        // oldest first
people.sort(Comparator.comparing(Person::nickname,
                                 Comparator.nullsLast(naturalOrder()))); // nulls to the end
```

- **`comparing(keyExtractor)`** — order by a derived key.
- **`thenComparing(...)`** — the tie-breaker when the first key is equal.
- **`reversed()`** — flip the whole ordering.
- **`nullsFirst`/`nullsLast`** — decide where `null`s land instead of crashing.

Prefer the numeric specializations `comparingInt`/`comparingLong`/`comparingDouble` for primitive keys — they avoid boxing.

### Where sorting happens

- **`list.sort(cmp)`** (or `Collections.sort(list)`) sorts a `List` in place — a stable, O(n log n) sort.
- **`TreeSet`/`TreeMap`** stay sorted continuously; you hand the ordering to their constructor: `new TreeSet<>(comparator)`.
- **Streams** (module 07) sort a pipeline with `.sorted(comparator)`, leaving the source untouched.

Pass `null` as the comparator (or use the no-arg `Collections.sort`) and it falls back to the elements' `Comparable` natural order — which fails loudly if the type isn't `Comparable`.

### Choosing between them

Give a type a **`Comparable`** natural order only when there's one obviously-canonical ordering (money by amount, dates chronologically). For everything else — and for the *many* ways you'll want to sort people, orders, or rows in real code — use a **`Comparator`**, composed with `comparing`/`thenComparing`. A subtle rule links this to the next section: a `Comparable` order should ideally be **consistent with `equals`** (`compareTo == 0` exactly when `equals` is `true`), because `TreeSet` and `TreeMap` decide equality by *comparison*, not `equals` — the contract we examine now.
