<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JavaScript実行</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    label {
      font-size: 1.2em;
    }
    textarea {
      width: 100%;
      margin-bottom: 10px;
    }
    button {
      padding: 10px;
      font-size: 1em;
      cursor: pointer;
    }
    #output {
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <label for="jsCode">JavaScriptコード:</label>
  <br>
  <textarea id="jsCode" rows="10" placeholder="ここにJavaScriptコードを入力"></textarea>
  <br>
  <button onclick="executeCode()">実行</button>
  <br>
  <h2>実行結果:</h2>
  <div id="output"></div>

  <script>
    function executeCode() {
      var jsCode = document.getElementById('jsCode').value;

      try {
        var result = eval(jsCode);
        document.getElementById('output').innerHTML = '実行結果: ' + result;
      } catch (error) {
        document.getElementById('output').innerHTML = 'エラー: ' + error.message;
      }
    }
  </script>

</body>
</html>
