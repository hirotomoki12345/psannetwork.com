var style = document.createElement('style');
style.innerHTML = `
  #questionForm {
    position: fixed;
    bottom: 40px;
    left: 40px;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    width: 300px;
    max-height: 50vh;
    overflow-y: auto;
    display: none;
  }

  #questionForm input {
    margin-bottom: 15px;
    padding: 8px;
    width: 100%;
  }

  #questionForm button {
    padding: 10px 15px;
    cursor: pointer;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 4px;
  }

  #questionForm button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  #questionForm #errorMessage {
    color: red;
    margin-top: 15px;
  }

  #questionForm #resultContainer {
    margin-top: 15px;
    color: #333;
  }

  .loading {
    display: inline-block;
    margin-left: 5px;
    border: 3px solid #fff;
    border-top: 3px solid #4CAF50;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .switch {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    display: inline-block;
    width: 40px;
    height: 23px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:checked + .slider:before {
    transform: translateX(17px);
  }

  .slider.round {
    border-radius: 23px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
document.head.appendChild(style);

var questionForm = document.createElement('div');
questionForm.id = 'questionForm';

var input = document.createElement('input');
input.type = 'text';
input.placeholder = '質問を入力してください';

var errorMessage = document.createElement('div');
errorMessage.id = 'errorMessage';

var resultContainer = document.createElement('div');
resultContainer.id = 'resultContainer';

var button = document.createElement('button');
button.textContent = '質問';
button.addEventListener('click', function () {
  var userQuestion = input.value.trim();

  if (!userQuestion) {
    errorMessage.textContent = '質問が空白です。';
    resultContainer.textContent = '';
    return;
  }

  errorMessage.textContent = '';
  button.disabled = true;
  button.style.backgroundColor = '#ccc';

  var googleScriptUrl = "https://script.google.com/macros/s/AKfycbwExRsT31rA_KSmPNoWK-HP8KesKhY2jsIsI-HBNdUhEuaM2GUan40myURkqbkCVbYy/exec";
  googleScriptUrl += "?question=" + encodeURIComponent(userQuestion);

  fetch(googleScriptUrl)
    .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
    .then(data => {
      resultContainer.textContent = data.text;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    })
    .finally(() => {
      button.disabled = false;
      button.style.backgroundColor = '#4CAF50';
    });
});

questionForm.appendChild(input);
questionForm.appendChild(errorMessage);
questionForm.appendChild(button);
questionForm.appendChild(resultContainer);
document.body.appendChild(questionForm);

var switchButton = document.createElement('label');
switchButton.className = 'switch';
switchButton.innerHTML = `
  <input type='checkbox' id='toggleSwitch'>
  <span class='slider round'></span>
`;
document.body.appendChild(switchButton);

document.getElementById('toggleSwitch').addEventListener('change', function() {
  questionForm.style.display = this.checked ? 'flex' : 'none';
});
