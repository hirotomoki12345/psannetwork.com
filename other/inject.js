// inject.js

(function() {
  var body = document.body;
  var style = document.createElement("style");
  style.textContent = 'body,html{height:100%;margin:0;}input[type="text"]{width:100%;height:100%;font-size:18px;padding:10px;box-sizing:border-box;}button{display:block;margin:10px auto;font-size:18px;}';
  body.appendChild(style);

  var input = document.createElement("input");
  input.type = "text";
  input.placeholder = "JavaScriptコードを入力してください";
  body.appendChild(input);

  var button = document.createElement("button");
  button.textContent = "実行";
  button.addEventListener("click", function() {
    try {
      var code = input.value;
      eval(code);
    } catch (error) {
      alert("エラー: " + error.message);
    }
  });
  body.appendChild(button);
})();
