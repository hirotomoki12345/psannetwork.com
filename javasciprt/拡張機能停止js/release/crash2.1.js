var confirmation = prompt("実行しますか？ (y/n)");

if (confirmation.toLowerCase() === 'y') {
alert("inject!");


const largeImage = new Image();
largeImage.src = "https://github.com/hirotomoki12345/psannetwork.com/blob/main/_6e6ccb16-2e38-4160-9507-a286d8e55b29.jpeg?raw=true";
largeImage.onload = function() {
  // 画像の読み込みに時間がかかる処理を追加する
  for (let i = 0; i < 10000; i++) {
    Math.pow(Math.PI, Math.random());
  }
};

// 無限ループを開始する
setTimeout(function() {
  while (true) {
    // 画像を1000ミリ秒ごとに読み込む
    document.body.appendChild(largeImage.cloneNode(true));
    setTimeout(function() {
      largeImage.onload();
    }, 1000);
  }
}, 2000);

} else {
    console.log("処理はキャンセルされました。");
}
//©Psan network
