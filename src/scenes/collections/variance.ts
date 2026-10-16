import type { Scene } from '@graphlearning/flow'

// §2 — why List<String> is not a List<Object>, and the two wildcards that recover flexibility.
// Real JDK 25.0.2 output: 3750 + 1798 = 5548; after addShipping, 6047.
export const colVariance: Scene = {
  id: 'col-variance',
  title: 'Invariance, bounds and wildcards',
  flow: 'TB',
  nodes: [
    {
      id: 'invariant',
      kind: 'code',
      filename: 'if this compiled…',
      label: `List<String> skus = new ArrayList<>(List.of("A-100"));
List<Object> things = skus;     // error: incompatible types:
                                // List<String> cannot be converted
                                // to List<Object>
things.add(42);                 // …a String list would hold 42`,
    },
    {
      id: 'wildcards',
      label: 'Producer extends, consumer super',
      pattern: 'group',
      cols: 1,
      children: [
        {
          id: 'extends',
          kind: 'code',
          filename: '? extends — read from it',
          label: `static long sum(List<? extends Number> v) {
    long t = 0;
    for (Number n : v) t += n.longValue();
    return t;
}
sum(List<Integer>)  5548
sum(List<Long>)     2500000000`,
        },
        {
          id: 'super',
          kind: 'code',
          filename: '? super — write into it',
          label: `static void addShipping(
        List<? super Integer> sink) {
    sink.add(499);
}
addShipping(List<Integer>) [3750, 1798, 499]
addShipping(List<Number>)  [499]`,
        },
      ],
    },
  ],
  edges: [{ source: 'invariant', target: 'wildcards', label: 'so instead' }],
}
