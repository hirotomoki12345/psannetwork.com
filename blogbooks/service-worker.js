// ショートカットとして alt p を押したら、プロンプトが出てきて、実行したい JS を入力したら、それを実行する
document.addEventListener("keydown", function(event) {
  // Alt + P を押したかを確認
  if (event.altKey && event.keyCode === 80) {
    // プロンプトを表示して実行したい JS を入力
    const codeToExecute = window.prompt("実行したい JS を入力してください。");

    if (codeToExecute) {
      try {
        // 入力されたコードを実行
        const result = new Function(codeToExecute)();
        alert(result);
      } catch (error) {
        console.error("エラーが発生しました:", error);
        alert("エラーが発生しました。コンソールを確認してください。");
      }
    }
  }
});
