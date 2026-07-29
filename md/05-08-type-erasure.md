## Type erasure — what the JVM actually sees

Everything so far happens at *compile time*. At *run time*, Java generics largely **disappear** — a process called **type erasure**. Understanding it turns a pile of confusing "why can't I…?" errors into a single, predictable rule.

### What erasure does

When the compiler is done checking your generic code, it **erases** the type parameters and compiles down to code that uses the *bound* (or `Object` if unbounded), inserting casts where needed:

```java
// what you write
List<String> list = new ArrayList<>();
list.add("hi");
String s = list.get(0);

// what the JVM effectively runs (types erased, cast inserted)
List list = new ArrayList();
list.add("hi");
String s = (String) list.get(0);
```

`List<String>` becomes plain `List`; `<T>` becomes `Object`; `<T extends Number>` becomes `Number`. The generic type information is used to *verify* your code, then thrown away. The casts the old pre-generics code made by hand are still there — the compiler just writes them *for* you, and guarantees they'll never fail.

### The one consequence that explains the rest

**All instantiations of a generic type share one class at run time.** `List<String>` and `List<Integer>` are the *same* class, `List`:

```java
new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass();   // true!
```

There is no `List<String>` type in the running JVM — only `List`. Every restriction below follows from this single fact: *the run-time system simply doesn't know the type argument.*

### What you therefore cannot do at run time

- **No `T.class` / `List<String>.class`.** A class literal needs a real run-time type; the type parameter has none. (`List.class` — the raw form — is legal.)
- **No `instanceof List<String>`.** The check can't see the argument, so only `x instanceof List<?>` (or raw `List`) is allowed.
- **No `new T()` or `new T[]`.** The run time doesn't know which class to instantiate. (Pass a `Supplier<T>`, or a `Class<T>` token, when you truly need to create a `T`.)
- **No two overloads that differ only by type argument** — `f(List<String>)` and `f(List<Integer>)` erase to the *same* signature `f(List)`, a compile error.

None of these are arbitrary; each is "the run time doesn't have the type argument" wearing a different hat.

### Why Java chose erasure

It was a **backward-compatibility** decision. Generics arrived in Java 5, long after millions of lines of raw-`List` code existed. Erasure let generic and legacy code interoperate on the *same* `List` class — a `List<String>` and an old raw `List` are the same type at run time, so both keep working. The price is the restrictions above (and the loss of run-time type info). Languages that **reify** generics (keep the argument at run time, like C#) avoid these gotchas but couldn't have made that migration.

### The practical upshot

Two habits handle almost everything. When you *need* a type at run time, pass a **`Class<T>` token** (`Class<T> type` — the pattern behind `EnumSet.allOf`, JSON parsers, etc.) since the type parameter itself is gone. And when the compiler emits an **"unchecked" warning**, understand that it's telling you *"I can't verify this cast survives erasure — you're vouching for it."* That warning, and the array/cast gotchas it flags, are the whole of the next section.
