## Classes — the unit of code

Java is an object-oriented language, and the **class** is the unit everything is built from. A class is a **blueprint**: it says what a certain kind of thing *knows* (its data) and what it can *do* (its behaviour). From that one blueprint you stamp out **objects** — individual instances, each with its own copy of the data.

### State and behaviour, in one place

The whole idea of a class is to keep related **data** and the **behaviour** that operates on it together. A `BankAccount` knows its balance and can deposit into it — the number and the operations that make sense on it live side by side:

```java
public class BankAccount {
    long balance;                    // state — what an account knows

    void deposit(long amount) {      // behaviour — what an account does
        balance = balance + amount;
    }
}
```

`balance` is a **field** (the state); `deposit` is a **method** (the behaviour). Bundling them is the core move of object-oriented design — you don't have loose data floating one place and functions to manipulate it somewhere else.

### Class vs object — blueprint vs house

The class is the *type*; an object is a *value* of that type, created with `new`:

```java
BankAccount a = new BankAccount();   // one account
BankAccount b = new BankAccount();   // a different, independent account
a.deposit(100);                      // a.balance is 100; b.balance is still 0
```

One class, many objects — each with its **own** `balance`. `a` and `b` share the same *shape* (both are `BankAccount`s) but carry **separate state**. This is the difference between the *cookie cutter* and the *cookies*.

### Fields, methods, and `this`

Inside a method, the fields refer to *this particular object's* data. When a name is ambiguous — say a parameter has the same name as a field — you write **`this`** to mean "the object the method was called on":

```java
void setBalance(long balance) {
    this.balance = balance;   // this.balance = the field; balance = the parameter
}
```

You'll see `this` constantly; it's simply how an object refers to itself.

### Why model with classes at all

Classes let you name the concepts in your problem — `Order`, `Customer`, `Invoice` — and give each one a small, self-contained set of responsibilities. Code organized this way reads like the domain it models, stays local (change how an account works in one place), and composes: bigger objects are built from smaller ones. The rest of this module builds directly on this — hiding a class's internals, constructing objects properly, relating classes by inheritance and interfaces, and choosing how to combine them.
