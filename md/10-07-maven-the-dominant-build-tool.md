## Maven — the dominant build tool

A real project is never a single `javac` command. You have dozens of source files, third-party libraries (each with libraries *of their own*), tests to run, and a `.jar` to package — done identically on every developer's machine and on the build server. A **build tool** automates all of that, and for two decades the default in the Java world has been **Maven**. This section is what Maven is and the model behind it.

### `pom.xml` — a declarative description of your project

Maven is **declarative**: you don't script the build steps, you *describe* the project in one XML file, `pom.xml` (Project Object Model), and Maven knows how to build it. The heart of that file is the list of dependencies:

```xml
<dependency>
    <groupId>com.google.guava</groupId>
    <artifactId>guava</artifactId>
    <version>33.0.0-jre</version>
</dependency>
```

You state *what* you depend on; Maven works out *how* to get it and build with it.

### Coordinates and the repository

Every library in the Java ecosystem is named by three **coordinates** — **groupId**, **artifactId**, **version** (GAV) — a globally unique address. Maven resolves those coordinates by downloading the library from a **repository**, by default **Maven Central**, and caching it in a local folder (`~/.m2`) so it's fetched once. The decisive feature is **transitive dependencies**: you ask for one library, and Maven automatically pulls in *its* dependencies, and theirs, resolving the whole tree for you. Declaring one line can bring in twenty jars, correctly versioned.

### Convention over configuration

Maven's other big idea is **convention over configuration**: follow the standard project layout and you write almost no build logic. Source in `src/main/java`, tests in `src/test/java`, resources in `src/main/resources`, output in `target/`. Because every Maven project is arranged the same way, any Java developer can drop into any Maven project and know exactly where things live and how to build it — a real, underrated benefit of the shared convention.

### The build lifecycle

You drive Maven by naming a **lifecycle phase**, and it runs that phase and every phase before it, in order:

```
validate → compile → test → package → verify → install → deploy
```

So `mvn package` compiles your code, runs your tests, and — only if they pass — bundles the result into a `.jar` in `target/`. `mvn install` does all that and copies the jar into your local repository so your *other* projects can depend on it. The actual work in each phase is done by **plugins** (the compiler plugin, the Surefire test plugin, the jar plugin); Maven is really a framework for sequencing them.

The trade-off is Maven's character: **XML is verbose**, and doing anything outside the standard lifecycle can be awkward — Maven strongly prefers you do things its way. In return you get near-zero configuration for a conventional project, a vast plugin ecosystem, and a build every Java developer already understands. When you want more programmability and speed than that rigidity allows, you reach for the script-based alternative — **Gradle**, next.
