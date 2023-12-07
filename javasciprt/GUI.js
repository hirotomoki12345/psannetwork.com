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

nomaltyping.addEventListener("click", function() {
    fetch("https://raw.githubusercontent.com/hirotomoki12345/psannetwork.com/main/javasciprt/typing2.js")
        .then(response => response.text())
        .then(code => {
            const script = document.createElement('script');
            script.textContent = code;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error fetching or executing the JavaScript code:', error));
    
    // ボタン非表示
    nomaltyping.style.display = "none";
    misstyping.style.display = "none";
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

misstyping.addEventListener("click", function() {
    fetch("https://raw.githubusercontent.com/hirotomoki12345/psannetwork.com/main/javasciprt/typing2-miss.js")
        .then(response => response.text())
        .then(code => {
            const script = document.createElement('script');
            script.textContent = code;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error fetching or executing the JavaScript code:', error));
    
    // ボタン非表示
    nomaltyping.style.display = "none";
    misstyping.style.display = "none";
});
