## Generics gotchas — arrays and casts

Most generics friction traces to one clash: **arrays and generics have opposite designs.** Arrays are *covariant* and *reified* (they carry their type at run time); generics are *invariant* and *erased* (they don't). Mixing them produces the warnings and errors that make generics feel fiddly — and knowing the root cause makes each one obvious.

### Arrays are covariant — and it bites at run time

Unlike generics, `String[]` **is** an `Object[]`. That feels convenient, but it defers a type error from compile time to run time:

```java
Object[] arr = new String[3];   // legal — arrays are covariant
arr[0] = 42;                     // compiles… ArrayStoreException at RUNTIME
```

The array *remembers* it's really a `String[]` (it's reified) and throws when you insert an `Integer`. Generics deliberately went the *other* way — invariant, so the analogous mistake (`List<Object> = someStringList`) is a *compile* error, caught early. The two models are opposites by design.

### Why you can't create a generic array

Because generics are erased but arrays check their type at run time, **`new T[]` and `new List<String>[]` are compile errors** ("generic array creation"). If they were allowed, the array's run-time check would have *nothing to check against* — the element type was erased — so the covariant-store protection would silently break. Java forbids the creation rather than let that hole open.

The workarounds you'll actually use:

```java
// inside a generic class — back with Object[], cast on the way out (what ArrayList does)
T[] data = (T[]) new Object[n];        // unchecked warning — safe because it never escapes

// or avoid arrays entirely — the usual right answer
List<T> data = new ArrayList<>();      // no gotcha at all
```

The honest guidance: **prefer a `List<T>` to a `T[]`**. Generic collections sidestep the whole problem; reach for arrays only for primitives or a measured performance need.

### Unchecked warnings — what they mean and what to do

An **"unchecked"** warning is the compiler saying *"this cast involves an erased type, so I can't guarantee it's safe — you're vouching for it."* It appears on `(T[]) new Object[n]`, on casting a raw `List` to `List<String>`, and similar:

```java
List<String> names = (List<String>) rawList;   // unchecked — you promise it's really that
```

Don't ignore them blindly and don't blanket-suppress them. When you've *proven* a specific cast is safe, suppress it on the **narrowest scope** — ideally a single local variable or method — with a comment saying why:

```java
@SuppressWarnings("unchecked")   // safe: array is created here and never exposed as Object[]
T[] data = (T[]) new Object[n];
```

A repo-wide or class-wide suppression hides the *next*, real warning too — keep it tight.

### Varargs + generics — heap pollution and `@SafeVarargs`

A generic varargs method (`static <T> List<T> listOf(T... items)`) quietly creates a `T[]` under the hood — the same forbidden array, so the compiler warns about possible **heap pollution**. If your method only *reads* the varargs (never stores the array or leaks it), the operation is safe, and you certify that with **`@SafeVarargs`** on the method:

```java
@SafeVarargs
static <T> List<T> listOf(T... items) { return new ArrayList<>(Arrays.asList(items)); }
```

### The one-line summary

Every gotcha here is the same collision: *arrays keep their type at run time, generics erase theirs.* Keep them apart — **favour `List<T>` over `T[]`**, treat "unchecked" as a claim you must be able to justify (and suppress narrowly), and mark read-only generic varargs `@SafeVarargs`. Do that and the sharp edges stop cutting. With the mechanics complete, the final section steps back to designing generic APIs well.
