import type { Scene } from '@graphlearning/flow'

// §4 — Europe/London's spring-forward gap on 2026-03-29, a calendar day that is 23 hours long,
// and a cutoff rule tested with fixed clocks. Real JDK 25.0.2 output.
export const bndTime: Scene = {
  id: 'bnd-time',
  title: 'Dates, instants, time zones, durations and clocks',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Four kinds of time value',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'instant', label: 'Instant', sub: 'a point on the UTC line', pattern: 'service', icon: 'clock' },
        { id: 'local', label: 'LocalDateTime', sub: 'wall clock, no zone', pattern: 'warn', icon: 'calendar' },
        { id: 'zoned', label: 'ZonedDateTime', sub: 'wall clock + rules', pattern: 'service', icon: 'globe' },
        { id: 'duration', label: 'Duration / Period', sub: 'hours vs calendar days', pattern: 'network', icon: 'history' },
      ],
    },
    {
      id: 'dst',
      kind: 'code',
      filename: 'Europe/London, 2026-03-29: clocks jump 01:00 → 02:00',
      label: `LocalDateTime.of(2026, 3, 29, 1, 30).atZone(london)
    2026-03-29T02:30+01:00[Europe/London]    // 01:30 never happened

ZonedDateTime before = 2026-03-28T12:00 London
before.plusDays(1)     2026-03-29T12:00+01:00
before.plusHours(24)   2026-03-29T13:00+01:00
HOURS.between(before, before.plusDays(1))   23`,
    },
    {
      id: 'clock',
      kind: 'code',
      filename: 'inject the clock, test the rule',
      label: `static boolean shipsToday(Clock clock) {
    return LocalTime.now(clock).isBefore(LocalTime.of(14, 0));
}
shipsToday(Clock.fixed(12:59Z, london))   true    // 13:59 BST
shipsToday(Clock.fixed(13:01Z, london))   false   // 14:01 BST`,
    },
  ],
  edges: [
    { source: 'kinds', target: 'dst', label: 'where they differ' },
    { source: 'dst', target: 'clock' },
  ],
}
