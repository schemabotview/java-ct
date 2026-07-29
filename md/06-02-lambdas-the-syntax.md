## Lambdas — the syntax

A lambda has three parts: a **parameter list**, the **arrow** `->`, and a **body**. That's the whole grammar — `(parameters) -> body` — but it flexes in a few ways worth knowing so you can read and write every form fluently.

### The shapes of the parameter list

```java
()        -> 42                    // no parameters
x         -> x * 2                 // exactly one — parentheses optional
(x, y)    -> x + y                 // several — parentheses required
(int x, int y) -> x + y            // explicit types (usually inferred, so rarely needed)
```

The rules: **one** untyped parameter may drop its parentheses (`x -> …`); zero or two-plus need them; and you *may* write the types but almost never do, because the compiler infers them. You can also use `var` for parameters (`(var x, var y) -> …`) if you want to attach an annotation.

### The two body forms

```java
x -> x * 2                         // expression body — its value is the result
x -> { return x * 2; }             // block body — needs an explicit return
name -> {                          // block for multiple statements
    System.out.println(name);
    return name.length();
}
```

An **expression body** has no braces and no `return` — the expression *is* the returned value (this is the common, tidy form). A **block body** uses `{ }` and, if it returns something, an explicit `return`. Use the expression form whenever the logic fits in one expression.

### Target typing — where the lambda's type comes from

A lambda by itself has no type; it takes its type from **context** — the functional interface it's being assigned to or passed as. This is called **target typing**:

```java
Runnable r            = () -> System.out.println("hi");   // target type: Runnable → run()
Comparator<String> c  = (a, b) -> a.length() - b.length();// target type: Comparator → compare()
Callable<String> k    = () -> "result";                   // same shape, different target
```

The *identical* lambda shape `() -> …` becomes a `Runnable`, a `Callable`, or anything else with a matching single method, depending on where it's used. The compiler checks the lambda's parameters and return against that one abstract method. This is why a lambda can only appear where a functional-interface type is expected — assigning one to a `var` with no target fails, because there's nothing to infer the type from.

### A note on `->` vs the switch arrow

You met `->` already in module 01's arrow `switch`. They're *different uses of the same token*: in `switch`, `->` separates a label from its result; here it separates a lambda's parameters from its body. Context tells them apart — no confusion in practice, just don't expect them to be "the same feature."

### Reading real lambdas

Put it together and the everyday forms read at a glance:

```java
list.forEach(item -> System.out.println(item));          // Consumer: one arg, void body
list.removeIf(s -> s.isBlank());                         // Predicate: one arg, boolean
list.sort((a, b) -> a.compareTo(b));                     // Comparator: two args, int
button.onClick(() -> save());                            // Runnable-ish: no args
```

Each is "parameters, arrow, what to do" — the parameters matching the interface's method, the body supplying its logic. Often the body is *just a call to an existing method*, and for that there's an even shorter spelling — the **method reference**, next.
