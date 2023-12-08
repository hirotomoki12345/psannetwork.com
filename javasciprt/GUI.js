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
        var gasScriptUrl = "https://script.google.com/macros/s/AKfycbxIM9Wd-OT5b12miCYQDOnv6eIb1M24uQRQyNv2cdfBB6yrhJ8_N4IDzzXzfyRU9Rtg/exec";
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
