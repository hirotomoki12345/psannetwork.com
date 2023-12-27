document.head.innerHTML += `
<style>
  .switch{position:relative;display:inline-block;width:40px;height:23px}
  .switch input{opacity:0;width:0;height:0}
  .slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#ccc;-webkit-transition:.4s;transition:.4s}
  .slider:before{position:absolute;content:"";height:17px;width:17px;left:3px;bottom:3px;background-color:white;-webkit-transition:.4s;transition:.4s}
  input:checked + .slider{background-color:#2196F3}
  input:focus + .slider{box-shadow:0 0 1px #2196F3}
  input:checked + .slider:before{-webkit-transform:translateX(17px);-ms-transform:translateX(17px);transform:translateX(17px)}
  .slider.round{border-radius:23px}
  .slider.round:before{border-radius:50%}
</style>`;

var switchLabel = document.createElement('label');
switchLabel.className = 'switch';

var switchInput = document.createElement('input');
switchInput.type = 'checkbox';
switchInput.id = 'toggleSwitch';

var switchSpan = document.createElement('span');
switchSpan.className = 'slider round';

switchLabel.appendChild(switchInput);
switchLabel.appendChild(switchSpan);
document.body.appendChild(switchLabel);

var isToggleOn = false;

document.getElementById('toggleSwitch').addEventListener('change', function() {
    isToggleOn = this.checked;
});

document.addEventListener('click', function(event) {
    var clickedElement = event.target;

    if (isToggleOn && !clickedElement.closest('.switch')) {
        if (clickedElement.tagName !== 'A') {
            clickedElement.style.display = 'none';
        } else {
            event.preventDefault();
        }
    }
});

switchLabel.style.position = 'fixed';
switchLabel.style.bottom = '20px';
switchLabel.style.right = '20px';
