## `var` and local type inference

Java 10 added `var`, a way to declare a local variable without writing its type — the compiler *infers* it from the value on the right. The single most important thing to understand up front: **this is not dynamic typing.** The variable still has one fixed, static type forever; you just didn't have to spell it out.

### What it does

```java
var count = 10;                       // inferred: int
var name = "Ada";                     // inferred: String
var users = new ArrayList<String>();  // inferred: ArrayList<String>
```

The compiler reads the initializer, works out the type, and locks it in. From that point `count` *is* an `int` — `count = "x"` won't compile, exactly as if you'd written `int count`. You removed the redundant type name, nothing else.

### Where it shines: no more stuttering

The payoff is loudest when the type name is long and already obvious from the right-hand side:

```java
// before — the type is written twice
Map<String, List<Order>> ordersByCustomer = new HashMap<String, List<Order>>();

// after — say it once
var ordersByCustomer = new HashMap<String, List<Order>>();
```

It also cleans up loops and stream results where the exact type is long or hard to name.

### The rules (there are only a few)

- **Locals only.** `var` works for local variables inside methods, `for`/`for-each` loop variables, and try-with-resources. It **cannot** be a field, a method parameter, or a return type — those still need explicit types.
- **An initializer is required**, and it can't be `null`. `var x;` and `var x = null;` don't compile — there's nothing to infer a type from.
- **`var` is not a keyword**, it's a *reserved type name*. Old code that used `var` as a variable name still works.

### When to use it — and when not

Use `var` when the type is **obvious from the right-hand side** and spelling it out adds noise:

```java
var reader = new BufferedReader(new FileReader(path));   // clear
var total = order.getTotal();                            // clear enough
```

Skip it when the type would otherwise be your only clue to what you're holding:

```java
var result = service.process(input);   // process returns... what? unclear
int result = service.process(input);   // the explicit type documents it
```

The guiding question is readability for the *next* person: if a reader can see the type at a glance from the same line, `var` removes clutter; if it hides something they'd need to know, write the type. `var` is a tool for clarity, not brevity for its own sake.
