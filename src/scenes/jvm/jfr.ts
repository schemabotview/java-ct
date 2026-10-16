import type { Scene } from '@graphlearning/flow'

// §5 — JDK Flight Recorder on the Garbage program: what the recording contains, one event, the
// hot-methods view, and what recording cost here. Real JDK 25.0.2 output; the wall-clock times are
// three runs of a ~0.1 s program, so JFR start-up dominates them.
export const jvmJfr: Scene = {
  id: 'jvm-jfr',
  title: 'JFR, thread dumps, heap evidence and diagnostic costs',
  flow: 'TB',
  nodes: [
    {
      id: 'tools',
      label: 'Evidence the JDK can produce',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'jfr-tool', label: 'JFR', sub: 'events over time', pattern: 'service', icon: 'barchart' },
        { id: 'thread-dump', label: 'Thread dump', sub: 'jstack, jcmd Thread.print', pattern: 'service', icon: 'scroll' },
        { id: 'heap-evidence', label: 'Heap evidence', sub: 'class histogram, heap dump', pattern: 'service', icon: 'database' },
      ],
    },
    {
      id: 'recording',
      kind: 'code',
      filename: 'java -XX:StartFlightRecording=filename=rec.jfr,settings=profile …',
      label: `$ jfr summary rec.jfr                   # 241,485 bytes
 jdk.ObjectAllocationSample     60
 jdk.GarbageCollection           7
 jdk.ExecutionSample             5

$ jfr print --events jdk.GarbageCollection rec.jfr
jdk.GarbageCollection { duration = 6.40 ms  name = "G1New"
                        cause = "G1 Evacuation Pause" }

$ jfr view hot-methods rec.jfr
Garbage.main(String[])                         3  60.00%`,
    },
    {
      id: 'cost',
      kind: 'table',
      label: 'Evidence is not free — wall clock, same program',
      headers: ['run', 'plain', 'with JFR profile'],
      values: [
        ['1', '193 ms', '565 ms'],
        ['2', '122 ms', '526 ms'],
        ['3', '127 ms', '526 ms'],
      ],
    },
  ],
  edges: [
    { source: 'tools', target: 'recording', label: 'for example' },
    { source: 'recording', target: 'cost' },
  ],
}
