import type { Section } from '../types'

export const mavenLifecycle: Section = {
  id: 'maven-lifecycle',
  title: "Maven lifecycle, dependency resolution and version/plugin control",
  scene: 'bld-maven',
  focus: 'phases',
  slide: `## The Maven lifecycle

A **POM** declares what the project is and needs. A **lifecycle phase** like \`package\` runs every phase before it, each bound to a plugin goal.

### What \`mvn package\` ran
- resources → compile → test-compile → **test** → jar
- A failing test stops the build **before** a jar exists
- Each line names the plugin **and its version**

### Dependencies
- The JUnit **BOM** pins one consistent set of versions
- One declared dependency pulls in **transitive** ones
- \`test\` scope: on the test classpath only, never in the jar

### Pinning
- Pin plugin and dependency versions for **repeatable** builds
- Repeatable is not the same as byte-for-byte reproducible`,
  narration:
    "Maven reads the project object model, the POM, which declares what the project is, which Java release it targets, and which libraries and plugins it needs. You then ask for a lifecycle phase, such as package, and Maven runs every earlier phase first. The real build log shows the sequence: process resources, compile the main code, compile the tests, run the tests, and only then build the jar. Each step is a plugin goal, and the log names each plugin's exact version. That ordering matters. If a test fails, the build stops before any jar is created, so a broken build never produces something that looks shippable. Dependencies are resolved before any of this. We declared one JUnit dependency, versioned through a bill of materials that keeps the whole JUnit family consistent, and the dependency tree shows the transitive libraries it brought along. All of them are test-scoped, so none reach the jar. Pinning every plugin and dependency version makes the build repeatable, which is valuable, but it is not a guarantee of byte-identical output.",
}
