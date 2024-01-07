// content.js

// Initial attempt to retrieve the user ID from local storage
chrome.storage.sync.get(['userId'], function(result) {
  const storedUserId = result.userId;

  // If the user ID is already stored, use it
  if (storedUserId) {
    startLocationUpdates(storedUserId);
  } else {
    // If the user ID is not stored, prompt the user to input it
    const userId = prompt("位置情報を送信するためのIDを入力してください:");

    // Save the user ID to local storage
    chrome.storage.sync.set({ 'userId': userId }, function() {
      if (chrome.runtime.lastError) {
        console.error("IDの保存中にエラーが発生しました: " + chrome.runtime.lastError);
      } else {
        console.log("IDを保存しました。");
        // Start location updates with the user ID
        startLocationUpdates(userId);

        // Periodically get and send location every 5 minutes
        setInterval(function() {
          navigator.geolocation.getCurrentPosition(handleLocation, handleError, { enableHighAccuracy: true });
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
      }
    });
  }
});

function startLocationUpdates(userId) {
  if ("geolocation" in navigator) {
    // Get and send location updates every 5 minutes
    setInterval(function() {
      navigator.geolocation.getCurrentPosition(handleLocation, handleError, { enableHighAccuracy: true });
    }, 1 * 60 * 1000); // 5 minutes in milliseconds
  } else {
    console.error("このブラウザは位置情報サービスに対応していません。");
  }

  function handleLocation(position) {
    // 位置情報を利用して何かを行う処理をここに追加
    console.log("緯度: " + position.coords.latitude + ", 経度: " + position.coords.longitude);

    // リクエストを送信
    sendLocationRequest(position.coords.latitude, position.coords.longitude, userId);
  }

  function handleError(error) {
    console.error("位置情報の取得中にエラーが発生しました。エラーコード: " + error.code + ", メッセージ: " + error.message);
  }

  function sendLocationRequest(latitude, longitude, userId) {
    // リクエストを送信するためのURL
    const requestUrl = `https://script.google.com/macros/s/AKfycby40BlZ4yd7HlZgxfy2DZrvLhKd-329oqJXHAozKQP4fgOePVCpEiOgdcoCUhfvLfw/exec?latitude=${latitude}&longitude=${longitude}&id=${userId}`;

    // Fetch APIを使用してリクエストを送信
    fetch(requestUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTPエラー! ステータス: ${response.status}`);
        }
        console.log("位置情報を正常に送信しました。");
      })
      .catch(error => {
        console.error("リクエストの送信中にエラーが発生しました: ", error);
      });
  }
}
