## Java modules — the 60-second tour

For most of Java's life the largest unit of code was the **package**, and `public` meant "visible to everyone, everywhere." That's leaky: a library's internal helper classes had to be `public` to be shared across its own packages, which also exposed them to every consumer. Java 9 introduced the **module** (the Java Platform Module System, JPMS) to draw a real boundary around a set of packages. This is the 60-second tour — enough to recognize a module and know what problem it solves.

### `module-info.java` — a name, what it needs, what it shows

A module is a named group of packages described by one file at its root, `module-info.java`. It declares three things: the module's **name**, what it **requires** (its dependencies), and what it **exports** (the packages it lets others see):

```java
module com.acme.orders {
    requires com.acme.payments;   // I depend on this module
    exports com.acme.orders.api;  // outsiders may use THIS package…
    // …every other package here stays hidden, even its public classes
}
```

The crucial line is the one that isn't there: a package you don't `export` is **inaccessible from outside the module — even its `public` classes.** `public` now means "public *within what the module chooses to expose*," which is the strong encapsulation packages never had.

### The two things modules buy you

- **Strong encapsulation.** Internal packages are genuinely hidden. A library can refactor or delete un-exported classes freely, knowing no outside code could have depended on them. `public` stops meaning "global."
- **Reliable configuration.** Because every module states its dependencies with `requires`, the JVM verifies the whole graph is present and consistent **at startup**, not when you happen to hit a missing class. This replaces the old *classpath hell* — the `NoClassDefFoundError` you'd only discover at runtime.

### The JDK itself is modular

The most important user of modules is the JDK. Since Java 9 the platform is split into modules — `java.base` (always present: `String`, collections, `Object`), `java.sql`, `java.xml`, and so on. That modularization is what enables **`jlink`**: a tool that assembles a **custom runtime image** containing only the modules your app actually uses — a smaller, faster-starting JVM, which matters for containers and cloud deployment.

### How much you'll actually use this

Be honest about scope: **most applications still run on the classpath, not the module path,** and get along fine. Modules earn their keep in two places — the JDK platform itself, and large, long-lived systems or libraries that need enforced boundaries and slim custom runtimes. The realistic goal for now is **recognition**: when you open a project and see a `module-info.java`, you know it declares a module's name, its `requires` dependencies, and its `exports`, and that un-exported packages are sealed off. That's the 60-second tour.

Modules are about compile-time and startup-time *boundaries*. The next two sections go the opposite direction — code that inspects and manipulates other code **at runtime**: reflection, and the annotations that ride on it.
