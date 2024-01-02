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
      console.error(`Unexpected response Content-Type: ${contentType}`);
      // Return an error response with details
      return new Response(`Unexpected response Content-Type: ${contentType}`, { status: 500 });
    }
  } catch (error) {
    console.error('Error in handleRequest:', error);
    // Return an error response with details
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
