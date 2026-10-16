import type { Course } from '../types'
import { networkFoundations } from './01-network-foundations'
import { httpClient } from './02-http-client'
import { deadlinesAndRetries } from './03-deadlines-and-retries'
import { jdbcBasics } from './04-jdbc-basics'
import { transactions } from './05-transactions'
import { securityBoundaries } from './06-security-boundaries'
import { integrationTesting } from './07-integration-testing'

// Course 11 — Network and Database Integration (JAVA-COURSE-PLAN.md, chapter 11).
export const integration: Course = {
  id: 'integration',
  title: "Network and database integration",
  sections: [networkFoundations, httpClient, deadlinesAndRetries, jdbcBasics, transactions, securityBoundaries, integrationTesting],
}
