  // 新しい iframe を作成
  var iframe = document.createElement('iframe');

  // iframe の属性を設定
  iframe.src = 'https://google.com?igu=1'; // iframe のURLを指定
  iframe.width = '600'; // iframe の幅を指定
  iframe.height = '400'; // iframe の高さを指定
  iframe.frameBorder = '0'; // 枠線を非表示にする

  document.body.appendChild(iframe);

