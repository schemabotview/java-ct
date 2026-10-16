import type { Section } from '../types'

export const packagesAndDependencies: Section = {
  id: 'packages-and-dependencies',
  title: "Packages, imports, visibility and dependency direction",
  scene: 'bld-packages',
  focus: 'totals',
  slide: `## Packages and direction

A **package** groups related classes and draws a visibility boundary. Arranged well, dependencies point **one way**.

### The order app in three packages
- \`shop.domain\` — \`LineItem\`, \`Order\`, \`Totals\`: the rules
- \`shop.io\` — reading CSV into domain objects
- \`shop.app\` — wiring, configuration and \`main\`

### Direction
- app → io → domain; the domain imports **nothing** from the others
- The core can be tested and reused without files or networks
- A cycle between packages is a design smell

### Package-private is a tool
- \`Totals\` has no modifier: visible only **inside** \`shop.domain\`
- javac refuses access from \`shop.io\`
- Tests in the same package can still reach it`,
  narration:
    "As the order program grows, one folder of classes stops being enough. A package groups related classes under a name, and it also draws a visibility boundary. We split the application into three. The domain package holds LineItem, Order and a helper called Totals: the business rules. The io package turns CSV text into domain objects. The app package wires everything together and holds main. The most important decision is the direction of the arrows. App depends on io, io depends on the domain, and the domain depends on nothing else in the program. That means the core rules can be tested and reused without any files, networks or configuration, and a change to the CSV format cannot break them. Packages also give you a third level of access between private and public. Totals is declared with no modifier, which makes it package-private: usable throughout the domain package and invisible outside it. When io tries to call it directly, javac refuses. Tests that live in the same package can still reach it.",
}
