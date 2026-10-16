import type { Section } from '../types'

export const compileAndRun: Section = {
  id: 'compile-and-run',
  title: 'A first compile and run',
  scene: 'fp-compile-run',
  focus: 'two-step',
  slide: `## A first compile and run

Since **Java 25**, a source file can be just a \`main\` method — a **compact source file**. The class around it is implicit.

### Compile, then run
- \`javac Order.java\` writes \`Order.class\` next to the source
- \`java Order\` names the **class**, not the file — no \`.java\` suffix
- Errors at the first step are compile errors; nothing has run yet

### Launch the source file
- \`java Order.java\` compiles in memory and runs in one step
- No \`.class\` file is left behind — fine for one small file, not for a build

### Read the output
- One line, \`Total (cents): 4249\` — it matches the hand calculation`,
  narration:
    "Here is the whole first program. Since Java twenty-five, a file can contain nothing but a main method, and the compiler supplies the class around it. We will see the longer, conventional form shortly. There are two ways to run it, and they are not the same workflow. In the first, you compile and then run. javac reads Order dot java and writes Order dot class beside it. Then java Order runs that class. Notice that you name the class, not the file, so there is no dot java on the end. In the second, you hand the source file straight to the java launcher. It compiles in memory and runs immediately, leaving no class file behind. That is convenient for one small file, but real applications keep the two steps apart, because compiling once and running many times is the normal shape of a build. Either way, read the output and compare it with the answer you worked out by hand. Four thousand two hundred and forty-nine. It matches.",
}
