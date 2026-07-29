## Composition over inheritance

You've now seen both ways to build a class on top of others: **inheritance** (`extends` — "is-a") and **implementing interfaces**. This closing section is about a design instinct that quietly shapes good Java: when you need one object's behaviour inside another, prefer **composition** — *holding* an object as a field — over **inheritance** — *becoming* a subclass of it.

### The two relationships

- **Inheritance is "is-a".** `SavingsAccount extends BankAccount` — a savings account *is* a bank account.
- **Composition is "has-a".** A `Car` *has an* `Engine`; an `OrderService` *has a* `Repository`. The outer object keeps the other as a field and delegates to it.

```java
public class OrderService {
    private final Repository repo;                 // has-a
    public OrderService(Repository repo) { this.repo = repo; }
    public void place(Order o) { repo.save(o); }   // delegate
}
```

### Why inheritance disappoints as a reuse tool

Inheritance is tempting because it reuses code for free — but it comes with strings:

- **It's rigid.** You inherit *everything* the parent exposes, wanted or not, and you're locked to a single superclass forever.
- **It's fragile — the base can break you.** Because a subclass leans on the parent's internals, an innocent change upstream can silently break it. This is the classic *"fragile base class"* problem.
- **It leaks the parent's whole surface.** Extend `ArrayList` to make a "stack" and you've also exposed `add`, `remove(index)`, and everything else — callers can bypass your rules.

Composition avoids all three: you hold the collaborator behind your **own** interface and expose only the methods you *choose*.

### The classic example

Want a stack? Don't `extend` a list — **hold** one:

```java
public class Stack<T> {
    private final List<T> items = new ArrayList<>();     // has-a, hidden
    public void push(T item) { items.add(item); }
    public T pop()           { return items.remove(items.size() - 1); }
    public boolean isEmpty() { return items.isEmpty(); }
}
```

Now `Stack` exposes *exactly* push, pop, and isEmpty — no stray `add(index)` to corrupt it. You can even swap the `ArrayList` for a `LinkedList` later and no caller notices. That's the flexibility inheritance can't give you.

### The guideline

Use **inheritance** for a true, stable **"is-a"** with real shared behaviour — and keep those hierarchies shallow. Use **composition** for everything else, which in practice is most of the time: it couples loosely, hides internals, and lets you change your mind. Pair it with the earlier habit — *program to interfaces* — and you get the reusable, testable shape modern Java aims for: small objects that **hold** collaborators (composition) and depend on their **capabilities** (interfaces), not on a tall tree of `extends`. That instinct — *has-a over is-a* — is the quiet backbone of good object-oriented design, and it closes out the module.
