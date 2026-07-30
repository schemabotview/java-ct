## Reflection — looking at code as data

Normally you call a method by *writing* its name in source: `user.getName()`. But sometimes you don't know the name until the program is running — you read it from a config file, a JSON key, an annotation. **Reflection** is the JVM feature that lets code **inspect and manipulate classes, methods, and fields at runtime**, treating code itself as data you can query and act on. It's the quiet engine under almost every Java framework you'll use.

### The `Class` object — your handle on a type

Every loaded type has a runtime `Class<?>` object describing it — its name, methods, fields, constructors, annotations. You get one three ways, and from it you can enumerate everything the type contains:

```java
Class<?> c = user.getClass();          // from an instance
Class<?> c2 = User.class;              // from the type literal
Class<?> c3 = Class.forName("com.acme.User");  // from a name string at runtime

for (Method m : c.getDeclaredMethods())        // every method, as data
    System.out.println(m.getName());
```

That third form is the powerful one: a class named by a **string** you didn't know at compile time.

### Acting on code, not just reading it

Reflection doesn't stop at inspection — you can **invoke** a method, **read or set** a field, or **construct** an object, all chosen by name at runtime:

```java
Method greet = c.getMethod("greet", String.class);
Object result = greet.invoke(user, "Ana");     // call user.greet("Ana") reflectively

Constructor<?> ctor = c.getConstructor();
Object fresh = ctor.newInstance();             // new User()
```

It can even reach **private** members: `field.setAccessible(true)` bypasses the normal access check (subject to module rules). That's how a JSON library sets your private fields when it has no constructor to call.

### Why it exists: it powers your frameworks

You will rarely write reflection yourself, but you'll use it constantly, because it's how declarative frameworks work without knowing your classes in advance:

- **Dependency injection** (Spring) constructs your objects and wires them together by reflection.
- **JSON/serialization** (Jackson, Gson) reads and writes your fields by reflection.
- **Test runners** (JUnit) scan your classes for methods marked `@Test` and invoke them.
- **ORMs** (Hibernate) map object fields to database columns.

Every one of these takes *your* classes — which it never saw when it was compiled — and operates on them at runtime. That is only possible because the JVM keeps full type information around and exposes it through reflection.

### The costs — use it sparingly

Reflection is powerful precisely because it sidesteps the guarantees you normally rely on, so it carries real costs. It is **slower** than a direct call (though far less than it used to be). It **breaks compile-time safety**: a method named by a string can't be checked by the compiler or a refactor — rename the method and the reflective call fails at *runtime*, not build time. And it **breaks encapsulation** by reaching private state, which the module system can now forbid unless a package is explicitly `open`. So the rule for application code: prefer ordinary calls; reach for reflection only when you genuinely can't know the target until runtime — which, in practice, means when you're building framework-like machinery. And that machinery usually reads its instructions from **annotations** — the metadata we look at next.
