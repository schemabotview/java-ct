import type { Scene } from '@graphlearning/flow'

// §2 — java.net.http.HttpClient against a local stub: three responses and one transport failure.
// Real JDK 25.0.2 output; port 9 has no listener.
export const intHttpClient: Scene = {
  id: 'int-http-client',
  title: 'HTTP client configuration, status/body handling and lifecycle',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'Client.java',
      label: `HttpClient client = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(2))      // reuse one client
        .build();
HttpRequest req = HttpRequest.newBuilder(URI.create(url))
        .timeout(Duration.ofSeconds(2)).GET().build();
try {
    HttpResponse<String> res = client.send(req, BodyHandlers.ofString());
    res.statusCode(); res.body();                   // a response arrived
} catch (IOException e) { ... }                     // no response at all`,
    },
    {
      id: 'results',
      kind: 'table',
      label: 'Four requests',
      headers: ['url', 'outcome'],
      values: [
        ['/orders/17', 'status 200  {"id":17,"totalCents":4249}'],
        ['/orders/99', 'status 404  {"error":"404"}'],
        ['/orders/boom', 'status 503  {"error":"503"}'],
        ['127.0.0.1:9/orders/17', 'java.net.ConnectException'],
      ],
    },
    {
      id: 'kinds',
      label: 'Two different kinds of failure',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'status-fail', label: 'Unsuccessful status', sub: 'the server answered: 404, 503', pattern: 'warn', icon: 'ban' },
        { id: 'transport-fail', label: 'Transport failure', sub: 'no answer: an IOException', pattern: 'warn', icon: 'plug' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'results', label: 'send' },
    { source: 'results', target: 'kinds' },
  ],
}
