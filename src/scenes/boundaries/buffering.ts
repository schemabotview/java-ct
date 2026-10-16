import type { Scene } from '@graphlearning/flow'

// §6 — a 12 MiB, 1,000,000-line file read two ways under a 16 MiB heap. Real JDK 25.0.2 output:
// streaming finishes, loading everything runs out of memory.
export const bndBuffering: Scene = {
  id: 'bnd-buffering',
  title: 'Byte and character streams, buffering and bounded reading',
  flow: 'LR',
  nodes: [
    {
      id: 'stack',
      label: 'Layers between the program and the disk',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'file', label: 'File', sub: 'bytes on disk', pattern: 'storage', icon: 'harddrive' },
        { id: 'decoder', label: 'Decoder', sub: 'bytes → chars, UTF-8', pattern: 'network', icon: 'regex' },
        { id: 'buffer', label: 'Buffer', sub: 'reads in big chunks', pattern: 'service', icon: 'layers' },
        { id: 'lines', label: 'Lines', sub: 'one String at a time', pattern: 'user', icon: 'scroll' },
        { id: 'code', label: 'Your code', sub: 'filter, count, stop early', pattern: 'user', icon: 'funnel' },
      ],
      edges: [
        { source: 'file', target: 'decoder' },
        { source: 'decoder', target: 'buffer' },
        { source: 'buffer', target: 'lines' },
        { source: 'lines', target: 'code' },
      ],
    },
    {
      id: 'reads',
      label: '1,000,000 lines, 16 MiB heap',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'stream-way',
          kind: 'code',
          filename: 'java -Xmx16m Load stream',
          label: `try (Stream<String> lines = Files.lines(big, UTF_8)) {
    lines.filter(l -> l.startsWith("S-7,")).count();
}
// streamed: 1000 matches`,
        },
        {
          id: 'load-way',
          kind: 'code',
          filename: 'java -Xmx16m Load load',
          label: `List<String> all = Files.readAllLines(big, UTF_8);
// Exception in thread "main"
//   java.lang.OutOfMemoryError: Java heap space`,
        },
      ],
      edges: [{ source: 'stream-way', target: 'load-way', label: 'versus' }],
    },
  ],
  edges: [
    { source: 'stack', target: 'reads', label: '12 MiB file' },
  ],
}
