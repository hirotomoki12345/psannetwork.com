function executeScript(url, button) {
    fetch(url)
        .then(response => response.text())
        .then(code => {
            const script = document.createElement('script');
            script.textContent = code;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error fetching or executing the JavaScript code:', error));

    // ボタン非表示
    button.style.display = "none";
}

// Nomaltyping ボタン
var nomaltyping = document.createElement("button");
nomaltyping.innerHTML = "タイピング";
nomaltyping.style.position = "fixed";
nomaltyping.style.top = "10px";
nomaltyping.style.right = "10px";
nomaltyping.style.zIndex = "9999";
nomaltyping.style.padding = "12px 20px";
nomaltyping.style.backgroundColor = "#3498db";
nomaltyping.style.color = "#ffffff";
nomaltyping.style.border = "none";
nomaltyping.style.borderRadius = "5px";
nomaltyping.style.cursor = "pointer";
nomaltyping.style.fontFamily = "Arial, sans-serif";
nomaltyping.style.fontSize = "14px";

document.body.appendChild(nomaltyping);

nomaltyping.addEventListener("click", function () {
    executeScript("https://raw.githubusercontent.com/hirotomoki12345/psannetwork.com/main/javasciprt/typing2.js", nomaltyping);
});

// Misstyping ボタン
var misstyping = document.createElement("button");
misstyping.innerHTML = "ミスタイピング";
misstyping.style.position = "fixed";
misstyping.style.top = "70px";
misstyping.style.right = "10px";
misstyping.style.zIndex = "9999";
misstyping.style.padding = "12px 20px";
misstyping.style.backgroundColor = "#e74c3c";
misstyping.style.color = "#ffffff";
misstyping.style.border = "none";
misstyping.style.borderRadius = "5px";
misstyping.style.cursor = "pointer";
misstyping.style.fontFamily = "Arial, sans-serif";
misstyping.style.fontSize = "14px";

document.body.appendChild(misstyping);

misstyping.addEventListener("click", function () {
    executeScript("https://raw.githubusercontent.com/hirotomoki12345/psannetwork.com/main/javasciprt/typing2-miss.js", misstyping);
});

// Bard ボタン
var bardButton = document.createElement("button");
bardButton.innerHTML = "AI応答";
bardButton.style.position = "fixed";
bardButton.style.top = "130px";
bardButton.style.right = "10px";
bardButton.style.zIndex = "9999";
bardButton.style.padding = "12px 20px";
bardButton.style.backgroundColor = "#27ae60";
bardButton.style.color = "#ffffff";
bardButton.style.border = "none";
bardButton.style.borderRadius = "5px";
bardButton.style.cursor = "pointer";
bardButton.style.fontFamily = "Arial, sans-serif";
bardButton.style.fontSize = "14px";

document.body.appendChild(bardButton);

bardButton.addEventListener("click", function () {
    (function () {
        var userQuestion = prompt("質問を入力してください:");
        if (!userQuestion.trim()) {
            alert("質問が空白です。");
            return;
        }
        var gasScriptUrl = "https://script.google.com/macros/s/AKfycbwExRsT31rA_KSmPNoWK-HP8KesKhY2jsIsI-HBNdUhEuaM2GUan40myURkqbkCVbYy/exec";
        gasScriptUrl += "?question=" + encodeURIComponent(userQuestion);
        fetch(gasScriptUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                alert(data.text);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    })();
    // ボタン非表示
});




// 新しいdiv要素を作成
var newDiv = document.createElement('div');

// 新しいdivにテキストを追加
var divText = document.createTextNode('This code was written by Psan.\n©Psannetwork.com');
newDiv.appendChild(divText);

// 新しいdivにIDを設定
newDiv.id = 'newDiv';

// スタイルを設定
newDiv.style.position = 'fixed';
newDiv.style.bottom = '0';
newDiv.style.right = '0';
newDiv.style.color = 'red';
newDiv.style.padding = '10px';
newDiv.style.margin = '10px';
newDiv.style.backgroundColor = 'black';

// 既存のbody要素に新しいdivを一番手前に追加
document.body.prepend(newDiv);

