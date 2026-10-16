import type { Section } from '../types'

export const httpClient: Section = {
  id: 'http-client',
  title: "HTTP client configuration, status/body handling and lifecycle",
  scene: 'int-http-client',
  focus: 'kinds',
  slide: `## Two kinds of failure

\`java.net.http.HttpClient\` sends a request and returns a response. Whether a **response arrived** and whether it was **successful** are different questions.

### Configure once, reuse
- Build one client with a **connect timeout**; share it
- Give each request its own **timeout**

### A response arrived
- 200 carries the order; 404 and 503 are **also** responses
- \`send\` does not throw for them — **check the status yourself**
- Map each status to a domain outcome: not found, try later

### No response at all
- Nothing listening on port 9: \`ConnectException\`
- Timeouts and resets are \`IOException\`s too
- The request may or may not have reached the server`,
  narration:
    "The JDK's own HTTP client sends a request and gives you back a response, and it is worth being precise about what can go wrong. Build one client, configured with a connect timeout, and reuse it, because it manages connections for you. Give each request its own timeout as well. Now look at the four requests. The first returns two hundred with the order. The second and third return four hundred and four and five hundred and three. Those are not exceptions: the server answered, and send returns a perfectly normal response object. If your code only reads the body, it will happily parse an error message as if it were an order. So check the status and map each one to a meaning in your domain: not found, or try again later. The fourth request goes to a port where nothing is listening, and there is no response at all, only a ConnectException. Timeouts and dropped connections end the same way, as IOExceptions. In those cases you cannot even be sure whether the request reached the server, which is the next section's problem.",
}
