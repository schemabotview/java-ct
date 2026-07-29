## Composing functions

The real leverage of functions-as-values is that you can **combine small ones into bigger ones**. Rather than write a big lambda, you build a pipeline from named pieces. The standard functional interfaces ship with `default` methods for exactly this — composition is why they carry more than their single abstract method.

### `Function` — `andThen` and `compose`

Two `Function`s chain into one. The only thing to get straight is the *order*:

```java
Function<Integer, Integer> times2 = n -> n * 2;
Function<Integer, Integer> plus1  = n -> n + 1;

times2.andThen(plus1).apply(10);   // 21  → times2 FIRST, then plus1:  (10*2)+1
times2.compose(plus1).apply(10);   // 22  → plus1 FIRST, then times2:  (10+1)*2
```

- **`f.andThen(g)`** — run `f`, then feed its result to `g`. Reads left-to-right, the intuitive order.
- **`f.compose(g)`** — run `g` *first*, then `f` (the mathematical `f(g(x))` order).

When in doubt, use **`andThen`** — it reads in execution order.

### `Predicate` — `and`, `or`, `negate`

Predicates combine with boolean logic, so you build a complex test from simple ones without a tangled expression:

```java
Predicate<String> nonBlank = s -> !s.isBlank();
Predicate<String> shortish = s -> s.length() < 20;

Predicate<String> valid = nonBlank.and(shortish);   // both must hold
Predicate<String> invalid = valid.negate();          // logical NOT
Predicate<String> either = nonBlank.or(shortish);    // at least one
list.removeIf(nonBlank.negate());                    // remove the blanks
```

Each returns a *new* `Predicate`, leaving the originals untouched — small, reusable, named tests you assemble at the point of use.

### `Consumer` — `andThen`

Consumers chain too, running one after another on the *same* input — handy for "do several things with each element":

```java
Consumer<Order> log   = o -> System.out.println("processing " + o.id());
Consumer<Order> save  = repo::save;
orders.forEach(log.andThen(save));    // log each, then save each
```

### `Comparator` — the composition you already met

Module 04's `Comparator` builders are this same idea: `comparing(...).thenComparing(...).reversed()` composes a multi-key ordering out of single-key parts. Seeing it here reframes it — a `Comparator` is a function, and `thenComparing`/`reversed` are its composition operators.

```java
people.sort(comparing(Person::lastName).thenComparing(Person::firstName));
```

### Why compose at all

Composition lets you name each step once and assemble behaviours declaratively:

- **Readability** — `validate.andThen(normalize).andThen(save)` states a pipeline as a sentence.
- **Reuse** — `nonBlank`, `shortish`, `times2` are defined once and combined many ways.
- **Testability** — each small function is trivially testable on its own; the composite inherits their correctness.

This is the mental model that makes **streams** click in module 07: a stream pipeline is composed functions with data flowing through — `filter(predicate).map(function).forEach(consumer)`. Composition is the bridge from "a function is a value" to "a program is a pipeline." Next: methods that *take and return* functions — the higher-order methods that make composition a first-class tool in your own APIs.
