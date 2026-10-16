import type { Scene } from '@graphlearning/flow'

// §7 — one source file compiled for three releases. JDK 25.0.2 javac; the run on JDK 21 is the
// container's OpenJDK 21.0.12.1. The jlink image was built with that JDK 21, because the JDK 25
// build used here ships without jmods ("does not support linking from the current run-time image").
export const bldCompat: Scene = {
  id: 'bld-compat',
  title: 'Source, target and runtime compatibility, and runtime images',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Report.java',
      label: `List<String> skus = List.of("A-100", "B-200");
System.out.println("first: " + skus.getFirst());   // added in Java 21`,
    },
    {
      id: 'matrix',
      kind: 'table',
      label: 'Compile with JDK 25 javac, run on JDK 21',
      headers: ['javac', 'class file', 'result'],
      values: [
        ['--release 17', '—', 'error: cannot find symbol  getFirst()'],
        ['--release 21', 'major 65', 'first: A-100'],
        ['--release 25', 'major 69', 'UnsupportedClassVersionError: 69.0 > 65.0'],
      ],
    },
    {
      id: 'javap',
      kind: 'code',
      filename: 'javap -v Report.class | grep major',
      label: `r21/Report.class    major version: 65
r25/Report.class    major version: 69

java -cp r25 Report   (on JDK 21)
  UnsupportedClassVersionError: Report has been compiled by a more
  recent version of the Java Runtime (class file version 69.0), this
  version of the Java Runtime only recognizes class file versions up to 65.0`,
    },
    {
      id: 'image',
      label: 'jlink: a runtime with only the modules the app needs',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'deps', label: 'jdeps', sub: 'Report needs java.base', pattern: 'service', icon: 'search' },
        { id: 'full', label: 'Full JDK 21', sub: '286 MB on disk', pattern: 'storage', icon: 'harddrive' },
        { id: 'small', label: 'jlink image', sub: '52 MB · first: A-100', pattern: 'service', icon: 'package' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'matrix', label: 'compile for…' },
    { source: 'matrix', target: 'javap', label: 'the evidence' },
    { source: 'javap', target: 'image', label: 'or ship the runtime' },
  ],
}
