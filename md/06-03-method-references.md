## Method references

Very often a lambda does nothing but *call one existing method* — `x -> System.out.println(x)`, `s -> Integer.parseInt(s)`. For that case Java has an even shorter, clearer form: the **method reference**, written with `::`. It names the method you'd call and lets the compiler wire the arguments through.

### The shorthand

```java
list.forEach(x -> System.out.println(x));   // lambda
list.forEach(System.out::println);          // method reference — identical

names.stream().map(s -> s.toUpperCase());    // lambda
names.stream().map(String::toUpperCase);     // method reference
```

`System.out::println` reads as "the `println` method of `System.out`." When a lambda's *whole body* is a single method call whose arguments line up with the lambda's parameters, the method reference says the same thing with less noise — and often reads more like intent ("uppercase each") than mechanics.

### The four kinds

They differ in *what the target of the call is*:

- **Static method** — `Type::staticMethod`
  `Integer::parseInt` ≡ `s -> Integer.parseInt(s)`
- **Bound instance** — `object::method` (a *specific* object you already have)
  `System.out::println` ≡ `x -> System.out.println(x)`
- **Unbound instance** — `Type::instanceMethod` (the instance is the *first parameter*)
  `String::toUpperCase` ≡ `s -> s.toUpperCase()` — the receiver is supplied per call
- **Constructor** — `Type::new`
  `ArrayList::new` ≡ `() -> new ArrayList<>()`; `Point::new` ≡ `(x, y) -> new Point(x, y)`

The one that trips people is the third: `String::toUpperCase` looks static but isn't — the object the method runs *on* becomes the lambda's first argument. So `Function<String,String> f = String::toUpperCase` takes a `String` and calls `toUpperCase()` on it.

### Reading them by shape

A quick way to tell bound from unbound: if the `::` is on an **instance** (`System.out::`, `myList::add`), the receiver is *fixed* — that object. If it's on a **type** (`String::`, `Integer::`), either it's `static`, or the receiver is the *first argument* passed in. Constructor references (`::new`) build a new object from the arguments — perfect where a `Supplier` or factory is wanted:

```java
Supplier<List<String>> maker = ArrayList::new;      // () -> new ArrayList<>()
map.computeIfAbsent(key, k -> new ArrayList<>());    // …or ArrayList::new won't fit (needs k)
Stream.generate(Random::new);                        // constructor as a Supplier
```

### When to prefer which

Reach for a **method reference** when the lambda is *purely* a call to a named method — it's shorter and states the operation by name. Keep a **lambda** when the body does anything more — extra arguments, a transformation, multiple statements, or when a reference would actually be *less* clear:

```java
.map(String::trim)                         // ✅ reference — clean
.map(s -> s.trim().toLowerCase())          // ✅ lambda — two calls, reference can't express it
.filter(s -> s.length() > 3)               // ✅ lambda — logic, not a single call
```

Method references and lambdas are interchangeable wherever both fit; choose whichever reads more like *what you mean*. With the syntax now covered both long and short, the next sections name the **interfaces** these lambdas satisfy — starting with `Function`.
