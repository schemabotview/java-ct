## Polymorphism and dynamic dispatch

**Polymorphism** — "many forms" — is the idea that a single piece of code can work with objects of many different types, and each object responds *in its own way*. It's what turns inheritance from mere code reuse into genuine flexibility, and it rests on one mechanism: **dynamic dispatch**.

### One reference type, many runtime types

A variable's **declared** type can be a superclass while the **actual** object is a subclass:

```java
BankAccount acc = new SavingsAccount(...);   // declared BankAccount, actually a SavingsAccount
```

You may call any method that `BankAccount` promises. But when you call an overridden method, **the object's real type decides which version runs** — not the declared type. That decision, made at run time, is dynamic dispatch:

```java
acc.deposit(100);   // runs SavingsAccount's deposit, even though acc is typed BankAccount
```

The compiler checks the method *exists* on the declared type; the JVM picks the *implementation* from the real object. This is the whole trick.

### Why it's powerful: code against the abstraction

Because dispatch follows the real object, you can write code that names only the general type and still get each subclass's specific behaviour:

```java
void endOfMonth(List<BankAccount> accounts) {
    for (BankAccount a : accounts) {
        a.applyMonthly();   // savings adds interest, checking charges a fee — each its own way
    }
}
```

`endOfMonth` knows nothing about `SavingsAccount` or `CheckingAccount`. Add a brand-new account type tomorrow, override `applyMonthly`, and this loop handles it **without a single change** — no `if this type… else if that type…` ladder. That "open to new types, closed to modification" quality is polymorphism's real payoff.

### Casting and `instanceof` — going the other way

Sometimes you hold a supertype reference but need something specific to a subtype. You can test with **`instanceof`** and narrow with a cast — modern Java folds both into **pattern matching**, binding the variable when the test passes:

```java
if (acc instanceof SavingsAccount s) {
    s.addInterest();   // s is already typed SavingsAccount here — no separate cast
}
```

Useful, but a *sign to pause*: a pile of `instanceof` checks often means a method that *should* be an overridden method on each subclass instead. Prefer dispatch; reach for `instanceof` only at genuine boundaries.

### The mental model

Declared type = **what you're allowed to call** (checked by the compiler). Real type = **what actually runs** (chosen by the JVM). Program to the general type, let each object supply its own behaviour, and your code stays flexible as the set of types grows. This is the engine underneath abstract classes and interfaces — the next two sections.
