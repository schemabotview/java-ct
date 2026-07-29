## `Files` — reading and writing

`Path` names a location; **`Files`** is the class of static methods that actually *do things* to it — read it, write it, copy it, ask if it exists. This is where your program meets the disk, and where the `IOException`s of this module's first half become concrete. The good news: for the common cases, one method call does the whole job, resource handling included.

### The whole-file shortcuts — the 90% case

For a file that comfortably fits in memory, `Files` gives you one-line read and write. No streams to open, no `try-with-resources` to write — the method opens, transfers, and closes internally:

```java
String text  = Files.readString(path);              // whole file → String  (UTF-8)
List<String> lines = Files.readAllLines(path);       // whole file → List<String>
byte[] bytes = Files.readAllBytes(path);             // whole file → byte[]

Files.writeString(path, "hello\n");                  // String → file (created/truncated)
Files.write(path, lines);                            // each element on its own line
```

These are the methods you'll reach for most. `readString`/`writeString` (Java 11+) default to **UTF-8** — a deliberate, portable choice; don't rely on the platform's default charset.

### Controlling write behaviour: `OpenOption`

By default `writeString`/`write` **create the file if absent and truncate it if present** — a full overwrite. To append instead, or to demand the file not already exist, pass an `OpenOption`:

```java
Files.writeString(path, line, StandardOpenOption.APPEND);        // add to the end
Files.writeString(path, data, StandardOpenOption.CREATE_NEW);    // fail if it exists
```

### When the file is large: stream it, don't slurp it

`readAllLines` loads the *entire* file into memory — fine for a config file, ruinous for a 10 GB log. For large or unbounded input, open a lazy, **`AutoCloseable`** stream and let it flow one line at a time:

```java
try (Stream<String> lines = Files.lines(path)) {     // lazy — one line at a time
    long errors = lines.filter(l -> l.contains("ERROR")).count();
}   // the stream MUST be closed — it holds an open file handle
```

This is the module coming full circle: a `Files.lines` stream is a module-07 pipeline whose source is a file, and because it holds a file handle it **must** be opened in a try-with-resources (section 06). Slurp small files; stream large ones.

### Filesystem operations, not just contents

`Files` also manipulates the files themselves — existence checks, copies, moves, deletes — each throwing a descriptive `IOException` on failure rather than the old `File`'s silent `false`:

```java
Files.exists(path);        Files.isDirectory(path);
Files.createFile(path);    Files.createDirectories(path);   // makes parents too
Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
Files.move(src, dst);      Files.delete(path);              // throws if absent
Files.deleteIfExists(path);                                 // false instead of throwing
```

### The rule of thumb

- **Small file, whole contents →** `readString` / `readAllLines` / `writeString`. One call, done.
- **Large or streaming →** `Files.lines(...)` (or `newBufferedReader`) inside a try-with-resources.
- **The file itself →** `exists`, `copy`, `move`, `delete` — and expect an `IOException`, so wrap or declare it.

Underneath, everything obeys the two halves of this module at once: the operations *throw checked `IOException`s* you must handle, and the streaming ones are *`AutoCloseable` resources* you must close. Files are where exceptions, resources, and streams all meet.
