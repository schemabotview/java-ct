## Why generics

You've used generics in every collection so far — `List<String>`, `Map<Long, User>` — and never once cast an element on the way out. That's the whole point of generics: they let a class or method work with *any* type while keeping the compiler's full type-checking. This module explains the machinery you've been relying on, so you can *design* with it, not just consume it.

### Life before generics

Until Java 5, a collection held `Object`, so it could hold *anything* — and you paid for it on the way out with a cast that might fail at run time:

```java
List names = new ArrayList();       // raw — holds Object
names.add("Ada");
names.add(42);                      // oops — nothing stops this
String s = (String) names.get(1);   // compiles… ClassCastException at RUNTIME
```

The bug — putting an `Integer` in a list of names — isn't caught until the program crashes on the cast, possibly far from where the wrong value went in. Every read was a cast, and every cast was a leap of faith.

### What generics changed

Parameterise the type and the compiler enforces it *at compile time*:

```java
List<String> names = new ArrayList<>();
names.add("Ada");
names.add(42);            // COMPILE ERROR — caught immediately, at the mistake
String s = names.get(0);  // no cast — the compiler knows it's a String
```

Three wins fall out of that one change:

- **Type safety** — a whole class of `ClassCastException`s becomes a *compile error*, surfaced at the line that's actually wrong.
- **No casts** — reads return the right type directly; the code is cleaner and the compiler, not you, tracks the types.
- **Self-documenting** — `Map<Long, User>` states its contract in the signature. You know what goes in and comes out without reading the body.

### The core idea: a type as a parameter

A generic type takes a **type parameter** — a placeholder, conventionally a single capital letter, that's filled in when you use the type. `List<E>` is "a list of some element type `E`"; write `List<String>` and every `E` becomes `String`, so `add` demands a `String` and `get` returns one. The class is written *once*, generically, and specialised *per use* by the compiler — the same source serves `List<String>`, `List<User>`, and `List<int[]>`, each fully type-checked.

The naming conventions you'll see everywhere: **`E`** element, **`K`**/**`V`** key/value, **`T`** type, **`N`** number, **`R`** result, **`S`,`U`** further types.

### Where this module goes

We'll move from *using* generic types (reading their signatures, the diamond) to *writing* them — generic **classes**, generic **methods**, **bounded** type parameters (`T extends Comparable<T>`), and the part that trips everyone up: **wildcards** and the **PECS** rule for flexible APIs. Then we lift the hood on **type erasure** — what the JVM actually keeps at run time — which explains a family of **gotchas** with arrays and casts, before closing on designing real generic APIs. The thread throughout: generics push type errors from *run time* to *compile time*, and understanding erasure is what makes their sharp edges make sense.
