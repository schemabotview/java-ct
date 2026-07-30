## The JVM — what's actually running

You have spent nine modules writing Java the language. This final module is about the **machine that runs it** — because "Java" is really two things: a language, and the **Java Virtual Machine** that executes it. Understanding the JVM explains Java's famous portability, its surprising speed, and a whole family of tools (garbage collection, class loading, reflection) that only make sense once you can see the machine underneath. This is the map for the rest of the module.

### Source to bytecode to native — the two-step

A C program compiles straight to instructions for *one* kind of CPU. Java takes a detour that is the key to everything:

```
Hello.java  --javac-->  Hello.class  --JVM-->  runs on any machine
 (source)             (bytecode, portable)    (interpreted, then JIT-compiled)
```

`javac` compiles your source not to machine code but to **bytecode** — a compact, CPU-independent instruction set stored in `.class` files. The bytecode doesn't run on your hardware directly; it runs on the **JVM**, a program that reads bytecode and executes it. Ship the same `.class` (or `.jar`) to Windows, Linux, or a Mac, and each platform's JVM runs it unchanged. That is **"write once, run anywhere"**: the JVM is the portable layer that absorbs the differences between machines.

### The JVM is an abstract machine with a day job

The JVM is not just an interpreter. It is a small runtime that continuously does four jobs while your program runs:

- **Loads** classes on demand and **verifies** their bytecode is safe before running it.
- **Executes** bytecode — interpreting at first, then handing hot spots to the **JIT** (just-in-time compiler), which compiles frequently-run methods to native machine code *while the program runs*.
- **Manages memory** — allocating objects on the heap and reclaiming dead ones with the **garbage collector**, so you never call `free`.
- Provides the **runtime services** — threads, security checks, reflection — the language leans on.

The JIT is why "interpreted" Java is fast: a long-running method ends up as optimized native code, sometimes tuned to how the program actually behaves at runtime — an option an ahead-of-time compiler doesn't have.

### JDK, JRE, JVM — three names, nested

These three terms get muddled, and the picture is simply three nested boxes:

- **JVM** — the execution engine that runs bytecode (the innermost piece).
- **JRE** (Java Runtime Environment) — the JVM plus the standard class libraries; enough to *run* Java.
- **JDK** (Java Development Kit) — the JRE plus the *development* tools: `javac`, the debugger, `jar`, `javadoc`. Enough to *build* Java.

You install a **JDK** to develop; a user only needs a **JRE** to run.

### One machine, many languages

A quiet consequence: the JVM runs *bytecode*, not Java specifically. Any language that compiles to valid `.class` files runs on it — which is why **Kotlin, Scala, Clojure, and Groovy** all target the JVM, reuse its libraries, and share its garbage collector and JIT. The JVM has become a general-purpose runtime platform, and Java is its first and most common language. With that map in hand, the module now zooms into the machine's parts — starting with the one that runs constantly and invisibly: the **garbage collector**.
