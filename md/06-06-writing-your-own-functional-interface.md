## Writing your own functional interface

The `java.util.function` shapes cover most needs, so *most of the time you shouldn't write your own*. But sometimes a lambda deserves a **named, domain-specific type** — for readability, for an extra type parameter the built-ins don't offer, or to declare a checked exception. Knowing how (and when) rounds out the picture.

### The recipe

A functional interface is just an interface with **exactly one abstract method** (a SAM). Mark it **`@FunctionalInterface`** so the compiler *enforces* that — a safety net that fails the build if someone later adds a second abstract method:

```java
@FunctionalInterface
public interface DiscountRule {
    BigDecimal apply(Order order);      // the single abstract method
}
```

Now a lambda can implement it, and the type name *documents intent* at every call site:

```java
DiscountRule loyalty = order -> order.total().multiply(new BigDecimal("0.9"));
BigDecimal price = loyalty.apply(order);
```

`DiscountRule` reads better than `Function<Order, BigDecimal>` — the name says *what* the function is, not just its shape.

### Default and static methods are allowed

The "single abstract method" rule counts only *abstract* methods — a functional interface may add as many **`default`** and **`static`** methods as it likes (that's how `Function` itself carries `andThen`/`compose`, and `Predicate` carries `and`/`or`/`negate`). So you can give your interface composition helpers too:

```java
@FunctionalInterface
public interface DiscountRule {
    BigDecimal apply(Order order);
    default DiscountRule andCap(BigDecimal max) {                 // still one abstract method
        return order -> apply(order).min(max);
    }
}
```

`Object` methods (like `equals`) also don't count against the SAM limit.

### When to write one — the honest guidance

Prefer a built-in unless a specific reason pushes you off it:

- **Domain clarity** — a named type (`DiscountRule`, `RetryPolicy`, `Validator<T>`) reads far better than a bare `Function`/`Predicate` in an API others will call. Worth it for a *public, central* abstraction.
- **A shape the built-ins lack** — e.g. three inputs (no `TriFunction`), or an unusual arity/primitive combination.
- **Checked exceptions** — the standard interfaces' methods declare no checked exceptions, so a lambda that throws one (say `IOException`) won't fit them. A custom `@FunctionalInterface` whose method `throws IOException` solves it:

```java
@FunctionalInterface interface IOSupplier<T> { T get() throws IOException; }
```

### When *not* to

If your interface would just re-say `Function<T,R>` or `Predicate<T>` with no added meaning, use the built-in — a proliferation of near-identical one-method interfaces is friction, not clarity, and callers already know the standard ones. The rule of thumb: **reach for a standard functional interface first; define your own only when a name, an arity, or a checked exception genuinely earns it.** With the interfaces covered, the next section opens up how a lambda relates to the code *around* it — the variables it captures.
