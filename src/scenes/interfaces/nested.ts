import type { Scene } from '@graphlearning/flow'

// §6 — the four nested forms in one file, and the class files javac actually writes for them
// (real JDK 25.0.2 listing). Each is a real class with its own binary name.
export const ifcNested: Scene = {
  id: 'ifc-nested',
  title: 'Nested, local and anonymous classes',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Order.java',
      label: `public class Order {
    static class Line { ... }          // static nested
    class Numbered {                   // inner: needs an Order
        final int no = nextLineNo++;
    }
    public static void main(String[] args) {
        Order.Numbered n1 = order.new Numbered();
        record Pair(String sku, int cents) {}          // local
        Comparator<Line> bySku = new Comparator<>() {   // anonymous
            public int compare(Line a, Line b) { ... }
        };
    }
}`,
    },
    {
      id: 'kinds',
      label: 'Four kinds',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'static-nested', label: 'Static nested', sub: 'grouped, independent', pattern: 'service', icon: 'boxes' },
        { id: 'inner', label: 'Inner', sub: 'holds its outer object', pattern: 'network', icon: 'link' },
        { id: 'local', label: 'Local', sub: 'visible in one block', pattern: 'service', icon: 'braces' },
        { id: 'anonymous', label: 'Anonymous', sub: 'one-off, unnamed', pattern: 'user', icon: 'scroll' },
      ],
    },
    {
      id: 'files',
      kind: 'code',
      filename: 'javac -d out Order.java && ls out',
      label: `Order.class   Order$Line.class   Order$Numbered.class
Order$1.class   Order$1Pair.class`,
    },
  ],
  edges: [
    { source: 'code', target: 'kinds' },
    { source: 'kinds', target: 'files', label: 'compiled to' },
  ],
}
