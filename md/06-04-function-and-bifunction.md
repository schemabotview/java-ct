## `Function` and `BiFunction`

A lambda needs a functional-interface type to *be*. You could declare one every time, but the standard library already ships the common shapes in **`java.util.function`** — a small vocabulary of ready-made interfaces that almost every lambda you write will target. The most fundamental is **`Function`**: something that takes one value and returns another.

### `Function<T, R>` — a transformation

`Function<T, R>` maps a `T` to an `R`. Its single method is **`apply`**:

```java
Function<String, Integer> length = s -> s.length();
length.apply("hello");     // 5

Function<Integer, Integer> square = n -> n * n;
square.apply(6);           // 36
```

`Function<String, Integer>` is "give me a `String`, I'll give you an `Integer`." It's the shape behind `stream.map(...)` — a mapping *is* a `Function`. The two type parameters are input then output: `Function<T, R>` — `T` in, `R` out.

### `BiFunction<T, U, R>` — two inputs

When the transformation needs **two** inputs, `BiFunction<T, U, R>` takes a `T` and a `U` and returns an `R`:

```java
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
add.apply(2, 3);           // 5

BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);
repeat.apply("ab", 3);     // "ababab"
```

Java stops at *two* inputs — there's no `TriFunction`. If you genuinely need three, pass a record, or curry (a function returning a function, section 09).

### The "operator" specializations — same-type shortcuts

Very often input and output are the *same* type. Rather than write `Function<Integer, Integer>`, use the operator aliases, which are just that with the types collapsed:

- **`UnaryOperator<T>`** — a `Function<T, T>`. `UnaryOperator<String> trim = String::trim;`
- **`BinaryOperator<T>`** — a `BiFunction<T, T, T>`. `BinaryOperator<Integer> sum = Integer::sum;`

`list.replaceAll(UnaryOperator)` and `stream.reduce(BinaryOperator)` are built on these — reduction, for instance, folds a stream with a `BinaryOperator`.

### Primitive specializations — avoiding boxing

Because a `Function<Integer, Integer>` boxes every `int` into an `Integer`, the package also ships primitive variants that work on raw `int`/`long`/`double` — `IntFunction<R>`, `ToIntFunction<T>`, `IntUnaryOperator`, and so on. You don't need to memorise them; just know they exist so a hot numeric pipeline needn't box. The naming is systematic: `IntFunction` takes an `int`, `ToIntFunction` returns an `int`, `IntUnaryOperator` is `int`→`int`.

### The takeaway

`Function` and `BiFunction` are the "compute a result" shapes — one or two inputs, one output — and their same-type aliases `UnaryOperator`/`BinaryOperator` cover the common case where nothing changes type. Reach for these standard interfaces instead of declaring your own; your lambda just supplies `apply`, and library methods like `map`, `reduce`, and `replaceAll` are typed in terms of them. The next section covers the other half of the vocabulary — the interfaces that *test* (`Predicate`), *consume* (`Consumer`), and *produce* (`Supplier`).
