import type { Section } from '../types'

export const classpathAndJars: Section = {
  id: 'classpath-and-jars',
  title: "Classpath, dependencies, JARs and executable packaging",
  scene: 'bld-classpath',
  focus: 'missing',
  slide: `## The classpath at run time

The JVM loads classes **when first used**, searching the **classpath** in order. Compiling successfully proves nothing about what will be on it at run time.

### Five launches
- \`java -jar\` needs a **Main-Class** in the manifest
- \`-cp\` plus a class name works with any jar
- \`jar --main-class\` writes the manifest entry for you
- A wrong class name: **could not find or load main class**

### Missing at run time
- \`CsvOrders.class\` removed after compiling
- \`NoClassDefFoundError\` — caused by \`ClassNotFoundException\`
- It fails only when \`App\` first **reaches** that line
- Build tools assemble the classpath — check what they put on it

### A jar is not an application
- It does not bundle its dependencies or a JVM`,
  narration:
    "Compiling a program and running it are separate events, and the classpath is where they can disagree. At run time, the JVM loads each class the first time it is used, searching the directories and jars on the classpath in order. Five launches show the common outcomes. Running the Maven-built jar with java dash jar fails, because its manifest names no main class. Naming the class explicitly with dash c-p works. Building a jar with the main-class option writes that manifest entry, after which dash jar works too. A mistyped class name gives the familiar could not find or load main class. The last row is the subtle one. The code compiled perfectly, but CsvOrders dot class is missing from the classpath at run time. Nothing fails at startup. The program runs until App first reaches the line that needs CsvOrders, and then throws NoClassDefFoundError, caused by ClassNotFoundException. Remember too that a plain jar contains only your own classes. It does not bundle its dependencies, and it certainly does not bundle a JVM.",
}
