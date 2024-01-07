var webAppUrl = 'https://script.google.com/macros/s/AKfycbxjMc7MapfqNjQIBcr0AvIRhBfdrQMuLCB1sOPK3LXJRtYCOmVgqw5cAqudhWVwB-9g/exec';
var defaultSourceLanguage = 'en';
var defaultTargetLanguage = 'ja';

function translateText(userInput, sourceLanguage, targetLanguage, callback) {
    if (userInput !== null && userInput !== '') {
        fetch(`${webAppUrl}?text=${userInput}&source=${sourceLanguage}&target=${targetLanguage}`)
            .then(response => response.json())
            .then(result => {
                var translatedText = result.text;
                callback(null, translatedText);
            })
            .catch(error => {
                callback('エラー: ' + error, null);
            });
    } else {
        callback('テキストが入力されなかったため、翻訳をキャンセルしました。', null);
    }
}

function createTranslationUI() {
    var container = document.createElement('div');
    container.style.margin = '20px';

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'textInput');
    input.style.width = '300px';
    input.style.padding = '5px';
    input.style.marginBottom = '10px';

    var sourceLanguageSelect = document.createElement('select');
    sourceLanguageSelect.setAttribute('id', 'sourceLanguageSelect');
    var targetLanguageSelect = document.createElement('select');
    targetLanguageSelect.setAttribute('id', 'targetLanguageSelect');

    var button = document.createElement('button');
    button.textContent = '翻訳する';
    button.style.padding = '8px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.cursor = 'pointer';

    var languageOptions = ['en', 'ja', 'es', 'fr'];

    languageOptions.forEach(function (lang) {
        var option = document.createElement('option');
        option.value = lang;
        option.text = lang;
        sourceLanguageSelect.add(option);
        targetLanguageSelect.add(option.cloneNode(true));
    });

    button.addEventListener('click', function () {
        var userInput = input.value;
        var sourceLanguage = sourceLanguageSelect.value || defaultSourceLanguage;
        var targetLanguage = targetLanguageSelect.value || defaultTargetLanguage;

        button.disabled = true;
        button.style.backgroundColor = '#808080';
        button.style.cursor = 'not-allowed';

        translateText(userInput, sourceLanguage, targetLanguage, function (error, result) {
            if (error) {
                document.getElementById('resultContainer').innerHTML = 'エラーが発生しました: ' + error;
            } else {
                document.getElementById('resultContainer').innerHTML = '翻訳結果: ' + result;
            }

            button.disabled = false;
            button.style.backgroundColor = '#4CAF50';
            button.style.cursor = 'pointer';
        });
    });

    var resultContainer = document.createElement('div');
    resultContainer.setAttribute('id', 'resultContainer');
    resultContainer.style.marginTop = '20px';

    container.appendChild(input);
    container.appendChild(sourceLanguageSelect);
    container.appendChild(targetLanguageSelect);
    container.appendChild(button);
    container.appendChild(resultContainer);

    document.body.appendChild(container);
}

createTranslationUI();
