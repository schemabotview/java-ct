## Using generic types

Before writing your own generics, get fluent at *reading and instantiating* the ones the library gives you. Most day-to-day generics work is exactly this: supplying **type arguments** to an existing generic type and letting the compiler check the rest.

### Supplying type arguments

A generic type declares parameters in angle brackets; you *use* it by putting concrete types there:

```java
List<String>            names;   // E = String
Map<Long, User>         users;    // K = Long, V = User
Optional<BigDecimal>    price;    // T = BigDecimal
```

Those `<…>` are **type arguments**. Once supplied, every method specialises: `names.add(…)` demands a `String`, `users.get(id)` returns a `User`, `price.orElse(…)` takes a `BigDecimal`. The compiler substitutes and checks — you never cast.

### The diamond — don't repeat yourself

You must state the type argument on the *variable*, but on the `new` side the compiler can infer it from context. The empty `<>` is the **diamond operator**:

```java
Map<String, List<Integer>> m = new HashMap<>();   // NOT new HashMap<String, List<Integer>>()
```

The diamond says "same type arguments as the left-hand side." It keeps a nested generic readable — write the full type once, not twice. With `var`, the type argument instead comes from the right, so state it there:

```java
var names = new ArrayList<String>();   // var → put the <String> on the right
```

### Nesting and multiple parameters

Type arguments compose freely — a type argument can itself be generic:

```java
Map<String, List<Order>>        ordersByCustomer;   // values are lists
List<Map<String, Integer>>      rows;               // a list of maps
Map<Region, Map<String, Long>>  totals;             // a map of maps
```

Read these inside-out: `Map<String, List<Order>>` is "a map from `String` to (a list of `Order`)." Deeply nested generics are a hint to introduce a **record** or a type alias-like wrapper for readability — but the compiler handles any depth.

### Reading a generic method signature

Library signatures use type parameters too; learning to read them pays off immediately:

```java
V getOrDefault(Object key, V defaultValue)     // on Map<K,V> — returns a V
static <T> List<T> of(T... elements)           // List.of — T inferred from the args
Optional<U> map(Function<? super T, ? extends U> f)   // we'll decode ? extends later
```

The `V` and `T` are placeholders bound by the enclosing type or the call; a leading `<T>` (as in `List.of`) means the *method* introduces its own parameter — the subject of section 04.

### Raw types — the thing to avoid

Using a generic type with **no** type argument gives a **raw type** — a backward-compatibility relic that switches type-checking *off*:

```java
List raw = new ArrayList();   // raw — compiler warns "unchecked"
raw.add("ok");
raw.add(42);                  // no error now — you've lost all safety
```

Never write raw types in new code; they exist only so pre-2004 code still compiles. If you genuinely mean "a list of anything," the right spelling is the **unbounded wildcard** `List<?>` (section 06), which stays type-safe. With reading and instantiating in hand, the next step is writing a type that *has* a parameter of its own.
