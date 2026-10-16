import type { Section } from '../types'

export const classLoading: Section = {
  id: 'class-loading',
  title: "Class loading, linking, initialisation and runtime identity",
  scene: 'jvm-class-loading',
  focus: 'init',
  slide: `## Classes arrive on first use

The JVM **loads**, **links** and **initialises** each class lazily — the first time running code needs it.

### Lazy, and visible
- \`-Xlog:class+load\` prints each class as it is loaded
- \`Init$TaxTable\` loads only when \`main\` first touches \`RATES\`

### When initialisation fails
- The static initialiser parses "x19" and throws
- First use: \`ExceptionInInitializerError\`, with the real **cause**
- Every later use: \`NoClassDefFoundError\` — **Could not initialize class**
- The class stays broken for the life of the JVM

### Two errors, two diagnoses
- NoClassDefFoundError **caused by ClassNotFoundException**: missing from the classpath (chapter 9)
- **Could not initialize**: present, but its initialiser failed earlier — find the first error`,
  narration:
    "The JVM does not load your whole program at startup. It loads, links and initialises each class lazily, the first time running code actually needs it. The class loading log makes that visible: Init is loaded to run main, main prints its first line, and only then, when the code first touches the tax table, is the nested TaxTable class loaded. Initialisation is the step that runs static initialisers, and it can fail. Here the tax rates come from configuration, one value is the text x nineteen, and parsing it throws. The first use of the class reports an ExceptionInInitializerError, carrying the real cause, the NumberFormatException. Look at the second attempt. It does not retry the initialiser. It throws NoClassDefFoundError, could not initialize class, because a class whose initialisation failed stays unusable for the life of the JVM. That message is easily confused with chapter nine's missing class. The difference is in the detail: a missing class is caused by ClassNotFoundException; could not initialize means it is there, and you must find the first error, often much earlier in the log.",
}
