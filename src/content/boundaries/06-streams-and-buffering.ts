import type { Section } from '../types'

export const streamsAndBuffering: Section = {
  id: 'streams-and-buffering',
  title: "Byte and character streams, buffering and bounded reading",
  scene: 'bnd-buffering',
  focus: 'stream-way',
  slide: `## Read in bounded pieces

Files can be larger than memory. Reading them **line by line** keeps memory use flat; reading them **whole** makes it grow with the file.

### The layers
- **Bytes** come from the file; a **decoder** turns them into characters
- A **buffer** reads big chunks so each line costs little I/O
- \`Files.lines\` and \`BufferedReader\` hand you one line at a time

### The same file, two ways, 16 MiB heap
- \`Files.lines(...).filter(...).count()\` — **1000 matches**
- \`Files.readAllLines(...)\` — **OutOfMemoryError**
- The file was only 12 MiB; as Strings in a list it was far larger

### Habits
- Bound what you read: stream, count, or stop early
- Close every stream you open — \`try (...)\` again`,
  narration:
    "Files can be far larger than the memory available to a program, so the way you read them matters. Between the disk and your code there are layers. The file provides bytes. A decoder, using a charset, turns those bytes into characters. A buffer reads large chunks at a time, so that asking for one line does not mean one tiny read from the disk. And a line reader hands you one String per line. Here is the difference it makes. The file has a million lines and is twelve mebibytes on disk, and the program runs with a deliberately small sixteen mebibyte heap. Streaming the lines, filtering and counting finds a thousand matches and finishes comfortably, because only a few lines exist in memory at any moment. Reading all the lines into a list fails with an OutOfMemoryError, because a million String objects in a list take several times the space of the raw bytes. So bound what you read, process as you go, stop early when you can, and close every stream you open.",
}
