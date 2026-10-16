import type { Section } from '../types'

export const modulesAndServices: Section = {
  id: 'modules-and-services',
  title: "Modules, services, exports, opens and reflective access",
  scene: 'bld-modules',
  focus: 'outcomes',
  slide: `## Modules: a stronger boundary

A **module** declares which packages it **exports** and which modules it **requires**. Everything else is hidden — even public classes.

### Exports
- \`shop.pricing\` exports its API package only
- \`BulkDiscount\` is public but lives in an **unexported** package
- javac: package \`shop.pricing.internal\` **is not visible**

### Services
- \`provides … with BulkDiscount\` registers an implementation
- \`uses\` plus \`ServiceLoader\` finds it **without naming it**: 1791

### Opens
- Deep reflection on private fields needs an explicit \`opens\`
- Without it: \`InaccessibleObjectException\`
- \`opens … to shop.app\` grants it to one module only`,
  narration:
    "Packages hide package-private classes, but anything public is visible to everyone. Modules draw a stronger line. A module descriptor states which packages the module exports and which other modules it requires, and everything not exported is hidden, even public classes. The pricing module exports only its API package, with the PricingPolicy interface. Its BulkDiscount class is public, but it sits in an internal package that is not exported. When the app module tries to construct it directly, the compiler reports that the package is not visible. So how does the app get a pricing policy at all? Through a service. The pricing module declares that it provides PricingPolicy with BulkDiscount, the app declares that it uses PricingPolicy, and ServiceLoader finds the implementation at run time without the app ever naming it. It prices ten items at one ninety-nine as seventeen ninety-one. Deep reflection is a separate permission. Reading a private field fails with an inaccessible object exception until the pricing module opens that package, here to the app module alone.",
}
