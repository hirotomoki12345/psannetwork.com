// スライダーボタンのJavaScriptコード
document.head.innerHTML += `
<style>
  .switch {
    position: relative;
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
    -webkit-transition: .4s;
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
    -webkit-transition: .4s;
    transition: .4s;
  }
  input:checked + .slider {
    background-color: #2196F3;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(17px);
    -ms-transform: translateX(17px);
    transform: translateX(17px);
  }
  /* Rounded sliders */
  .slider.round {
    border-radius: 23px;
  }
  .slider.round:before {
    border-radius: 50%;
  }
</style>
`;

document.body.innerHTML = `
<label class='switch'>
  <input type='checkbox' id='toggleSwitch'>
  <span class='slider round'></span>
</label>
`;

// トグルが変更されたときの処理
document.getElementById('toggleSwitch').addEventListener('change', function() {
    if (this.checked) {
        alert('スライダーがオンになりました！');
    } else {
        alert('スライダーがオフになりました！');
    }
});
