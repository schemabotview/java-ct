import type { Scene } from '@graphlearning/flow'

// §5 — Path operations, a directory listing that must be closed, and the resolve/normalize/startsWith
// check that keeps user input inside a base directory. Real JDK 25.0.2 output, base path shortened.
export const bndFiles: Scene = {
  id: 'bnd-files',
  title: 'Path, Files, directories and path-resolution boundaries',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Paths1.java',
      label: `Path base = Path.of("data/orders").toAbsolutePath().normalize();
Path p = base.resolve("2026").resolve("17.csv");
Files.writeString(p, "A-100,1250,3\\n");
try (Stream<Path> files = Files.list(base.resolve("2026"))) {
    files.map(f -> f.getFileName().toString()).sorted().toList();
}                                    // [17.csv, 18.csv]`,
    },
    {
      id: 'guard',
      kind: 'code',
      filename: 'keep user input inside base',
      label: `static Path safeResolve(Path base, String userInput) {
    Path target = base.resolve(userInput).normalize();
    if (!target.startsWith(base))
        throw new IllegalArgumentException("outside " + base);
    return target;
}`,
    },
    {
      id: 'cases',
      label: 'safeResolve(base, …)',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'inside', label: 'Stays inside', sub: '2026/17.csv: allowed', pattern: 'service', icon: 'folder' },
        { id: 'outside', label: 'Climbs out', sub: '../../secrets.txt: rejected', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'guard', label: 'user-supplied names' },
    { source: 'guard', target: 'cases' },
  ],
}
