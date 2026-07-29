## Functions as values

For most of this course, the thing you *pass around* has been data — numbers, objects, collections. This module adds a second kind of value: **behaviour itself.** A piece of code — "how to compare two people," "what to do with each element" — can be a value you store in a variable, pass to a method, and return from one. That shift is the heart of *functional* Java.

### The idea, and where you've already met it

Back in module 02 you wrote an anonymous class to hand a chunk of behaviour to a method:

```java
button.addListener(new ClickListener() {
    @Override public void onClick() { System.out.println("clicked"); }
});
```

All that ceremony wraps *one method's worth of behaviour*. A **lambda** is that same behaviour written as a value — a *function literal*:

```java
button.addListener(() -> System.out.println("clicked"));   // the behaviour, as a value
```

Same effect, none of the scaffolding. The lambda **is** "the thing to do on click," passed like any other argument.

### What makes it work: the functional interface

Java has no free-floating function type — every value still has a *type that is an interface*. A lambda's type is a **functional interface**: an interface with **exactly one abstract method** (a "SAM" — Single Abstract Method). The lambda supplies the body of that one method.

```java
Comparator<String> byLength = (a, b) -> a.length() - b.length();
Runnable greet             = () -> System.out.println("hi");
```

`Comparator` has one abstract method (`compare`), `Runnable` has one (`run`) — so each can be written as a lambda. The compiler matches the lambda's shape to that single method. (This is why the JVM needs no new "function" type — a lambda is just a compact implementation of a one-method interface.)

### Why this is a big deal

Treating behaviour as data collapses a whole category of boilerplate and unlocks a more declarative style:

- **Parameterise behaviour, not just values.** `list.sort(byLength)` — you pass the *sorting rule* as an argument, the way you'd pass a number.
- **Callbacks become one-liners.** "Run this when done," "keep the elements matching this test" — handed over inline, no named class.
- **Small pieces compose.** Functions can be combined into pipelines (section 08), the foundation of **streams** in module 07.

### The pillars of the module

We'll build the toolkit in order: the **lambda syntax** itself, the even-shorter **method reference**, and the **standard functional interfaces** (`Function`, `Predicate`, `Consumer`, `Supplier`) that name the common shapes so you rarely declare your own. Then the deeper mechanics — **capturing** variables, **composing** functions, writing **higher-order** methods that take and return them — and finally *judgement*: when functional style clarifies and when it obscures. The one idea under all of it: **a function is a value**, and once behaviour is a value, you can do everything with it you already do with data.
