## Throwing exceptions & custom types

So far you've *caught* exceptions the platform throws. The other half is throwing your own — signalling from inside your code that a situation is wrong, and sometimes defining a new exception type that names the failure in your domain's own words. A well-thrown exception is a precise, early-failing contract check.

### Throwing: the `throw` statement

`throw` hands an exception object up the stack, ending the current method's normal flow at that point. You throw an *instance*, so you construct it with `new`, usually with a message describing what went wrong:

```java
void setAge(int age) {
    if (age < 0)
        throw new IllegalArgumentException("age must be >= 0, got " + age);
    this.age = age;
}
```

This is **fail-fast**: reject a bad argument *at the boundary*, with a message naming the offending value, instead of storing it and failing mysteriously later. For rejecting bad inputs, reach for the standard unchecked types before inventing your own — `IllegalArgumentException` (bad parameter), `IllegalStateException` (wrong time to call this), `NullPointerException` (via `Objects.requireNonNull`).

```java
this.name = Objects.requireNonNull(name, "name");   // throws NPE with a message if null
```

### When to define a custom exception

Invent a new type when a failure is **meaningful in your domain** and callers may want to catch *that specific thing* — `InsufficientFundsException`, `OrderNotFoundException`. The name itself documents the failure and lets a handler target it precisely, rather than parsing a generic message.

### Writing one: extend, and choose your branch

A custom exception is just a class that extends an existing exception — and the branch you extend decides checked vs unchecked (section 02):

```java
// unchecked: a caller bug / programming error — extend RuntimeException
public class OrderNotFoundException extends RuntimeException {
    public OrderNotFoundException(String id) {
        super("no order with id " + id);
    }
}

// checked: a recoverable condition callers must handle — extend Exception
public class InsufficientFundsException extends Exception {
    private final BigDecimal shortfall;
    public InsufficientFundsException(BigDecimal shortfall) {
        super("short by " + shortfall);
        this.shortfall = shortfall;
    }
    public BigDecimal shortfall() { return shortfall; }
}
```

Two design points. **Pass a message to `super`** so the stack trace is self-explanatory. And a custom exception can **carry data** — `shortfall()` above lets the handler act on the specifics, not just read text. Add a constructor that also takes a `Throwable cause` (the very next section) so you can wrap an underlying failure.

### Checked or unchecked? the decision that defines the type

The single most consequential choice when defining an exception:

- **Extend `RuntimeException` (unchecked)** when the exception marks a *bug* — a violated precondition, an impossible state. Callers shouldn't be forced to `catch` a bug; they should fix it. This is the common default for most application exceptions.
- **Extend `Exception` (checked)** when the failure is a *recoverable, expected* condition you genuinely want every caller to confront — and are willing to pay the `throws`-declaration tax up the call chain for. Use sparingly; over-using checked exceptions litters signatures.

Get this choice right and your exception type communicates, in the type system, exactly how seriously a caller must take it — which is the whole reason to define one instead of reusing a generic type.
