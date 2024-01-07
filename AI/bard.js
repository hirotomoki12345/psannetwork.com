var scriptUrl = "https://script.google.com/macros/s/AKfycbyG-vsxtqXBBN4qn-IxBpIDpcz4qFIloAhUGP3fTImzwlMTIhCZikM7eJJ--EMiqm0/exec";

var inputElement = document.createElement("input");
inputElement.type = "text";
inputElement.placeholder = "質問を入力してください";
inputElement.id = "questionInput";
inputElement.style.padding = "8px";
inputElement.style.marginRight = "10px";
inputElement.style.border = "1px solid #ccc";
inputElement.style.borderRadius = "5px";
inputElement.style.flex = "1";

var submitButton = document.createElement("button");
submitButton.textContent = "質問する";
submitButton.id = "submitButton";
submitButton.style.padding = "10px";
submitButton.style.backgroundColor = "#4CAF50";
submitButton.style.color = "white";
submitButton.style.border = "none";
submitButton.style.borderRadius = "5px";
submitButton.style.cursor = "pointer";

var displayElement = document.createElement("div");
displayElement.id = "answerDisplay";
displayElement.style.marginTop = "10px";
displayElement.style.padding = "15px";
displayElement.style.border = "1px solid #ccc";
displayElement.style.borderRadius = "5px";

var formContainer = document.createElement("div");
formContainer.style.display = "flex";
formContainer.style.alignItems = "center";
formContainer.style.justifyContent = "center";

formContainer.appendChild(inputElement);
formContainer.appendChild(submitButton);

var psanbardElement = document.getElementById("psanbard");
psanbardElement.appendChild(formContainer);
psanbardElement.appendChild(displayElement);

submitButton.addEventListener("click", function() {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "#ddd";

    var inputValue = inputElement.value;
    var lastQuestionDate = localStorage.getItem("lastQuestionDate");
    var currentDate = new Date().getTime();

    if (!lastQuestionDate || (currentDate - lastQuestionDate > 60000)) {
        var requestUrl = scriptUrl + "?question=" + encodeURIComponent(inputValue);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", requestUrl, true);

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                var responseData = JSON.parse(xhr.responseText);
                displayElement.innerHTML = "<p>コード: " + responseData.code + "</p><p>テキスト: " + responseData.text + "</p>";
                localStorage.setItem("lastQuestionDate", currentDate);
            } else {
                console.error('エラー:', xhr.statusText);
            }

            submitButton.disabled = false;
            submitButton.style.backgroundColor = "#4CAF50";
        };

        xhr.onerror = function() {
            console.error('ネットワークエラー');
            submitButton.disabled = false;
            submitButton.style.backgroundColor = "#4CAF50";
        };

        xhr.send();
    } else {
        alert("前回の質問から1分以上経過するまで質問を送信できません。");
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "#4CAF50";
    }
});
