import type { Scene } from '@graphlearning/flow'

// §5 — the compact source file and its conventional named-class equivalent, then what the launcher
// hands to `args`. Both transcripts are real JDK 25.0.2 output.
export const entryPoints: Scene = {
  id: 'fp-entry-points',
  title: 'Entry points and arguments',
  flow: 'TB',
  nodes: [
    {
      id: 'compact',
      kind: 'code',
      filename: 'Order.java — compact source file',
      label: `void main() {
    IO.println("Total (cents): " + (1250 * 3 + 499));
}`,
    },
    {
      id: 'named',
      kind: 'code',
      filename: 'OrderTotal.java — named class',
      label: `public class OrderTotal {
    public static void main(String[] args) {
        int quantity = Integer.parseInt(args[0]);
        int totalCents = 1250 * quantity + 499;
        System.out.println("Total (cents): " + totalCents);
    }
}`,
    },
    {
      id: 'run',
      kind: 'code',
      filename: 'terminal',
      label: `$ java OrderTotal.java 3
Total (cents): 4249            # args = ["3"]

$ java OrderTotal.java
Exception in thread "main"
  java.lang.ArrayIndexOutOfBoundsException:
  Index 0 out of bounds for length 0
    at OrderTotal.main(OrderTotal.java:3)`,
    },
  ],
  edges: [
    { source: 'compact', target: 'named', label: 'same idea, full structure' },
    { source: 'named', target: 'run', label: 'launch with arguments' },
  ],
}
