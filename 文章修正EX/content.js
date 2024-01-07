var style = document.createElement('style');
style.innerHTML = `
#customQuestionForm {
  position: fixed;
  bottom: 20px;
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

#customQuestionForm input {
  margin-bottom: 15px;
  padding: 8px;
  width: 100%;
}

#customQuestionForm button {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
}

#customQuestionForm button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

#customQuestionForm #customErrorMessage {
  color: red;
  margin-top: 15px;
}

#customQuestionForm #customResultContainer {
  margin-top: 15px;
  color: #333;
}

.customLoading {
  display: inline-block;
  margin-left: 5px;
  border: 3px solid #fff;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: customSpin 1s linear infinite;
}

@keyframes customSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.customSwitch {
  position: fixed;
  bottom: 45px;
  right: 20px;
  z-index: 9999;
  display: inline-block;
  width: 40px;
  height: 23px;
}

.customSwitch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.customSlider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.customSlider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
}

.customSwitch input:checked + .customSlider {
  background-color: #2196F3;
}

.customSwitch input:checked + .customSlider:before {
  transform: translateX(17px);
}

.customSlider.round {
  border-radius: 23px;
}

.customSlider.round:before {
  border-radius: 50%;
}
`;

document.head.appendChild(style);

var customQuestionForm = document.createElement('div');
customQuestionForm.id = 'customQuestionForm';

var customInput = document.createElement('input');
customInput.type = 'text';
customInput.placeholder = '改善したい文章を書いてください。';

var customErrorMessage = document.createElement('div');
customErrorMessage.id = 'customErrorMessage';

var customResultContainer = document.createElement('div');
customResultContainer.id = 'customResultContainer';

var customButton = document.createElement('button');
customButton.textContent = '文章を改善';
customButton.addEventListener('click', function () {
  var userQuestion = customInput.value.trim();

  if (!userQuestion) {
    customErrorMessage.textContent = '文章が入力されていません。';
    customResultContainer.textContent = '';
    return;
  }

  customErrorMessage.textContent = '';
  customButton.disabled = true;
  customButton.style.backgroundColor = '#ccc';

  var customGoogleScriptUrl = "https://script.google.com/macros/s/AKfycbyXk7ZYmhc4zHDbbAYbxOkWintAF6hPtRPvQ7OUG9O6R7KEuGpa-Xz3T7rKYcwTtCW_/exec";
  customGoogleScriptUrl += "?question=" + encodeURIComponent(userQuestion);

  fetch(customGoogleScriptUrl)
    .then(response => response.ok ? response.json() : Promise.reject('Network response was not ok'))
    .then(data => {
      customResultContainer.textContent = data.text;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    })
    .finally(() => {
      customButton.disabled = false;
      customButton.style.backgroundColor = '#4CAF50';
    });
});

customQuestionForm.appendChild(customInput);
customQuestionForm.appendChild(customErrorMessage);
customQuestionForm.appendChild(customButton);
customQuestionForm.appendChild(customResultContainer);
document.body.appendChild(customQuestionForm);

var customSwitchButton = document.createElement('label');
customSwitchButton.className = 'customSwitch';
customSwitchButton.innerHTML = `
  <input type='checkbox' id='customToggleSwitch'>
  <span class='customSlider round'></span>
`;
document.body.appendChild(customSwitchButton);

document.getElementById('customToggleSwitch').addEventListener('change', function() {
  customQuestionForm.style.display = this.checked ? 'flex' : 'none';
});
