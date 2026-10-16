import type { Scene } from '@graphlearning/flow'

// §7 — finding upgrade risks before they become outages: jdeprscan and jdeps on a small legacy class.
// Real JDK 25.0.2 output. Note jdeprscan reported only runFinalization here.
export const jvmReleases: Scene = {
  id: 'jvm-releases',
  title: 'Compatibility, dependency updates, security and controlled releases',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Legacy.java',
      label: `Integer boxed = new Integer(4249);                  // deprecated
Runtime.getRuntime().runFinalization();             // deprecated for removal
Field f = sun.misc.Unsafe.class.getDeclaredField("theUnsafe");   // JDK internal`,
    },
    {
      id: 'scans',
      kind: 'code',
      filename: 'ask the JDK what will break',
      label: `$ javac Legacy.java
warning: Unsafe is internal proprietary API and may be removed in a future release

$ jdeprscan --for-removal --class-path out Legacy
class Legacy uses deprecated method java/lang/Runtime::runFinalization()V (forRemoval=true)

$ jdeps --jdk-internals out
Legacy -> sun.misc.Unsafe        JDK internal API (jdk.unsupported)`,
    },
    {
      id: 'release',
      label: 'A controlled release',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'pin', label: 'Pin and record', sub: 'JDK build, every dependency', pattern: 'service', icon: 'tag' },
        { id: 'scan', label: 'Scan', sub: 'deprecations, internals, CVEs', pattern: 'service', icon: 'search' },
        { id: 'stage', label: 'Stage', sub: 'canary before everyone', pattern: 'network', icon: 'gauge' },
        { id: 'rollback', label: 'Roll back', sub: 'a tested way back', pattern: 'warn', icon: 'history' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'scans' },
    { source: 'scans', target: 'release', label: 'then release by' },
  ],
}
