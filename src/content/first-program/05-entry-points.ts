import type { Section } from '../types'

export const entryPoints: Section = {
  id: 'entry-points',
  title: 'Entry points and command-line arguments',
  scene: 'fp-entry-points',
  focus: 'named',
  slide: `## Entry points and arguments

The launcher looks for a **\`main\` method** — the entry point. The conventional form names everything the compact form leaves implicit.

### What the long form adds
- \`public class OrderTotal\` — an explicit class, matching the file name
- \`static\` — callable without first creating an object
- \`String[] args\` — the words typed **after** the class or file name

### Arguments arrive as text
- \`java OrderTotal.java 3\` gives \`args = ["3"]\`
- \`Integer.parseInt\` turns \`"3"\` into the number \`3\`
- No argument means \`args\` is empty, and \`args[0]\` fails at run time

### Which form to use
- Compact files for first experiments; named classes once code is shared`,
  narration:
    "Every Java program starts somewhere, and that somewhere is a method called main. The compact file we wrote earlier hides most of the structure. The conventional version on the left spells it out. There is an explicit public class whose name matches the file. The main method is static, which means the launcher can call it without first creating an object. And it receives an array of strings called args, holding whatever words you typed after the file or class name. Those words always arrive as text. If you type three, main receives the string three, and Integer dot parseInt converts it into the number. Now look at the second run in the terminal. With no argument, the array is empty, and asking for element zero fails with an index out of bounds exception, pointing at line three. That is not a compile error. The program compiled perfectly well. It failed while running, which is exactly the distinction the next section is about.",
}
