document.addEventListener('keydown', function (event) {
  if (event.altKey && event.key === 'o') {
    toggleInputVisibility();
  }
});

var userInput = createInputElement('userInput', '10px', '16px', 'none');
var resultButton = createButtonElement('resultButton', '結果表示', '10px', '16px', '#4caf50', 'white', 'none');
var resultElement = createDivElement('result', '20px', '20px', '18px', '1px solid #dddddd', '#f9f9f9');

resultButton.style.display = 'none';

function toggleInputVisibility() {
  userInput.style.display = (userInput.style.display === 'none') ? 'block' : 'none';
  resultButton.style.display = (resultButton.style.display === 'none') ? 'block' : 'none';
  resultElement.style.display = (resultElement.style.display === 'none') ? 'block' : 'none';

  if (userInput.style.display === 'block') {
    userInput.focus();
  }
}

function submitQuestion(question) {
  if (!question.trim()) {
    alert('質問が空白です。');
    return;
  }

  // ボタンを無効にする
  resultButton.disabled = true;
  // ボタンのテキストを変更
  resultButton.innerText = '処理中...';
  // ボタンの背景色を変更
  resultButton.style.backgroundColor = '#808080';

  var gasScriptUrl = 'https://script.google.com/macros/s/AKfycbwExRsT31rA_KSmPNoWK-HP8KesKhY2jsIsI-HBNdUhEuaM2GUan40myURkqbkCVbYy/exec';
  gasScriptUrl += '?question=' + encodeURIComponent(question);

  fetch(gasScriptUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function (data) {
      resultElement.innerText = data.text;
    })
    .catch(function (error) {
      console.error('There has been a problem with your fetch operation:', error);
    })
    .finally(function () {
      // ボタンを有効にし、元の状態に戻す
      resultButton.disabled = false;
      resultButton.innerText = '結果表示';
      resultButton.style.backgroundColor = '#4caf50';
    });
}

function createInputElement(id, padding, fontSize, display) {
  var inputElement = document.getElementById(id);
  if (!inputElement) {
    inputElement = document.createElement('input');
    inputElement.setAttribute('id', id);
    document.body.appendChild(inputElement);
  }
  inputElement.style.padding = padding;
  inputElement.style.fontSize = fontSize;
  inputElement.style.display = display;
  return inputElement;
}

function createButtonElement(id, text, padding, fontSize, backgroundColor, color, display) {
  var buttonElement = document.getElementById(id);
  if (!buttonElement) {
    buttonElement = document.createElement('button');
    buttonElement.setAttribute('id', id);
    buttonElement.innerText = text;
    buttonElement.addEventListener('click', function () {
      submitQuestion(userInput.value);
    });
    document.body.appendChild(buttonElement);
  }
  buttonElement.style.padding = padding;
  buttonElement.style.fontSize = fontSize;
  buttonElement.style.backgroundColor = backgroundColor;
  buttonElement.style.color = color;
  buttonElement.style.border = 'none';
  buttonElement.style.cursor = 'pointer';
  buttonElement.style.display = display;
  return buttonElement;
}

function createDivElement(id, marginTop, padding, fontSize, border, backgroundColor) {
  var divElement = document.getElementById(id);
  if (!divElement) {
    divElement = document.createElement('div');
    divElement.setAttribute('id', id);
    document.body.appendChild(divElement);
  }
  divElement.style.marginTop = marginTop;
  divElement.style.padding = padding;
  divElement.style.fontSize = fontSize;
  divElement.style.border = border;
  divElement.style.backgroundColor = backgroundColor;
  divElement.style.display = 'none';
  return divElement;
}
