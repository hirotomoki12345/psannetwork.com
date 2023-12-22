// service-worker.js

self.addEventListener('install', (event) => {
  // インストール時に実行される処理
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  // アクティブ化時に実行される処理
  console.log('Service Worker activated');
});

self.addEventListener('fetch', (event) => {
  // フェッチ時に実行される処理
  console.log('Fetching:', event.request.url);
});

self.addEventListener('message', (event) => {
  // メッセージ受信時に実行される処理
  console.log('Message received:', event.data);

  // メッセージの内容によって処理を行う
  if (event.data.action === 'addTextElement') {
    addTextElement(event.data.text);
  }
});

// ページにテキスト要素を追加する関数
function addTextElement(text) {
  const element = document.createElement('div');
  element.style.position = 'fixed';
  element.style.bottom = '10px';
  element.style.left = '10px';
  element.textContent = text;

  document.body.appendChild(element);
}
