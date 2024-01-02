self.addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const dohEndpoint = 'https://dns.google/dns-query';
  const dohUrl = new URL(dohEndpoint);
  dohUrl.searchParams.set('name', request.url);
  dohUrl.searchParams.set('type', 'A');

  try {
    const dohResponse = await fetch(dohUrl);

    if (!dohResponse.ok) {
      throw new Error(`DNS over HTTPS request failed with status ${dohResponse.status}`);
    }

    const contentType = dohResponse.headers.get('Content-Type');
    
    if (contentType && contentType.includes('application/json')) {
      const dohData = await dohResponse.json();
      const ip = dohData.Answer[0].data;

      const proxyUrl = new URL(request.url);
      proxyUrl.host = ip;

      const modifiedRequest = new Request(proxyUrl, {
        method: request.method,
        headers: new Headers({
          ...request.headers,
          'X-Original-Host': request.url.hostname
        }),
        mode: 'cors',
        cache: 'default',
        body: request.body
      });

      const response = await fetch(modifiedRequest);

      const originalHost = response.headers.get('X-Original-Host');
      if (originalHost) {
        modifiedRequest.headers.set('Host', originalHost);
      }

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: modifiedRequest.headers
      });
    } else {
      throw new Error(`Unexpected response Content-Type: ${contentType}`);
    }
  } catch (error) {
    console.error('Error in handleRequest:', error);
    // Handle the error as needed, e.g., return an error response
    return new Response('Error processing request', { status: 500 });
  }
}

