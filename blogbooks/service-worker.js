// service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetching:', event.request.url);
});

self.addEventListener('message', (event) => {
  console.log('Message received:', event.data);

  if (event.data.action === 'addTextElement') {
    // メッセージを送信したページに応答
    event.source.postMessage({
      action: 'textElementAdded',
      success: true
    });

    // クライアントにメッセージを送信
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          action: 'addTextElement',
          text: event.data.text
        });
      });
    });
  }
});
