## The NIO `Path` — modern filesystem paths

The second half of the module turns to files — the everyday place where I/O and exceptions meet. Modern Java has two file APIs, and the first thing to learn is *which one to use*. The old `java.io.File` (from 1996) is still around but effectively retired; everything new goes through **`java.nio.file`** — the "NIO.2" API introduced in Java 7, built around two types: **`Path`** (a location) and **`Files`** (operations on it). This section is about `Path`; the next is `Files`.

### What a `Path` is — and isn't

A `Path` is an **abstract location in a filesystem** — a sequence of name elements like `home / ada / notes.txt`. Crucially, it is *just the address*: creating a `Path` touches no disk, and the file it names **need not exist**. It's a value you manipulate — build it, join it, resolve it — before you ever read or write.

```java
Path p = Path.of("/home/ada/notes.txt");    // the modern factory (Java 11+)
Path r = Path.of("docs", "report.pdf");      // segments joined with the OS separator
```

`Path.of(...)` is the entry point. Note the second form joins segments with the *platform's* separator — so you write portable code, not hard-coded slashes.

### Building paths: `resolve` and `relativize`

The two core operations combine and compare paths, and they're inverses of each other:

```java
Path base = Path.of("/home/ada");
Path file = base.resolve("notes.txt");        // /home/ada/notes.txt  (join a child)
Path back = base.relativize(file);            // notes.txt            (the route from base to file)
```

`resolve` appends — the right way to build a child path instead of gluing strings with `"/"`. `relativize` computes the relative route between two paths. Prefer these to `String` concatenation: they respect the separator and handle edge cases (absolute vs relative segments) correctly.

### Inspecting and normalizing

`Path` has a vocabulary for asking about its parts and cleaning it up — all pure string-level operations, still touching no disk:

```java
p.getFileName();     // notes.txt        — the last element
p.getParent();       // /home/ada        — everything but the last
p.isAbsolute();      // true             — rooted, vs relative
p.normalize();       // collapses  a/./b/../c  ->  a/c
p.toAbsolutePath();  // resolves a relative path against the working directory
```

`normalize()` earns special mention: it collapses `.` and `..` segments, which matters for security (defusing `../../etc/passwd` traversal) and for comparing two paths that point to the same place by different routes.

### Why `Path` over the old `File`

The switch isn't cosmetic — `java.nio.file` fixes real deficiencies of `java.io.File`:

- **Honest errors.** Old `File` methods returned `false` on failure (`file.delete()` → did it fail, or was it already gone?). The NIO `Files` operations **throw a descriptive `IOException`** instead — the section-01 lesson applied to the filesystem.
- **Full-featured.** Symbolic links, file attributes and permissions, atomic moves, directory-change watching — capabilities `File` never had.
- **Clean separation.** `Path` is the *location*; `Files` is the *operations*. The old `File` muddled both into one class.

The mental model to carry into the next sections: **a `Path` is an address you build and reason about with pure, disk-free operations; `Files` is where that address finally meets the disk** — and where the `IOException`s of the first half of this module come home.
