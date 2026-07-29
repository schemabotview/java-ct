## Installing Java & three ways to run it

To write Java you install a **JDK** — the development kit, not just the runtime. The one confusing part is that "Java" isn't a single download: several vendors build a JDK from the same open-source project, **OpenJDK**.

### Picking and installing a JDK

They're near-identical builds of OpenJDK; pick any and move on:

- **Eclipse Temurin** (from Adoptium) — the common free, no-strings default.
- **Oracle JDK**, **Amazon Corretto**, **Azul Zulu**, **Microsoft Build of OpenJDK** — vendor builds, often with long support windows.

Install **Java 21 (LTS)**. The easiest route is a package manager — `brew install openjdk@21` on macOS, `winget` or the installer on Windows, your distro's package or **SDKMAN!** on Linux. Then confirm it worked from a terminal:

```
java -version
```

You should see `21` in the output. That command, and the fact that `java` and `javac` are on your `PATH`, is all you need to start. (`JAVA_HOME`, an environment variable pointing at the JDK, matters later for build tools — not yet.)

### Three ways to run a program

Once the JDK is installed, there's a ladder of ways to actually run code, from most manual to most convenient.

**1. Compile, then run — the classic two steps.** This mirrors the JVM journey exactly: `javac` turns source into bytecode, then `java` runs it.

```
javac Hello.java     # produces Hello.class (bytecode)
java Hello           # runs the class (note: no .class)
```

**2. Launch a single source file directly (Java 11+).** For a one-file program you can skip the compile step — the `java` launcher compiles it in memory and runs it in one shot:

```
java Hello.java      # compiles + runs, no .class left behind
```

Great for scripts, examples, and learning — no build tool, no ceremony.

**3. `jshell` — the REPL.** Java ships an interactive shell. You type an expression, it prints the result immediately — no class, no `main` method, no compile step:

```
jshell> 2 + 2
$1 ==> 4
jshell> "hello".toUpperCase()
$2 ==> "HELLO"
```

`jshell` is the fastest way to *try something* — check what a method returns, sanity-check a snippet — and we'll use it constantly in the next few modules.

### Which to reach for

- **Exploring an idea or a method?** `jshell`.
- **A quick single-file program?** `java Hello.java`.
- **Anything with more than one file or a library?** A real build tool (Maven or Gradle) — the next section starts there.
