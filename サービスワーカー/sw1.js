// service-worker.js

let intervalId;

self.addEventListener('install', (event) => {
  event.waitUntil(
    self.skipWaiting()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.clients.claim()
  );

  // スクリーンショットを取得する間隔を設定（10秒）
  intervalId = setInterval(() => {
    takeScreenshotAndDownload();
  }, 10000);
});

self.addEventListener('fetch', (event) => {
  // キャッシュを制御する場合など、必要に応じてfetchイベントを処理する
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'stopScreenshotService') {
    // サービス停止のメッセージを受け取ったらスクリーンショットの取得を停止
    clearInterval(intervalId);
  }
});

async function takeScreenshotAndDownload() {
  const canvas = await getScreenshotCanvas();
  const dataURL = canvas.toDataURL('image/png');

  // ダウンロード用のリンクを生成
  const downloadLink = document.createElement('a');
  downloadLink.href = dataURL;
  downloadLink.download = `screenshot_${Date.now()}.png`;

  // リンクをクリックしてダウンロードを開始
  downloadLink.click();
}

async function getScreenshotCanvas() {
  const screenshotStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  const videoTrack = screenshotStream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(videoTrack);

  const videoElement = document.createElement('video');
  videoElement.srcObject = screenshotStream;

  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    };

    videoElement.onplay = () => {
      setTimeout(() => {
        screenshotStream.getTracks().forEach((track) => track.stop());
        videoElement.srcObject = null;
      }, 500);
    };

    videoElement.play();
  });
}
