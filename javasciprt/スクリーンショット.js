const script = document.createElement('script');
script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
script.onload = () => {
  const copyrightElement = document.createElement('div');
  copyrightElement.textContent = '© Psannetwork';
  copyrightElement.style.position = 'fixed';
  copyrightElement.style.bottom = '10px';
  copyrightElement.style.right = '10px';
  copyrightElement.style.color = 'white';
  document.body.appendChild(copyrightElement);

  html2canvas(document.body).then(canvas => {
    const screenshotUrl = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = screenshotUrl;
    a.download = 'screenshot.png';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    document.body.removeChild(copyrightElement);
  });
};
document.head.appendChild(script);
