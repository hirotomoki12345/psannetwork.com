// ServiceWorkerのインスタンスを作成する
const sw = new ServiceWorker();

// リクエストを送信する
sw.addEventListener("fetch", async event => {
  // リクエストのオプションを設定する
  const options = {
    headers: {
      // 元のHostをRefererヘッダに書き込む
      "Referer": event.request.headers.get("Host")
    }
  };

  // リクエストを送信する
  const response = await event.waitUntil(
    fetch(event.request.url, options)
  );

  // リクエストの応答を処理する
  // ...
});
