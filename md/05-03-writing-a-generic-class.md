## Writing a generic class

Consuming `List<T>` is one thing; writing your *own* type with a parameter is where generics click. A generic class declares a type parameter after its name and then uses that parameter throughout — as a field type, a method argument, a return type — as if it were a real type it just doesn't know yet.

### Declaring the parameter

Put the type parameter in angle brackets after the class name; from there `T` is usable anywhere inside:

```java
public class Box<T> {
    private T value;                       // a field of the unknown type

    public Box(T value) { this.value = value; }
    public T get()          { return value; }      // returns a T
    public void set(T value){ this.value = value; } // takes a T
}
```

At the use site the caller picks `T`, and every `T` locks to it:

```java
Box<String> b = new Box<>("hi");
String s = b.get();     // no cast — T is String here
b.set(42);              // COMPILE ERROR — T is String, not int
```

`Box` is written once and works for any type, each use fully checked. This is exactly how the collection classes are built.

### Multiple type parameters

Declare several, comma-separated — this is how `Map<K, V>` and a `Pair` work:

```java
public record Pair<A, B>(A first, B second) {}   // records are generic too

Pair<String, Integer> p = new Pair<>("age", 30);
String k = p.first();    // A = String
int    v = p.second();   // B = Integer
```

A generic **record** is often the cleanest way to return two values from a method without inventing a one-off class.

### The rules that surprise people

A type parameter is a *compile-time* placeholder, and (for reasons the erasure section makes clear) it isn't a fully real type at run time. Three consequences bite early:

- **You can't `new` a `T`.** `new T()` won't compile — the class doesn't know which constructor to call. The workaround is to pass in a factory: `Supplier<T>` or a `T` value.
- **You can't have a `static` member of type `T`.** `T` belongs to an *instance* (`new Box<String>()` vs `new Box<Integer>()`), so a `static T shared;` is meaningless and rejected. (A `static` *method* can still be generic — with its *own* parameter; that's section 04.)
- **You can't `new T[]`.** Generic array creation is a compile error, for reasons in section 09; you back a generic container with `Object[]` and cast internally, as `ArrayList` itself does.

### Bounding a parameter — a first taste

Inside `Box<T>`, `T` could be *any* type, so you can only call `Object` methods on it (`toString`, `equals`). The moment you need more — say to compare or measure `T` — you **bound** it, promising `T` has certain capabilities:

```java
public class SortedBox<T extends Comparable<T>> {   // T must be Comparable
    public int compareTo(T other) { ... }           // now T has compareTo
}
```

That `extends` is a *constraint*, not inheritance — the subject of section 05. For now the takeaway: a generic class is an ordinary class with one or more type placeholders. Declare them after the name, use them as real types inside, and remember the three "you can't" rules that fall out of how generics run. Next: making an individual *method* generic, independent of its class.
