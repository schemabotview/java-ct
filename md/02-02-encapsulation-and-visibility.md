## Encapsulation and visibility

A class that lets anyone reach in and change its fields is a class with no rules. **Encapsulation** is the discipline of hiding a class's internals and exposing only a controlled surface — so the object can *guarantee* its own consistency. It's the first real payoff of using classes, and Java enforces it with **access modifiers**.

### The four access levels

Every field and method carries a visibility, from most open to most closed:

- **`public`** — visible everywhere. This is the deliberate, published surface of the class.
- **`protected`** — visible within the same package and to subclasses.
- *package-private* (**no modifier**) — visible only within the same package. The quiet default.
- **`private`** — visible only inside this class. Nothing outside can even see it.

The habit that makes encapsulation work: **fields `private`, behaviour `public`.** State is hidden; the only way to touch it is through methods you control.

### Why hiding the field matters

Leave a field public and *anyone* can put it into an impossible state:

```java
account.balance = -5000;   // if balance is public, nothing stops this
```

Make it `private` and force changes through a method, and the class can enforce its rules — its **invariants**:

```java
public class BankAccount {
    private long balance;                       // hidden

    public void deposit(long amount) {
        if (amount <= 0) throw new IllegalArgumentException("must be positive");
        balance += amount;                      // only valid changes get through
    }

    public long balance() { return balance; }   // read-only view
}
```

Now `balance` can never go negative from outside and can never be set to a nonsense value — because there's no path to it except `deposit` (and a withdraw you'd write the same way). The object *owns* its state.

### Getters, setters, and not over-doing them

A method that reads a field is a **getter**; one that writes it, a **setter**. They're the controlled accessors — but the point isn't to mechanically wrap every field in a `getX`/`setX` pair (that just makes fields public with extra steps). Expose only what callers genuinely need, and prefer methods that express *intent* — `deposit(amount)` over `setBalance(...)`, `markShipped()` over `setStatus(...)`. A blind setter for every field throws the guarantees away again.

### The bigger payoff: freedom to change

Because callers only depend on the public methods, you're free to change *how* the class works inside — rename a field, split one into two, add a cache — without breaking a single caller. That boundary between "what I promise" (the public API) and "how I do it" (the private internals) is what keeps large programs maintainable. Encapsulation isn't bureaucracy; it's what lets a class evolve safely.
