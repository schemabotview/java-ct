## Higher-order methods

A **higher-order method** is one that **takes a function as a parameter, returns a function, or both.** You've been *calling* them all module — `filter`, `map`, `sort`, `forEach` all accept a function. This section is about *writing your own*, which is how you build APIs that let callers plug in behaviour.

### Taking a function — parameterise the behaviour

The moment a method has a "the part that varies" hole, a functional parameter fills it. Instead of hard-coding what to do, accept it:

```java
public static <T> List<T> filter(List<T> in, Predicate<T> keep) {
    var out = new ArrayList<T>();
    for (T x : in) if (keep.test(x)) out.add(x);   // caller supplies the test
    return out;
}
filter(users, u -> u.isActive());
```

`filter` owns the *loop*; the caller owns the *criterion*. This is the **Strategy pattern** from module 02 — but where you once passed an object implementing an interface, you now pass a lambda. Any "do X, but let the caller decide the details of X" API is a higher-order method: a `retry(action)`, a `measure(task)`, a `transaction(work)`.

### A retry, as one small higher-order method

```java
public static <T> T retry(int times, Supplier<T> action) {
    RuntimeException last = null;
    for (int i = 0; i < times; i++) {
        try { return action.get(); }               // run the caller's work
        catch (RuntimeException e) { last = e; }
    }
    throw last;
}
String body = retry(3, () -> httpGet(url));        // retry any Supplier up to 3 times
```

The *policy* (retry three times) lives in the method; the *work* (`httpGet`) is passed in. One generic method now retries anything.

### Returning a function — factories and configuration

A method can also *produce* a function, capturing its arguments (a closure) to configure the returned behaviour:

```java
public static Function<Integer, Integer> adder(int by) {
    return n -> n + by;             // captures `by` — a configured function
}
var add10 = adder(10);
add10.apply(5);                    // 15
```

`adder(10)` returns a *specialised* function. This is **currying / partial application** — turn a two-argument operation into a one-argument function by fixing one argument — and it's how you'd fake a `TriFunction` (a function returning a function returning a result).

### Both at once — decorating behaviour

The powerful shape takes a function *and* returns an enhanced one — wrapping behaviour, exactly like a decorator:

```java
static <T, R> Function<T, R> logged(Function<T, R> f) {
    return t -> {
        System.out.println("in: " + t);
        R r = f.apply(t);
        System.out.println("out: " + r);
        return r;
    };
}
var loudLength = logged(String::length);   // same function, now with logging
```

Memoization, timing, logging, caching — all are "take a function, return a wrapped function," added *without touching* the original.

### The takeaway

Higher-order methods are where functions-as-values pays off in *your* code, not just the library's. Accept a functional parameter to let callers inject behaviour (the modern Strategy pattern); return a function to build configured or decorated behaviour. This is precisely how the `Stream` API is designed — a chain of higher-order methods, each taking a function — which is why module 07 will feel like a natural extension of everything here. The closing section steps back to the judgement call: when this functional style genuinely helps, and when plain imperative code is clearer.
