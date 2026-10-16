import type { Course } from '../types'
import { unicodeAndEncodings } from './01-unicode-and-encodings'
import { parsingAndLocale } from './02-parsing-and-locale'
import { bigdecimalAndRounding } from './03-bigdecimal-and-rounding'
import { timeAndClocks } from './04-time-and-clocks'
import { pathsAndFiles } from './05-paths-and-files'
import { streamsAndBuffering } from './06-streams-and-buffering'
import { formatsAndSerialization } from './07-formats-and-serialization'
import { atomicWrites } from './08-atomic-writes'

// Course 8 — Text, Time, Files and Data Boundaries (JAVA-COURSE-PLAN.md, chapter 8).
export const boundaries: Course = {
  id: 'boundaries',
  title: "Text, time, files and data boundaries",
  sections: [unicodeAndEncodings, parsingAndLocale, bigdecimalAndRounding, timeAndClocks, pathsAndFiles, streamsAndBuffering, formatsAndSerialization, atomicWrites],
}
