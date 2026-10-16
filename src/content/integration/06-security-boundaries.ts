import type { Section } from '../types'

export const securityBoundaries: Section = {
  id: 'security-boundaries',
  title: "Credentials, TLS validation, untrusted input and permissions",
  scene: 'int-security',
  focus: 'tls',
  slide: `## Trust nothing by default

Every integration point crosses a **trust boundary**: secrets travel, servers must be verified, and input may be hostile.

### TLS proves who you are talking to
- The self-signed server is **rejected** by the default trust store
- Trusting it means adding **its** certificate to a trust store you control
- Never install a trust manager that accepts everything

### Credentials
- From the environment or a secret store, never source or logs
- Rotate them; give each service its own
- Redact them from exceptions and logs

### Input and permissions
- Bind values, allow-list names — as in the JDBC section
- Connect as a database user that can do **only** its job`,
  narration:
    "Every point where your program talks to something else is a trust boundary, and the safe default is to trust nothing you have not verified. Start with TLS. Its job is not only encryption; it proves that you are talking to the server you meant to reach. Here a local HTTPS server presents a certificate it signed itself. The JDK's default trust store has never heard of it, so the handshake fails with a PKIX path building error. That failure is the protection working. The right response is to decide deliberately whom to trust: put that server's certificate into a trust store you control and configure the client with it, and the same request succeeds. The wrong response, often copied from the internet, is a trust manager that accepts every certificate, which silently removes the protection for every connection. Credentials belong in the environment or a secret store, never in source code or logs. Input from outside is bound or allow-listed. And the database account should have only the permissions its job requires.",
}
