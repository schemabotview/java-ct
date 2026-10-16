import type { Section } from '../types'

export const dispatchAndOverloading: Section = {
  id: 'dispatch-and-overloading',
  title: "Inheritance, overriding, dynamic dispatch and overload resolution",
  scene: 'ifc-dispatch',
  focus: 'run-time',
  slide: `## Two decisions, two times

Overriding and overloading look alike but are decided **at different moments, from different types**.

### Overriding — at run time
- \`Express\` replaces \`name()\` from \`Shipping\`
- The JVM picks the method from the **object's class**
- \`s.name()\` prints \`express\`, though \`s\` is declared \`Shipping\`
- Static methods are **hidden**, not overridden — no dispatch

### Overloading — at compile time
- Two \`label\` methods differ only in parameter type
- javac picks one from the **static type** of the argument
- \`label(s)\` and \`label(o)\` print different results for the **same object**
- The chosen overload is fixed in the class file

### Habits
- Mark overrides with \`@Override\`; avoid overloads that differ only in hierarchy`,
  narration:
    "Two features with similar names make different decisions at different times. The first is overriding. Express extends Shipping and replaces its name method. When we call s dot name, the variable s is declared as Shipping, but the object inside it is an Express. The JVM looks at the object's actual class when the call happens, and runs the Express version. That is dynamic dispatch, and it is what made the pricing policies interchangeable. The second is overloading: two methods called label, one taking Object and one taking Shipping. Here the choice is made by the compiler, before the program runs, and the compiler only knows the declared types. Passing s, declared as Shipping, selects the Shipping overload. Passing o, which is the very same object but declared as Object, selects the Object overload. Same object, different method. That surprise is why overloads that differ only by a supertype and a subtype are best avoided, and why every override should carry the at-Override annotation.",
}
