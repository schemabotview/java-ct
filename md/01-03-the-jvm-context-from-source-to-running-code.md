## The JVM context — from source to running code

When you run a Java program, your `.java` text doesn't go straight to the CPU. It takes a two-stage journey — **compile once, then run anywhere** — and understanding that journey explains almost everything about how Java behaves.

### Stage one: source to bytecode (compile time)

You write a source file, say `Hello.java`. The **compiler**, `javac`, reads it, checks every type, and emits a `Hello.class` file. That `.class` file is **not** machine code for your laptop — it's **bytecode**, a compact, portable instruction set for an *imaginary* computer: the Java Virtual Machine. Bytecode is the same whether you compiled on Windows, macOS, or Linux.

### Stage two: bytecode to execution (run time)

You launch the program with `java Hello`. That starts a **JVM**, and inside it several things happen:

- **Class loader** — finds `Hello.class` (and every class it needs) and loads the bytecode into memory.
- **Bytecode verifier** — checks the bytecode is safe and well-formed before it runs. This is a big reason the JVM is hard to crash with a stray pointer.
- **Execution engine** — actually runs the bytecode. It starts by *interpreting* — reading one bytecode instruction at a time. Meanwhile the **JIT (just-in-time) compiler** watches for "hot" methods that run often and compiles *those* down to real native machine code, so the hot paths run at close-to-native speed.
- **Memory & the garbage collector** — the JVM manages a region called the **heap** where your objects live, and a **garbage collector** automatically reclaims objects you're no longer using. You never call `free()`.

That's the picture we'll keep on screen: **source → compiler → bytecode → class loader → execution engine (interpreter + JIT) → CPU**, with memory and GC alongside.

### Why the extra layer is worth it

The JVM sits *between* your bytecode and the hardware, and that indirection is the whole point:

- **Portability** — one build of bytecode runs on any OS or chip that has a JVM. *Write once, run anywhere.*
- **Safety** — verification and managed memory mean whole classes of crashes and security bugs simply can't happen.
- **Speed anyway** — thanks to the JIT, "interpreted then compiled" ends up fast, because the JVM can optimize using information it only learns *while the program runs*.

### JDK vs JRE vs JVM — the three names

- **JVM** — the runtime engine that executes bytecode. The thing described above.
- **JRE** (Java Runtime Environment) — the JVM plus the standard class libraries: enough to *run* a Java program.
- **JDK** (Java Development Kit) — the JRE plus the developer tools: `javac`, `jshell`, `jar`, and friends. Enough to *build* Java programs. **You install a JDK.**
