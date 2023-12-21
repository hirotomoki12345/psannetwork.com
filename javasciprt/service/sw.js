// Alt + O キーが押されたときの処理を追加
window.addEventListener('keydown', (event) => {
  if (event.altKey && event.keyCode === 79) {
    executeScript();
  }
});

function executeScript() {
  try {
    var code = document.getElementById('customScript').value;
    eval(code);
  } catch (error) {
    alert("エラー: " + error.message);
  }
}

(function () {
  var body = document.body;

  var style = document.createElement("style");
  style.textContent = 'body,html{height:100%;margin:0;}input[type="text"]{width:100%;height:100%;font-size:18px;padding:10px;box-sizing:border-box;}button{display:block;margin:10px auto;font-size:18px;}';
  body.appendChild(style);

  var input = document.createElement("input");
  input.type = "text";
  input.id = "customScript"; // 追加：入力フィールドにIDを設定
  input.placeholder = "JavaScriptコードを入力してください";
  body.appendChild(input);

  var button = document.createElement("button");
  button.textContent = "実行";
  button.addEventListener("click", executeScript); // 変更：実行ボタンがクリックされた時に関数を呼ぶ
  body.appendChild(button);
})();
