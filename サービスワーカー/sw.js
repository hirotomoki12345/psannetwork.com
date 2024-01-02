self.addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // ここでDNS over HTTPSを用いてホストを解決し、リクエストを送信する処理を行う
  // 例: GoogleのDNS over HTTPSを利用する場合
  const dohEndpoint = 'https://dns.google/dns-query';
  const dohUrl = new URL(dohEndpoint);
  dohUrl.searchParams.set('name', request.url);
  dohUrl.searchParams.set('type', 'A');

  const dohResponse = await fetch(dohUrl);
  const dohData = await dohResponse.json();

  const ip = dohData.Answer[0].data;

  // 解決されたIPを使用して元のサーバーにリクエストを送信
  const proxyUrl = new URL(request.url);
  proxyUrl.host = ip;

  return fetch(proxyUrl);
}
