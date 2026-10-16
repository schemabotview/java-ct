import type { Section } from '../types'

export const pathsAndFiles: Section = {
  id: 'paths-and-files',
  title: "Path, Files, directories and path-resolution boundaries",
  scene: 'bnd-files',
  focus: 'guard',
  slide: `## Paths and directories

\`Path\` describes a location; \`Files\` acts on it. Both are boundaries where **user input** can reach places it should not.

### Building and listing
- \`resolve\` joins paths; \`getFileName\` and \`getParent\` take them apart
- \`Files.list\` returns a **stream that holds an open directory** — close it

### Keep input inside a base directory
- Resolve the user's name against the base, **then** normalize
- \`normalize\` removes \`.\` and \`..\`
- Accept it only if the result still \`startsWith(base)\`
- \`2026/17.csv\` stays inside; \`../../secrets.txt\` is **rejected**

### Remember
- A check on the raw string misses \`..\` and symlinks
- Better still: let users pick from a list`,
  narration:
    "A Path describes a location in a file system, and the Files class performs operations on it. resolve joins one path onto another, while getFileName and getParent take a path apart. Files dot list returns a stream of the entries in a directory, and that stream holds an open directory handle, which is why it sits inside try-with-resources. Paths become a security boundary the moment part of one comes from a user. Suppose the user supplies a file name to download. Resolving it against the orders directory looks harmless, but a name containing dot-dot segments climbs out of that directory. normalize collapses those segments into the real destination, so the safe pattern is: resolve against the base, normalize, and accept the result only if it still starts with the base. Two thousand twenty-six slash seventeen dot csv stays inside and is allowed. Dot-dot slash dot-dot slash secrets dot txt normalizes outside and is rejected. Checking the raw string is not enough, and where possible, let users choose from a list instead.",
}
