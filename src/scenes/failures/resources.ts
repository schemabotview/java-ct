import type { Scene } from '@graphlearning/flow'

// §4 — a resource that fails while working AND while closing. try-with-resources closes it anyway,
// keeps the work failure as primary and attaches the close failure as suppressed. Real JDK 25.0.2
// output, launcher frames trimmed.
export const failResources: Scene = {
  id: 'fail-resources',
  title: 'try-with-resources, closure and suppressed exceptions',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Twr.java',
      label: `class Export implements AutoCloseable {
    void write(String row) {
        throw new IllegalStateException("disk full writing " + row);
    }
    @Override public void close() {
        throw new IllegalStateException("flush failed on close");
    }
}
try (Export out = new Export("orders.csv")) {
    out.write("17,A-100,3");
}                                    // close() runs here, always`,
    },
    {
      id: 'timeline',
      kind: 'memory',
      label: 'What happened, in order',
      slots: [
        { at: '1', name: 'open orders.csv' },
        { at: '2', name: 'write throws', note: 'primary failure' },
        { at: '3', name: 'close orders.csv', note: 'still runs' },
        { at: '4', name: 'close throws', note: 'suppressed' },
      ],
    },
    {
      id: 'output',
      kind: 'code',
      filename: 'terminal',
      label: `open orders.csv
close orders.csv
Exception in thread "main" java.lang.IllegalStateException:
  disk full writing 17,A-100,3
    at Twr$Export.write(Twr.java:4)
    Suppressed: java.lang.IllegalStateException: flush failed on close
        at Twr$Export.close(Twr.java:7)`,
    },
  ],
  edges: [
    { source: 'code', target: 'timeline', label: 'run' },
    { source: 'timeline', target: 'output' },
  ],
}
