// service-worker.js

self.addEventListener('install', event => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
  // Handle fetch events if needed
});

self.addEventListener('message', event => {
  if (event.data && event.data.action === 'createIframe') {
    // 新しい iframe を作成
    var iframe = new DOMParser().parseFromString(
      '<iframe src="https://google.com?igu=1" width="600" height="400" frameborder="0"></iframe>',
      'text/html'
    ).body.firstChild;

    // 作成した iframe をブラウザに表示
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ action: 'showIframe', iframeHTML: iframe.outerHTML });
      });
    });
  }
});
