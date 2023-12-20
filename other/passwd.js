  // IDをプロンプトでユーザーに入力してもらう
  var userID = prompt("IDを入力してください:");

  // 入力されたIDを使用してfetchリクエストを作成
  fetch('https://script.google.com/macros/s/AKfycbzP2oM-bxs564C6HLfoaa8ESWIBfpPVxtM_WQ_AuWLNgGx8wb4HPVKPqo8NT3CWNg/exec?mode=3&id=' + userID)
    .then(response => response.json())
    .then(data => {
      // fetchの結果をalertで表示
      alert('結果: ' + JSON.stringify(data));
    })
    .catch(error => {
      // エラーが発生した場合はエラーメッセージをalertで表示
      alert('エラーが発生しました: ' + error.message);
    });
