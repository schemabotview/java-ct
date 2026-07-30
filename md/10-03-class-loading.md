## Class loading

Your program is a pile of `.class` files, but the JVM starts with almost none of them in memory. Classes are pulled in **lazily** — on first use — by objects called **class loaders**. This is the machinery that turns a `.class` file on disk into a live, usable `Class` inside the running JVM, and it's what makes plugins, app servers, and hot-reload possible.

### Loaded on first use, in three phases

A class isn't loaded when the program starts; it's loaded the first time something needs it — the first `new`, the first static access. Bringing a class in happens in three phases:

- **Loading** — find the `.class` bytes (from disk, a jar, or the network) and parse them into an in-memory representation, producing a `Class` object.
- **Linking** — **verify** the bytecode is well-formed and safe, **prepare** static fields with default values, and **resolve** symbolic references to other classes.
- **Initialization** — run the class's `static` initializers and static field assignments, top to bottom. This is the moment your `static` blocks actually execute.

```java
class Config {
    static final int MAX = load();   // load() runs at INITIALIZATION,
    static { System.out.println("Config initialized"); }  // ...on first use of Config
}
```

That laziness is why a `static` block can seem to fire "late" — it fires exactly when the class is first touched, not at startup.

### The verifier — safety before execution

The **verification** step is a quiet but crucial guarantee. Before any bytecode runs, the verifier proves it can't corrupt the JVM: no stack underflow, no jumping to a bad address, no treating an `int` as an object reference. It's why untrusted bytecode can be run at all — a malformed or hostile `.class` is rejected at load time, not left to crash the machine mid-run.

### The loader hierarchy and parent-first delegation

Class loaders form a **parent-child hierarchy**, and they cooperate by **delegation**. When a loader is asked for a class, it first asks its **parent**, and only loads the class itself if the parent can't. The chain, from top down:

- **Bootstrap** — loads the core JDK classes (`java.lang`, etc.); part of the JVM itself.
- **Platform** — loads other standard JDK modules.
- **Application (system)** — loads *your* classes from the classpath.

Parent-first delegation means core types like `java.lang.String` are always loaded by the bootstrap loader, so no application code can shadow them with a counterfeit — a security and consistency property.

### Namespaces, and why custom loaders matter

A subtle rule with big consequences: a class's identity is its **name plus the loader that defined it**. The *same* `.class` loaded by two different loaders becomes **two distinct types** — an object of one is not assignable to the other, and comparing them throws `ClassCastException`. That sounds like a nuisance, but it's exactly the feature that powers real systems:

- **Application servers** give each deployed app its own loader, so two apps can use different versions of the same library without collision.
- **Plugin systems** load and unload modules at runtime by loading them in separate loaders.
- **Hot reload** in dev tools works by discarding a loader and re-loading changed classes in a fresh one.

So class loading is not just a startup detail — it's an extensibility mechanism. Most of the time it's invisible; when you build plugins or run inside a container, it's the model you reach for. Next we look at how Java formalized code boundaries at a larger scale than the class: **modules**.
