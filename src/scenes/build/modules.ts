import type { Scene } from '@graphlearning/flow'

// §6 — two named modules: an exported API, a hidden implementation found through ServiceLoader, and
// the two different refusals (compile-time visibility, run-time deep reflection). Real JDK 25.0.2.
export const bldModules: Scene = {
  id: 'bld-modules',
  title: 'Modules, services, exports, opens and reflective access',
  flow: 'TB',
  nodes: [
    {
      id: 'descriptors',
      label: 'Two module descriptors',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'pricing-mi',
          kind: 'code',
          filename: 'shop.pricing/module-info.java',
          label: `module shop.pricing {
    exports shop.pricing;
    provides shop.pricing.PricingPolicy
        with shop.pricing.internal.BulkDiscount;
}`,
        },
        {
          id: 'app-mi',
          kind: 'code',
          filename: 'shop.app/module-info.java',
          label: `module shop.app {
    requires shop.pricing;
    uses shop.pricing.PricingPolicy;
}`,
        },
      ],
    },
    {
      id: 'outcomes',
      kind: 'table',
      label: 'What shop.app can and cannot do',
      headers: ['attempt', 'result'],
      values: [
        ['ServiceLoader.load(PricingPolicy.class)', 'BulkDiscount -> 1791'],
        ['new …internal.BulkDiscount()', 'javac: package … is not visible'],
        ['field.setAccessible(true)', 'InaccessibleObjectException'],
        ['… after opens …internal to shop.app', 'succeeds'],
      ],
    },
  ],
  edges: [{ source: 'descriptors', target: 'outcomes', label: 'java -p out -m shop.app/shop.app.Main' }],
}
