## Inheritance and the class hierarchy

**Inheritance** lets one class build on another: a subclass **extends** a superclass, automatically gaining its fields and methods, then adds or adjusts what it needs. It models an **"is-a"** relationship — a `SavingsAccount` *is a* `BankAccount` — and lets shared behaviour live in one place instead of being copied.

### `extends` — reusing a base

```java
public class BankAccount {
    protected long balance;
    public void deposit(long amount) { balance += amount; }
}

public class SavingsAccount extends BankAccount {
    private double rate;
    public void addInterest() { balance += (long) (balance * rate); }  // uses inherited balance
}
```

`SavingsAccount` gets `balance` and `deposit` for free and adds `addInterest`. A single class can extend only **one** superclass — Java has **single inheritance** of classes (interfaces, next section, are how you mix in more).

### `super` — reaching the parent

A subclass often needs to build on the parent rather than replace it. **`super`** refers to the superclass:

- **`super(...)`** in a constructor calls the parent's constructor — and it must be the *first* statement, because the parent must be initialized before the child. If you don't call it explicitly, Java inserts a call to the no-arg `super()` for you.
- **`super.method(...)`** calls the parent's version of a method you've overridden — useful when you want to *extend* behaviour, not discard it.

```java
public SavingsAccount(long opening, double rate) {
    super(opening);      // initialize the BankAccount part first
    this.rate = rate;
}
```

### Overriding — changing inherited behaviour

A subclass can **override** an inherited method — same signature, new body — to specialize it. Mark it **`@Override`**; it's not required, but it makes the compiler check you actually *are* overriding (a typo'd name silently becomes a *new* method without it):

```java
@Override
public void deposit(long amount) {
    super.deposit(amount);   // do the normal deposit…
    logTransaction(amount);  // …then add our own step
}
```

### `final` and the root

Two edges of the hierarchy: mark a class **`final`** and it *cannot* be extended (`String` is final — nobody subclasses it); mark a method `final` and it can't be overridden. And at the very top of every hierarchy sits **`Object`** — walk any chain of `extends` upward and you always arrive there, which is why every object has `equals`, `hashCode`, and `toString`.

### Use it deliberately

Inheritance is powerful but tightly coupling — a subclass depends on its parent's internals, and a change upstream can ripple down. Reach for it when there's a genuine "is-a" relationship *and* real behaviour to share. When you're tempted to inherit just to reuse code, remember there's usually a looser alternative — **composition** — which section 10 argues you should often prefer.
