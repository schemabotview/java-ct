## Streams and `Optional` together

The two types that close this module are not neighbours by accident — they're the **same idea at two scales.** A `Stream<T>` is a pipeline over *many* elements; an `Optional<T>` is a pipeline over *zero or one*. They share `map`, `filter`, and `flatMap`, they share laziness of intent, and they hand off to each other at the ends of a computation. This section is where the whole module clicks together.

### They speak the same language

Put their operations side by side and the family resemblance is exact — an `Optional` is a stream that holds at most one value:

```java
stream.map(f).filter(p)        // transform & keep, over many
optional.map(f).filter(p)      // transform & keep, over zero-or-one
```

That's why the reflexes you built for streams transfer wholesale: `map` transforms what's inside, `filter` can empty it, `flatMap` avoids nesting. Learn the shape once; it works at both scales.

### The natural handoff: a pipeline that might find nothing

The two meet most often at a terminal. A stream searches; the result *might not exist*; so the honest return type is `Optional`. `findFirst`, `min`, `max`, and the one-arg `reduce` are exactly this junction — stream in, `Optional` out — and you finish by leaving the box:

```java
String top = employees.stream()
    .filter(e -> e.dept() == ENGINEERING)
    .max(comparingInt(Employee::salary))   // Optional<Employee> — the dept might be empty
    .map(Employee::name)                   // Optional<String>, only if one was found
    .orElse("no engineers");               // leave the box with a default
```

The whole computation — search, then extract, then default — reads as one sentence, and the empty case is handled by construction, never by a forgotten null check.

### The other direction: `flatMap` turns Optionals back into a stream

Going the other way, you often have a stream of things, each of which *might* yield a value — an `Optional` per element. Mapping gives you a clumsy `Stream<Optional<T>>`; you want just the values that are present. Because an `Optional` behaves like a zero-or-one stream, `flatMap` flattens it perfectly — empties vanish, values pass through:

```java
List<Email> emails = users.stream()
    .map(User::email)                 // Stream<Optional<Email>>  — awkward
    .flatMap(Optional::stream)        // Optional.stream(): empty -> 0 elems, present -> 1
    .toList();                        // Stream<Email> — only the present ones
```

`Optional.stream()` is the bridge that makes this seamless: it turns each `Optional` into a 0-or-1-element stream, and `flatMap` concatenates them, dropping the absent ones with no `filter(isPresent)` / `map(get)` dance.

### The module in one throughline

Step back and the whole of module 07 is a single story about **describing a computation instead of performing it.** A lambda made behaviour a value (06). A stream threads those values through a pipeline over many elements. Laziness lets the pipeline fuse stages and short-circuit. Collectors assemble the result; `reduce` folds it; parallel streams run the very same description across cores. And `Optional` carries that discipline down to the "zero or one" case, so a result that might not exist is a *type*, not a `null` waiting to fail. Data in, a description of the transform in the middle, a value out — with the empty case honest at every step. That is functional Java, and it's the style the rest of your Java will increasingly be written in.
