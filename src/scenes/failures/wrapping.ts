import type { Scene } from '@graphlearning/flow'

// §3 — translating a low-level failure into the caller's vocabulary while keeping the cause, versus
// swallowing it. Real JDK 25.0.2 output, with the JDK-internal frames of the cause trimmed.
export const failWrapping: Scene = {
  id: 'fail-wrapping',
  title: 'Catching, rethrowing, wrapping and preserving causes',
  flow: 'TB',
  nodes: [
    {
      id: 'wrap',
      kind: 'code',
      filename: 'wrap — keep the cause',
      label: `static String load(Path p) throws OrderImportException {
    try {
        return Files.readString(p);
    } catch (IOException e) {
        throw new OrderImportException("cannot import " + p, e);
    }
}`,
    },
    {
      id: 'wrap-out',
      kind: 'code',
      filename: 'terminal',
      label: `Exception in thread "main" Wrap$OrderImportException:
  cannot import orders.csv
    at Wrap.load(Wrap.java:10)
    at Wrap.main(Wrap.java:19)
Caused by: java.nio.file.NoSuchFileException: orders.csv
    at java.base/java.nio.file.Files.readString(Files.java:3006)
    at Wrap.load(Wrap.java:8)`,
    },
    {
      id: 'swallow',
      kind: 'code',
      filename: 'swallow — lose it',
      label: `try { return Files.readString(p).length(); }
catch (Exception e) { return 0; }    // "0 orders"
// swallowed: 0     — no trace, no message, wrong answer`,
    },
  ],
  edges: [
    { source: 'wrap', target: 'wrap-out', label: 'run' },
    { source: 'wrap-out', target: 'swallow', label: 'contrast' },
  ],
}
