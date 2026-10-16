import type { Section } from '../types'

export const compatibilityAndRuntimes: Section = {
  id: 'compatibility-and-runtimes',
  title: "Source, target and runtime compatibility, and runtime images",
  scene: 'bld-compat',
  focus: 'matrix',
  slide: `## Compile for the runtime you ship on

The JDK that **compiles** your code and the JVM that **runs** it can differ. \`--release\` makes javac check against the platform you will actually run.

### One source file, three releases
- \`--release 17\`: \`getFirst()\` does not exist yet — **cannot find symbol**
- \`--release 21\`: class file major **65**, runs on JDK 21
- \`--release 25\`: major **69** — JDK 21 refuses with \`UnsupportedClassVersionError\`

### Why --release, not just -target
- It checks the **API** of that release, not only the bytecode version
- Set it once in the build: \`maven.compiler.release\`

### Runtime images
- \`jdeps\` lists the modules the app needs: \`java.base\`
- \`jlink\` builds a runtime of just those: 52 MB instead of 286 MB`,
  narration:
    "The JDK that compiles your code and the JVM that eventually runs it are often different versions, and a mismatch fails in ways worth recognising. Here is one source file that calls List dot getFirst, a method added in Java twenty-one. Compiling with release seventeen fails immediately: the method does not exist in that release's API, so javac cannot find the symbol. That is exactly what you want to discover at build time. Compiling with release twenty-one produces a class file with major version sixty-five, and it runs happily on a Java twenty-one runtime. Compiling with release twenty-five produces major version sixty-nine, and the Java twenty-one runtime refuses to load it at all, with an UnsupportedClassVersionError naming both version numbers. The release flag is better than the older target flag because it checks the API as well as the bytecode format. Finally, you can ship the runtime itself. jdeps reports that this program needs only java dot base, and jlink builds a runtime image of just that module: fifty-two megabytes instead of the full JDK's two hundred and eighty-six.",
}
