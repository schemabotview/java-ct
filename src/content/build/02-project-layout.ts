import type { Section } from '../types'

export const projectLayout: Section = {
  id: 'project-layout',
  title: "Source, test and resource layout",
  scene: 'bld-layout',
  focus: 'jar',
  slide: `## A layout tools understand

Maven's **standard layout** tells every tool where things are, so the build needs almost no configuration.

### Three roots
- \`src/main/java\` — the application's source
- \`src/main/resources\` — files the app reads from the **classpath**
- \`src/test/java\` — tests, compiled separately, **never shipped**

### What goes in the jar
- Compiled main classes plus the resources, side by side
- No test classes, no source files

### Resources are classpath entries
- \`getResourceAsStream("/shop.properties")\` finds the file in the jar
- Not a file-system path — it works wherever the jar is
- \`-Dshop.shippingCents=0\` overrides the default at launch: 3750`,
  narration:
    "Maven's standard directory layout is a convention, and conventions save configuration. Application source lives under src main java, files the application needs at run time live under src main resources, and tests live under src test java. Because every Maven project agrees on this, the build file barely needs to mention paths at all, and any developer or tool opening the project knows where to look. Compare the source tree with what ended up in the jar. The compiled main classes are there, and the two resource files sit right beside them. The tests are not: they were compiled and run during the build, but they are never shipped. Resources deserve a closer look. The application loads shop dot properties with getResourceAsStream and a leading slash. That is a classpath lookup, not a file-system path, so it works the same whether the classes are in a directory or inside a jar on another machine. And because the code reads a system property first, a launch with dash D sets shipping to zero without rebuilding anything.",
}
