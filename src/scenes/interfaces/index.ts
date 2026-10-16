import type { Scene } from '@graphlearning/flow'
import { ifcContracts } from './contracts'
import { ifcDispatch } from './dispatch'
import { ifcAbstract } from './abstract'
import { ifcCompInherit } from './composition-inheritance'
import { ifcSealed } from './sealed'
import { ifcNested } from './nested'
import { ifcAnnotations } from './annotations'
import { ifcEvolution } from './evolution'

// Course 4 — Interfaces, Variation and Reusable Design. Spread into src/scenes/index.ts.
export const interfacesScenes: Scene[] = [ifcContracts, ifcDispatch, ifcAbstract, ifcCompInherit, ifcSealed, ifcNested, ifcAnnotations, ifcEvolution]
