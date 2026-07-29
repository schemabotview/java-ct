## Generic methods

A class isn't the only thing that can have a type parameter — a *single method* can declare its own. A **generic method** is parameterised independently of its class, which means even a plain, non-generic class (or a `static` utility) can have one perfectly type-safe generic method.

### The syntax: a `<T>` before the return type

The type parameter goes in angle brackets *just before the return type*. That leading `<T>` is what makes the method generic — `T` is then usable in the parameters and return:

```java
public static <T> T firstOrNull(List<T> list) {
    return list.isEmpty() ? null : list.get(0);
}

public static <T> List<T> repeat(T item, int n) {
    var result = new ArrayList<T>();
    for (int i = 0; i < n; i++) result.add(item);
    return result;
}
```

`firstOrNull` works for a `List<String>` *or* a `List<User>`, returning the matching type — no casts, no overloads. Note these are `static` and the class holding them needn't be generic at all; the method owns `T`.

### Type inference — you rarely write the type

The compiler infers the method's type argument from the *arguments you pass*, so calls look completely ordinary:

```java
String s = firstOrNull(List.of("a", "b"));   // T inferred as String
List<Integer> threes = repeat(3, 5);         // T inferred as Integer
```

You almost never state `T` explicitly. When inference genuinely can't tell (rare — e.g. an empty context), you can supply an explicit **type witness** before the method name:

```java
List<String> empty = Collections.<String>emptyList();   // witness: force T = String
```

You'll see this occasionally in library code; day to day, let inference do it.

### Generic class vs generic method — which to reach for

- Make the **class** generic when the parameter describes the *whole object's* state, held across many methods — a `Box<T>`, a `List<E>`, a `Cache<K,V>`. The type is fixed once, at construction.
- Make a **method** generic when the type is local to *one call* and doesn't need to live on the object — a utility that transforms or inspects whatever type it's handed. `Collections.sort`, `List.of`, `Optional.map`, and most of `java.util.Collections` are generic *methods*.

A good tell: if two calls to the same operation would naturally use *different* types, it wants to be a generic method, not a generic class.

### Relating parameters — the real power

Because a method can name several parameters and reuse them, it can express *relationships between* types that a signature otherwise couldn't:

```java
public static <K, V> Map<V, K> invert(Map<K, V> in) {   // swap keys and values
    var out = new HashMap<V, K>();
    in.forEach((k, v) -> out.put(v, k));
    return out;
}
```

The signature *guarantees* the output's key type is the input's value type and vice-versa — the compiler checks it, and callers read the contract straight from the types. That ability to tie inputs to outputs is what makes generic methods the backbone of the utility APIs you'll write. So far `T` has been unconstrained; next we give it *bounds*, so a method can require its type to actually *do* something.
