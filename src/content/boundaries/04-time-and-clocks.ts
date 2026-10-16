import type { Section } from '../types'

export const timeAndClocks: Section = {
  id: 'time-and-clocks',
  title: "Dates, instants, time zones, durations and injectable clocks",
  scene: 'bnd-time',
  focus: 'dst',
  slide: `## Time has more than one meaning

An **instant** is a point on the timeline. A **local** date-time is what a wall clock shows. Time zones connect them — with rules that change.

### A spring-forward day in London
- 01:30 on 29 March 2026 **never happened**; Java shifts it to 02:30
- \`plusDays(1)\` keeps the wall-clock time: 12:00 next day
- \`plusHours(24)\` keeps elapsed time: 13:00
- That calendar day was **23 hours** long

### Choose the type by the question
- Store and compare moments as \`Instant\`
- Show and schedule in a \`ZonedDateTime\` for a named zone

### Inject the clock
- \`shipsToday(Clock)\` makes "now" a parameter
- Fixed clocks test 13:59 and 14:01 without waiting`,
  narration:
    "Time sounds like one thing, but software has to keep two meanings apart. An instant is a single point on the global timeline. A local date-time is what a wall clock shows somewhere, without saying where. A time zone connects them, using rules that include daylight saving changes. Take London on the twenty-ninth of March twenty twenty-six, when the clocks jump from one to two in the morning. Half past one simply never happened there, so Java moves it to half past two. Start at noon the day before and add one day: you get noon, because adding days keeps the wall-clock time. Add twenty-four hours instead and you get one o'clock, because that day was only twenty-three hours long. Neither is wrong; they answer different questions. Store and compare moments as instants, and schedule and display them in a named zone. Finally, code that asks what time it is now is hard to test. Pass a Clock in, and a fixed clock can test one minute before and after the cutoff instantly.",
}
