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

self.addEventListener('keydown', (event) => {
  if (event.altKey && event.keyCode === 79) {
    // Alt + O が押されたらメッセージをクライアントに送信
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage('Alt + O が押されました！');
      });
    });
  }
});
