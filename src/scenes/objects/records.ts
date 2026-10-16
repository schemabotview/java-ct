import type { Scene } from '@graphlearning/flow'

// §6 — a record's fields are final, but a final reference to a mutable list is not an immutable
// value. The compact constructor's List.copyOf fixes the shell, not the elements. Real JDK 25.0.2
// output.
export const objRecords: Scene = {
  id: 'obj-records',
  title: 'Records, final references and immutability',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Records.java',
      label: `record Order(String id, List<String> skus) {}
record SafeOrder(String id, List<String> skus) {
    SafeOrder { skus = List.copyOf(skus); }
}
List<String> skus = new ArrayList<>(List.of("A-100"));
Order order = new Order("17", skus);
SafeOrder safe = new SafeOrder("17", skus);
skus.add("B-200");                       // after construction`,
    },
    {
      id: 'heap',
      label: 'Who sees the later add?',
      pattern: 'group',
      flow: 'LR',
      children: [
        {
          id: 'holders',
          label: 'Holders',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'order-rec', label: 'order', sub: 'stores the caller’s list', pattern: 'warn', icon: 'link' },
            { id: 'safe-rec', label: 'safe', sub: 'stores its own copy', pattern: 'service', icon: 'lock' },
          ],
        },
        {
          id: 'lists',
          label: 'Lists',
          pattern: 'group',
          flow: 'TB',
          children: [
            { id: 'shared-list', label: '[A-100, B-200]', sub: 'ArrayList — mutable', pattern: 'storage', icon: 'table' },
            { id: 'copied-list', label: '[A-100]', sub: 'List.copyOf — unmodifiable', pattern: 'storage', icon: 'table' },
          ],
        },
      ],
      edges: [
        { source: 'order-rec', target: 'shared-list' },
        { source: 'safe-rec', target: 'copied-list' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `Order[id=17, skus=[A-100, B-200]]
SafeOrder[id=17, skus=[A-100]]
safe.skus().add -> UnsupportedOperationException
List.of(new StringBuilder("gift")) after append -> [gift wrap]`,
    },
  ],
  edges: [
    { source: 'code', target: 'heap' },
    { source: 'heap', target: 'output', label: 'run' },
  ],
}
