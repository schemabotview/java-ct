import type { Section } from '../types'

export const testsAndCi: Section = {
  id: 'tests-and-ci',
  title: "Automated tests, configuration, logging and CI build evidence",
  scene: 'bld-ci',
  focus: 'workflow',
  slide: `## Builds as evidence

A clean build on **someone else's machine** is evidence that the project does not depend on yours. Continuous integration makes that automatic.

### What a build leaves behind
- Test reports in \`target/surefire-reports\`, as text and XML
- The artifact, and a log naming every tool version
- Keep them: they explain a failure after the fact

### A CI job, minimally
- Check out, install a **pinned** JDK, run \`mvn -B verify\`
- Run on every push and pull request
- Upload the test reports, pass or fail

### Configuration
- Defaults ship in the jar; overrides arrive at launch
- Secrets come from the environment — never the jar, never the log`,
  narration:
    "A build that passes on your laptop proves that it passes on your laptop. A build that passes on a clean machine, from a fresh checkout, with a pinned JDK, proves the project does not secretly depend on something only you have. Continuous integration runs that clean build automatically on every push and pull request. Look at what a build leaves behind. Surefire writes a report per test class, in plain text and XML. The jar is the artifact. The log records every plugin version and every phase. Keep them, because when a build fails at two in the morning, they are the evidence that explains why. The workflow on the left is a minimal illustration of a CI job, modelled on the deploy workflow in this very repository: check out the code, install Java twenty-five, run Maven verify in batch mode, and upload the test reports whether the build passed or failed. Configuration follows the same thinking. Sensible defaults ship inside the jar, overrides arrive at launch, and secrets come from the environment, never from the jar or the logs.",
}
