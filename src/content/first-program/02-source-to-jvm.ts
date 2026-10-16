import type { Section } from '../types'

export const sourceToJvm: Section = {
  id: 'source-to-jvm',
  title: 'Source, JDK tools, bytecode and the JVM',
  scene: 'fp-toolchain',
  focus: 'bytecode',
  slide: `## Source → bytecode → JVM

Java runs in **two hops**. \`javac\` translates source into **bytecode**; the **JVM** runs that bytecode on a particular machine.

### What each piece is
- **Source** — \`Order.java\`, text written for people
- **Bytecode** — \`Order.class\`, instructions for a virtual machine, not for your CPU
- **JVM** — loads, verifies, interprets and **JIT-compiles** hot code to native
- **JDK** — the kit: \`javac\`, \`java\`, \`jshell\`, \`javap\` plus a runtime

### The platform boundary
- The same \`.class\` file runs on any platform that has a compatible JVM
- The JVM itself is **built per platform** — that is where portability is paid for
- \`java --version\` and \`javac --version\` should report the **same release**`,
  narration:
    "When you run a Java program, two different translations happen, and it helps to keep them apart. First, the compiler, javac, reads your source file and writes a class file. That class file holds bytecode, which is a set of instructions for a virtual machine, not for the processor in your laptop. You can look at it yourself with javap. On the left you can see the real bytecode for our total: load the price, load the quantity, multiply, load the shipping, add, store. Second, the java launcher starts the Java Virtual Machine, which loads and verifies the class, begins by interpreting the bytecode, and compiles the parts that run often into native machine code as it goes. The JDK is the kit that bundles these tools with a runtime. The portability promise lives at exactly this boundary. Your class file is the same everywhere, but each operating system and processor needs its own build of the JVM underneath.",
}
