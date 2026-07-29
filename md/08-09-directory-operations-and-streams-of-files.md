## Directory operations & streams of files

Reading one file is section 08; this section is about the *directory* — listing what's in it, walking a whole tree, and finding files by pattern. The elegant part is that `Files` exposes all of these as **streams of `Path`**, so the entire module-07 toolkit — `filter`, `map`, `sorted`, `count`, `collect` — applies directly to the filesystem. Walking a directory tree becomes a pipeline.

### `Files.list` — one directory, one level deep

`Files.list(dir)` returns a `Stream<Path>` of the *immediate* entries of a directory — not recursive. Like `Files.lines`, it holds an OS resource (an open directory handle), so it is `AutoCloseable` and **must** be used in a try-with-resources:

```java
try (Stream<Path> entries = Files.list(dir)) {
    entries.filter(Files::isRegularFile)      // skip sub-directories
           .map(Path::getFileName)
           .sorted()
           .forEach(System.out::println);
}   // the directory handle is released here
```

### `Files.walk` — the whole tree, recursively

`Files.walk(dir)` returns a `Stream<Path>` of *every* entry beneath a directory, descending into sub-directories depth-first. Same pipeline shape, now over an entire tree — and the same non-negotiable try-with-resources, because a deep walk holds handles open as it goes:

```java
try (Stream<Path> tree = Files.walk(start)) {
    long javaFiles = tree.filter(p -> p.toString().endsWith(".java"))
                         .count();
}
```

Pass a depth limit — `Files.walk(start, 2)` — to bound how far down it descends. This one stream replaces the classic hand-written recursive directory-walk method entirely.

### `Files.find` — walk with a built-in filter

When you're walking *in order to* match a predicate, `Files.find` fuses the walk and the filter. You give it a max depth and a `BiPredicate<Path, BasicFileAttributes>` — so the test can use cheap, already-fetched attributes (size, modified time, is-directory) without a separate `stat` call per file:

```java
try (Stream<Path> hits = Files.find(start, Integer.MAX_VALUE,
        (p, attrs) -> attrs.isRegularFile() && attrs.size() > 1_000_000)) {
    hits.forEach(System.out::println);        // files over 1 MB, anywhere in the tree
}
```

### The one rule you cannot forget

Every directory stream — `list`, `walk`, `find` — is backed by an **open filesystem resource**, unlike an in-memory `list.stream()`. Forget the try-with-resources and you leak directory handles; do enough of it and the process runs out and every further file operation fails. The discipline from section 06 is not optional here:

> **A `Files` stream is always `AutoCloseable`. Always open it in a try-with-resources.**

(In-memory collection streams from module 07 don't need this — only the ones backed by an OS resource do. The tell is that the stream *source* is a file or directory.)

### Why this design is satisfying

Notice what has happened across sections 07–09: the filesystem — directories, trees, huge files — has been re-expressed as **streams of `Path`**, so a single, uniform vocabulary (`filter`, `map`, `count`, `collect`) queries a `List`, a file's lines, and an entire directory tree alike. "Find every `.java` file over 1 MB modified this week" is one `Files.find` pipeline, not a recursive method with manual bookkeeping. Module 07's abstraction and module 08's I/O meet here — and the result reads like the question you're asking.
