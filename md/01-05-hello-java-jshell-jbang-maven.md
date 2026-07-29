## Hello, Java — jshell, jbang, Maven

Every language has its "hello, world." In Java there are three, because there are three scales of program — a throwaway experiment, a real script, and a proper project — and each has the right tool. Seeing all three at once shows you the on-ramp *and* where you're headed.

### The one method that runs

However you package it, a runnable Java program has an entry point with this exact shape:

```java
public static void main(String[] args) {
    System.out.println("Hello, Java");
}
```

The JVM calls `main` to start. `public` so it can be reached, `static` so no object is needed first, `void` because it returns nothing, and `String[] args` for command-line arguments. Memorize the shape now; you'll type it a thousand times.

### 1. `jshell` — nothing to package

For a quick experiment there's no ceremony at all. Start `jshell` and type the body:

```
jshell> System.out.println("Hello, Java")
Hello, Java
```

No file, no `main`, no compile. This is the experiment scale.

### 2. `jbang` — a real script, with dependencies

Sometimes you want a *single file* that does real work — including pulling in a library — without setting up a whole project. **jbang** runs a `.java` file as a script and can declare dependencies right in a comment:

```java
///usr/bin/env jbang "$0" "$@" ; exit $?
//DEPS org.apache.commons:commons-lang3:3.14.0

public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Java");
    }
}
```

`jbang Hello.java` fetches the dependency and runs it. This is the script scale — automation and glue, one file, real libraries.

### 3. Maven — a proper project

For anything you'll maintain, you want a **build tool**. Maven gives a project a standard shape and manages its libraries. The layout is a convention every Java developer recognizes:

```
myapp/
  pom.xml                       # project + dependencies
  src/main/java/App.java        # your code
  src/test/java/AppTest.java    # your tests
```

`pom.xml` declares the project and its dependencies; `mvn compile` builds it, `mvn test` runs the tests, `mvn package` produces a runnable `.jar`. This is the project scale — the shape real teams ship, and where module 10 returns in depth.

### The throughline

Same `main`, three scales: **`jshell`** to try, **`jbang`** to script, **Maven** to build. Start at the top of that ladder and climb only as far as the task needs.
