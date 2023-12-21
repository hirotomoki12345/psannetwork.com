// sw.js

self.addEventListener('install', (event) => {
  console.log('Service Workerがインストールされました');
});

self.addEventListener('activate', (event) => {
  console.log('Service Workerがアクティブになりました');
});

self.addEventListener('fetch', (event) => {
  console.log('リクエストがフェッチされました: ', event.request.url);
});

self.addEventListener('message', (event) => {
  if (event.data === 'executeScript') {
    // ウェブページにメッセージを送信
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage('Alt + O が押されました！');
      });
    });
  }
});

// サービスワーカーがアクティブになったときに特定のページにメッセージを送信
self.addEventListener('activate', (event) => {
  self.clients.matchAll({ type: 'window' }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage('executeScript');
    });
  });
});
