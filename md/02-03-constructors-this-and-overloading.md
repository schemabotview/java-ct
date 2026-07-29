## Constructors, `this`, and overloading

If encapsulation is about protecting an object *during* its life, a **constructor** is about starting it life in a valid state. It's the special method that runs when you say `new` — its whole job is to take the object from "just allocated" to "ready to use."

### What a constructor is

A constructor has the **class's name** and **no return type** — that's how Java tells it apart from an ordinary method. It runs exactly once per object, at creation:

```java
public class BankAccount {
    private final String owner;
    private long balance;

    public BankAccount(String owner, long opening) {
        this.owner = owner;
        this.balance = opening;
    }
}

var a = new BankAccount("Ada", 100);   // constructor runs here
```

Requiring `owner` and `opening` in the constructor means **you cannot create a half-built account** — there's no way to get an object without giving it what it needs. That's a powerful guarantee: combine it with `private final` fields and the object is valid and immutable from birth.

### The default constructor

If you write **no** constructor, Java quietly gives you a no-argument one so `new BankAccount()` works. The moment you write **any** constructor of your own, that free one disappears — a common surprise when `new Foo()` suddenly stops compiling.

### `this(...)` — one constructor calling another

Overloaded constructors often share setup. Rather than repeat it, one constructor can delegate to another with **`this(...)`**, which must be the *first* statement:

```java
public BankAccount(String owner) {
    this(owner, 0);        // delegate: an account opened with a zero balance
}
```

This keeps a single "real" constructor with all the logic, and thin convenience constructors that funnel into it.

### Overloading — several ways to construct

Just like methods, constructors can be **overloaded**: same name, different parameter lists, and the compiler picks by the arguments you pass.

```java
new BankAccount("Ada", 500);   // owner + opening balance
new BankAccount("Ada");        // owner only → delegates to (owner, 0)
```

Offer the constructors that correspond to *genuinely valid* ways to create the object — and no more. If a combination of arguments would be invalid, simply don't provide a constructor for it; the type system then makes that mistake impossible.

### The through-line

A constructor is your one guaranteed chance to establish an object's invariants. Validate arguments there (throw if they're wrong), assign the `final` fields, and every object that exists is, by construction, a valid one. Everything the rest of the class does can then assume it's starting from a good state.
