## The Collection hierarchy

Almost every program juggles *groups* of things — a list of orders, a set of tags, a map from user id to user. Java's **Collections Framework** is the standard library's answer: a small set of **interfaces** that describe *kinds* of groupings, and a handful of **implementations** behind them. Learn the shape of the hierarchy once and the whole framework becomes predictable.

### Interface vs implementation — the key split

The framework is deliberately two layers:

- **Interfaces** name a *capability*: `List`, `Set`, `Queue`, `Map`. They say what you can *do* — "ordered and indexed," "no duplicates," "key-to-value."
- **Implementations** are concrete classes: `ArrayList`, `HashSet`, `HashMap`, `ArrayDeque`. They decide *how* — the data structure and its performance.

The habit (straight from module 02's "program to interfaces") is to **type variables by the interface and pick the implementation with `new`**:

```java
List<String> names = new ArrayList<>();   // think "a List"; happen to use ArrayList
Map<String, Integer> ages = new HashMap<>();
```

Now callers depend on `List`, not `ArrayList`, and you can swap the implementation later without touching them.

### The map of the framework

At the root is **`Iterable`** — anything you can walk with a for-each loop. Below it sits **`Collection`**, the parent of the three that hold *elements*:

- **`List`** — an **ordered**, indexed sequence; **duplicates allowed**. "The third element," `[a, b, a]`.
- **`Set`** — a group with **no duplicates**; membership, not position. `{a, b}`.
- **`Queue` / `Deque`** — elements arranged for **ordered processing** (first-in-first-out, or both ends).

**`Map`** stands slightly apart: it holds **key → value** pairs, not single elements, so it is *not* a `Collection` (you can't `for (x : map)`). It's still part of the framework, and its keys and values are themselves collection-like.

### Everything is generic

Every collection is **generic** — parameterised by the type it holds: `List<String>`, `Map<Long, User>`, `Set<Tag>`. The `<…>` is the element type, checked by the compiler, so a `List<String>` can never accidentally hold an `Integer`, and you never cast on the way out. (Generics get their own module, 05; here we just *use* them.) The diamond `<>` on the right lets the compiler infer the type argument: `new ArrayList<>()`.

### Where this module goes

We'll take the big three in turn — **`List`**, **`Set`**, **`Map`** — then **`Queue`/`Deque`**, then the cross-cutting skills that apply to all of them: **iterating** safely, building **immutable** collections and defending mutable ones, **sorting** with `Comparable` and `Comparator`, and the **`equals`/`hashCode` contracts** that hash- and tree-based collections quietly depend on. We close by **choosing the right collection** for a problem. The framework is large, but it's the same few ideas repeated — pick the interface for the job, pick the implementation for the performance.
