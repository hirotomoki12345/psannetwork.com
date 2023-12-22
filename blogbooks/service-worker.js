// ショートカットとして alt p を押したら、プロンプトが出てきて、実行したい JS を入力したら、それを実行する
const input = document.querySelector("input");
input.onkeydown = function(event) {
  if (event.keyCode === 112) {
    // alt p を押した
    const prompt = window.prompt("実行したい JS を入力してください。");
    if (prompt) {
      // JS を実行する
      const result = eval(prompt);
      alert(result);
    }
  }
};
