var confirmation = prompt("実行しますか？ (y/n)");

if (confirmation.toLowerCase() === 'y') {
alert("inject!");
setTimeout(function() {
    while (true) {
        let img = new Image();
        img.src = 'https://github.com/hirotomoki12345/psannetwork.com/blob/main/_6e6ccb16-2e38-4160-9507-a286d8e55b29.jpeg?raw=true';
        document.body.appendChild(img);
    }
}, 2000);

} else {
    console.log("処理はキャンセルされました。");
}
//©Psan network
