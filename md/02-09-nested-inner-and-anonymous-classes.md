## Nested, inner and anonymous classes

Not every class deserves its own file. When a class exists only to serve *one* other class, Java lets you declare it **inside** that class. These nested types keep tightly-related code together and control who can see it — and one variety, the anonymous class, is a stepping stone straight to the lambdas of module 06.

### Static nested classes — a class that lives in a namespace

A `static` nested class is simply a class defined inside another for **grouping and scoping**. It does *not* hold a reference to an outer object — the `static` says "I don't need an enclosing instance." Use it for a helper type that logically belongs to its host:

```java
public class HashMap<K, V> {
    static class Node<K, V> { ... }   // an entry — only HashMap needs it
}
```

`Node` is namespaced as `HashMap.Node` and hidden from the wider world. Most nested classes you write should be `static` — reach for the inner (non-static) kind only when you actually need the outer object.

### Inner classes — bound to an outer instance

Drop the `static` and you get an **inner class**: each instance is tied to an instance of the enclosing class and can read its fields directly. That link is occasionally just what you want (an iterator walking its collection's internals), but it also means every inner-class object silently keeps its outer object alive — a subtle source of memory leaks. Use inner classes sparingly and deliberately.

### Local and anonymous classes — defined where they're used

You can even declare a class **inside a method**, right where it's needed. The most useful form is the **anonymous class** — a class with no name, defined and instantiated in one expression, almost always to implement an interface on the spot:

```java
button.addListener(new ClickListener() {
    @Override public void onClick() {
        System.out.println("clicked");
    }
});
```

There's no separate `class` declaration — you create a one-off implementation of `ClickListener` inline. Anonymous classes can **capture** variables from the enclosing method, but only ones that are *effectively final* (never reassigned) — a rule you'll meet again with lambdas.

### Where this is heading: lambdas

Look at that anonymous class again: a whole `new ClickListener() { … }` wrapper around a *single method* with one line of real work. That ceremony is exactly what **lambdas** remove. When the interface has just one method, Java 8+ lets you write only the body:

```java
button.addListener(() -> System.out.println("clicked"));   // same thing, as a lambda
```

Same capture rules, a fraction of the syntax. So the practical guidance: use a **`static` nested class** to group a helper, an **inner class** rarely and on purpose, and know that the **anonymous class** is the old shape of the lambda — which module 06 makes the everyday tool.
