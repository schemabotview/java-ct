import type { Section } from '../types'

export const apiEvolution: Section = {
  id: 'api-evolution',
  title: "API design, documentation, compatibility and controlled change",
  scene: 'ifc-evolution',
  focus: 'v3',
  slide: `## Changing a published API

Once others implement or call your interface, every change is either **compatible** or **caller-visible**. Know which before you ship it.

### Adding a default method — compatible
- Existing implementers still compile and inherit it
- The **old** \`Flat.class\` runs unchanged against the new interface

### Adding an abstract method — breaking
- Every implementer must now provide it
- javac: \`Flat is not abstract and does not override…\`
- In someone else's code base, that is **their** build that fails
- Renaming or removing a method breaks **callers** too

### Controlled change
- Document results and failures, not just signatures
- Deprecate first, remove later, and say so in the version
- Source and binary compatibility are **separate** checks`,
  narration:
    "An interface that only you use can change freely. Once other code implements it or calls it, every change has consequences, and you should know which kind you are making. Here is PricingPolicy in three versions, with one existing implementation called Flat. Version two adds a method with a default body. Flat still compiles without any edits and simply inherits the default. Even more telling, the Flat class file compiled against version one keeps running when the new interface is swapped in underneath it. That change is compatible. Version three adds a method without a body. Now every implementation is obliged to provide it, and Flat no longer compiles. In your own repository that is an afternoon of fixes; in someone else's, it is their build breaking because of your release. So treat a published API as a promise. Document what results and failures mean, not just the method signatures. Mark things deprecated before removing them, and make the version number say which kind of change you made.",
}
