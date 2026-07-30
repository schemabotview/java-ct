## Annotations — reading them at runtime

An **annotation** is metadata you attach to code — a label on a class, method, field, or parameter that says something *about* it without changing what it does. You've used them since module one: `@Override`, `@Deprecated`, `@FunctionalInterface`. This section is about the payoff — how annotations, combined with the reflection from the last section, let frameworks read declarative instructions straight off your code.

### Built-in annotations, and writing your own

The JDK ships a handful you already know: `@Override` (the compiler checks you really are overriding), `@Deprecated` (warn callers), `@SuppressWarnings`, `@FunctionalInterface`. You declare your own with `@interface`, and its elements look like methods:

```java
@interface Role {
    String value();
    int level() default 1;
}

@Role(value = "admin", level = 3)   // applied to something
class AdminPanel { }
```

An annotation by itself is inert — it's a sticky note. Something has to *read* it for it to matter.

### Retention — how long the note survives

The pivotal question for any annotation is **how long it lives**, set by its `@Retention` policy — and this is the concept to really absorb:

- **`SOURCE`** — discarded by the compiler; exists only for tools and humans (e.g. `@Override`). Never in the `.class`.
- **`CLASS`** — kept in the `.class` file but not loaded into the JVM at runtime (the default). Visible to bytecode tools, not to reflection.
- **`RUNTIME`** — kept in the `.class` *and* loaded into the JVM, so **reflection can read it while the program runs.** This is the one frameworks need.

You also constrain *where* an annotation may be placed with `@Target` (methods only, fields only, types, …).

### Runtime retention + reflection = frameworks

Here is the whole mechanism in one line: an annotation marked `@Retention(RUNTIME)` can be **found by reflection**, so a framework scans your classes, spots the annotations, and acts on them:

```java
@Retention(RetentionPolicy.RUNTIME)
@interface Test { }

for (Method m : cls.getDeclaredMethods())
    if (m.isAnnotationPresent(Test.class))   // reflection reads the note
        m.invoke(cls.newInstance());          // …and runs the test
```

That tiny loop *is*, in miniature, how JUnit finds and runs your `@Test` methods. Swap the names and it's every declarative framework you know: `@Autowired` tells Spring where to inject a dependency; `@Entity` and `@Column` tell an ORM how to map a class to a table; `@JsonProperty` tells Jackson how to name a field in JSON; `@GetMapping` tells a web framework which method handles which URL. The annotation carries the *intent*, reflection reads it, and the framework supplies the behavior.

### Why this pairing matters

Annotations plus runtime reflection are what make Java **declarative**: instead of writing imperative wiring code — "register this handler, configure that mapping" — you *label* your code with what you want, and a framework reads the labels and does the wiring. It keeps the configuration right next to the thing it configures, and it's the single most common way you'll interact with the JVM's runtime type information in day-to-day work. You write the annotations; reflection, running underneath, reads them.

That closes out the JVM-internals half of the module — the machine, its memory, how classes and modules load, and how code inspects code. The remaining sections step outside the running JVM to the tools that *produce* and *verify* your program: the build tools that compile and package it, and the frameworks that test it. First, the dominant build tool: **Maven**.
