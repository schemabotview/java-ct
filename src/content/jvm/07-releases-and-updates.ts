import type { Section } from '../types'

export const releasesAndUpdates: Section = {
  id: 'releases-and-updates',
  title: "Compatibility, dependency updates, security and controlled releases",
  scene: 'jvm-releases',
  focus: 'scans',
  slide: `## Upgrades without surprises

A running application keeps changing underneath you: **JDK updates**, **dependency updates** and **security fixes**. Find what will break before it does.

### Ask the JDK
- \`javac\` warns about internal proprietary API: \`sun.misc.Unsafe\`
- \`jdeprscan --for-removal\` flags \`Runtime.runFinalization\`
- \`jdeps --jdk-internals\` lists every internal dependency
- Tools report what they detect — not a full guarantee

### Keep up deliberately
- Stay on a supported JDK; apply its security updates
- Update dependencies in small, tested steps

### Release in stages
- Pin and record every version; scan for known vulnerabilities
- Canary first, watch the evidence, and keep a tested **rollback**`,
  narration:
    "An application is never finished, because the ground under it keeps moving. New JDK releases deprecate and eventually remove APIs, libraries publish updates, and security fixes arrive that you must apply quickly. The cheapest time to discover a problem is before the upgrade, and the JDK can help. Compiling this small legacy class, javac warns that sun dot misc dot Unsafe is an internal proprietary API that may be removed. jdeprscan, asked for APIs deprecated for removal, flags Runtime dot runFinalization. And jdeps lists every dependency on JDK internals, naming the module they come from. Treat these tools as detectors rather than guarantees: here jdeprscan reported only one of the deprecated calls in the file. Staying current is a habit. Run on a supported JDK and apply its updates, and move dependencies forward in small, tested steps rather than giant leaps. Then release in stages: pin and record every version, scan for known vulnerabilities, roll out to a small canary first, watch the evidence, and keep a rollback that you have actually tested.",
}
