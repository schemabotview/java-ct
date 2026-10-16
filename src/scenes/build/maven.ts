import type { Scene } from '@graphlearning/flow'

// §4 — the POM that pins the build, the phases `mvn package` ran (plugin:version from the real log),
// and the test-scoped dependency tree the BOM pulled in. Maven 3.9.11 on JDK 25.0.2.
export const bldMaven: Scene = {
  id: 'bld-maven',
  title: 'Maven lifecycle, dependency resolution and version control',
  flow: 'TB',
  nodes: [
    {
      id: 'pom',
      kind: 'code',
      filename: 'pom.xml — excerpt',
      label: `<maven.compiler.release>25</maven.compiler.release>
<dependency>                       <!-- versions from the BOM -->
  <groupId>org.junit</groupId> <artifactId>junit-bom</artifactId>
  <version>6.1.3</version> <type>pom</type> <scope>import</scope>
</dependency>
<artifactId>maven-compiler-plugin</artifactId> <version>3.14.1</version>
<artifactId>maven-surefire-plugin</artifactId> <version>3.5.4</version>`,
    },
    {
      id: 'phases',
      kind: 'memory',
      label: 'mvn package — each phase runs every phase before it',
      slots: [
        { at: 'process-resources', name: 'resources:3.3.1:resources' },
        { at: 'compile', name: 'compiler:3.14.1:compile' },
        { at: 'test-compile', name: 'compiler:3.14.1:testCompile' },
        { at: 'test', name: 'surefire:3.5.4:test', note: 'Tests run: 2, Failures: 0' },
        { at: 'package', name: 'jar:3.4.1:jar', note: 'orders-1.0-SNAPSHOT.jar' },
      ],
    },
    {
      id: 'tree',
      kind: 'code',
      filename: 'mvn dependency:tree',
      label: `shop:orders:jar:1.0-SNAPSHOT
\\- org.junit.jupiter:junit-jupiter:jar:6.1.3:test
   +- org.junit.jupiter:junit-jupiter-api:jar:6.1.3:test
   |  +- org.opentest4j:opentest4j:jar:1.3.0:test
   |  \\- org.jspecify:jspecify:jar:1.0.0:test   (+ 2 more)
   +- org.junit.jupiter:junit-jupiter-params:jar:6.1.3:test
   \\- org.junit.jupiter:junit-jupiter-engine:jar:6.1.3:test`,
    },
  ],
  edges: [
    { source: 'pom', target: 'phases', label: 'drives' },
    { source: 'phases', target: 'tree', label: 'resolved first' },
  ],
}
