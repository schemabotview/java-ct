## Gradle — the script-based alternative

Maven describes a build in declarative XML. **Gradle** takes the opposite bet: a build is a **program**, written in a real scripting language, so anything you can express in code you can express in your build. It shares Maven's whole dependency model but trades rigid convention for **programmable flexibility** and considerably more speed. This section is Gradle as the counterpoint to Maven.

### The build script — code, not XML

A Gradle build lives in `build.gradle` (Groovy) or `build.gradle.kts` (the Kotlin DSL), and it *reads* like configuration but *is* executable code. The dependency block looks familiar because the model underneath is the same:

```kotlin
dependencies {
    implementation("com.google.guava:guava:33.0.0-jre")
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.0")
}
```

That's the identical `group:artifact:version` coordinate from Maven, on one line — and because the script is code, you can wrap it in loops, conditionals, and custom logic when a build genuinely needs them.

### Same ecosystem, different surface

Crucially, Gradle did **not** reinvent the dependency world. It resolves the same **coordinates** from the same **repositories** (Maven Central and friends), with the same transitive resolution. So switching build tools doesn't switch libraries — only how you *declare* and *drive* the build. Gradle also follows the same conventional `src/main/java` layout by default. What changes is the surface: concise script instead of verbose XML, and a programming model instead of a fixed lifecycle.

### Why teams pick it: speed and flexibility

Gradle's two headline advantages are **performance** and **flexibility**:

- **Incremental builds** — Gradle tracks inputs and outputs and re-runs only the tasks whose inputs changed, skipping the rest.
- **Build cache** — it can reuse task outputs across builds and even across machines, so work done once (by you or a teammate) isn't repeated.
- **The daemon** — a background process stays warm between builds, avoiding JVM startup each time.
- **Programmable tasks** — custom build steps are just code, so unconventional builds don't fight the tool.

Together these make Gradle noticeably faster on large projects and far more comfortable when a build strays off the beaten path.

### The trade-off, and where each wins

Nothing is free: that flexibility means a Gradle build **can** grow into complex, hard-to-follow script, and there's simply more to learn than Maven's fixed model — a build-as-program can go wrong in ways a declarative POM can't. So the honest summary is a spectrum, not a winner. **Maven** favors *convention and predictability* — every project looks the same, which is a virtue for straightforward apps and teams that value uniformity. **Gradle** favors *flexibility and speed* — it's the standard for **Android**, common on large or unconventional builds, and preferred where build performance matters. Both pull the same dependencies from the same repositories; the choice is really declarative XML versus programmable script.

With source compiled and packaged by a build tool, one job remains — proving the code actually *works*. Build tools run tests, but they don't write them. The last two sections are the frameworks that do: **JUnit** for the tests themselves, and **Mockito** for testing a unit in isolation.
