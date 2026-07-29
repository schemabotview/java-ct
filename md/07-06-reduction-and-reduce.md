## Reduction and `reduce`

`sum`, `count`, `max`, `min` all do the same fundamental thing: they walk a stream and fold it down to **one value**. That pattern is called **reduction**, and `reduce` is the general tool underneath all of them — the operation you reach for when the named shortcut you want doesn't exist.

### The shape of every reduction

A reduction repeatedly combines a running **accumulator** with the next element, using a two-argument function. Start with a value, then for each element compute "accumulator so far, combined with this element" → new accumulator. Sum is the archetype:

```java
int total = 0;                      // the identity — a starting accumulator
for (int n : nums) total = total + n;   // combine: (acc, element) -> acc
```

`reduce` is exactly that loop, expressed as a value. You give it two things: an **identity** (the starting accumulator) and a **`BinaryOperator`** (the combine step, `(acc, element) -> newAcc`):

```java
int total = nums.stream()
    .reduce(0, (acc, n) -> acc + n);    // identity 0, combine by +
                                        // (or the shorthand reduce(0, Integer::sum))
```

Read it as: *start at 0, and fold each number in with `+`.* Swap the identity and the operator and you get a different reduction from the same machinery — `reduce(1, (a, b) -> a * b)` is product, `reduce("", String::concat)` is concatenation.

### Two rules the identity and combiner must obey

`reduce` only gives correct answers if its function is well-behaved — and this matters enormously once section 08 runs it in parallel:

- **The identity must be neutral.** Combining it with any element must return that element unchanged: `0 + x == x`, `1 * x == x`, `"" + x == x`. Use `0` for a sum, `1` for a product — never the other way around.
- **The operator must be associative.** `(a ∘ b) ∘ c` must equal `a ∘ (b ∘ c)`. Addition and multiplication qualify; subtraction does not (`(10-3)-2 ≠ 10-(3-2)`). Associativity is what lets Java split the work across threads and recombine in any order — it's the hidden contract behind parallel streams.

### The two-argument form vs. the one-argument form

The form above always returns a plain value, because the identity *is* the answer for an empty stream (an empty sum is `0`). Drop the identity and you get a different, honest signature:

```java
Optional<Integer> total = nums.stream()
    .reduce((a, b) -> a + b);       // no identity -> Optional
```

With no starting value, an **empty stream has no result at all** — so this overload returns `Optional<Integer>`, empty when the stream was empty. It's the same emptiness honesty you saw in `min`/`max` (which are themselves just reductions).

### When to actually use `reduce`

Most of the time you shouldn't — prefer the named terminal that says what you mean: `sum`, `count`, `max`, `average` are all reductions with a readable name, and for building collections `collect` (next section) is the right tool, not `reduce`. Save raw `reduce` for a genuinely custom fold with no built-in equivalent — combining records into a running summary, multiplying a stream of factors, merging with a domain-specific operator. When the shape is "many values in, one value out, by a combining rule," and nothing named fits, `reduce` is the primitive that expresses it.
