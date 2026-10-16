import type { Scene } from '@graphlearning/flow'

// §6 — TLS validation against a local HTTPS stub with a keytool-generated self-signed certificate:
// rejected by default, accepted only via a trust store holding that certificate. Real JDK 25.0.2.
export const intSecurity: Scene = {
  id: 'int-security',
  title: 'Credentials, TLS validation, untrusted input and permissions',
  flow: 'TB',
  nodes: [
    {
      id: 'tls',
      kind: 'table',
      label: 'GET https://127.0.0.1/orders/17 — self-signed CN=localhost',
      headers: ['client trusts', 'result'],
      values: [
        ['the JDK default CAs', 'SSLHandshakeException: PKIX path building failed'],
        ['trust.p12 with the server certificate', 'status 200'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'trust exactly what you mean to',
      label: `KeyStore ks = KeyStore.getInstance("PKCS12");      // trust.p12
ks.load(in, password);
TrustManagerFactory tmf = TrustManagerFactory.getInstance("PKIX");
tmf.init(ks);
ctx.init(null, tmf.getTrustManagers(), null);
HttpClient.newBuilder().sslContext(ctx).build();
// never: a TrustManager that accepts every certificate`,
    },
    {
      id: 'boundaries',
      label: 'Four boundaries',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'creds', label: 'Credentials', sub: 'from the environment or a vault', pattern: 'warn', icon: 'key' },
        { id: 'tls-leaf', label: 'TLS', sub: 'validate chain and host name', pattern: 'service', icon: 'shieldcheck' },
        { id: 'input', label: 'Untrusted input', sub: 'parameters, allow-lists', pattern: 'service', icon: 'funnel' },
        { id: 'perms', label: 'Least privilege', sub: 'a DB user that can only do its job', pattern: 'service', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'tls', target: 'code', label: 'configured by' },
    { source: 'code', target: 'boundaries' },
  ],
}
