import type { Scene } from '@graphlearning/flow'
import { firstProgramScenes } from './first-program'
import { valuesScenes } from './values'
import { objectsScenes } from './objects'
import { interfacesScenes } from './interfaces'
import { failuresScenes } from './failures'
import { collectionsScenes } from './collections'
import { streamsScenes } from './streams'
import { boundariesScenes } from './boundaries'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...firstProgramScenes, ...valuesScenes, ...objectsScenes, ...interfacesScenes, ...failuresScenes, ...collectionsScenes, ...streamsScenes, ...boundariesScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
