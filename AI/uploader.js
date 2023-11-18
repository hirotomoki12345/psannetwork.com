import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-storage.js';

// Firebase構成
const firebaseConfig = {
  apiKey: "AIzaSyAQ6Wxch09h7hBaevt2tMa6los7DoKp-EE",
  authDomain: "psan-file.firebaseapp.com",
  projectId: "psan-file",
  storageBucket: "psan-file.appspot.com",
  messagingSenderId: "608944420732",
  appId: "1:608944420732:web:9fed02b5c6e9e8185fd6f9",
};

// Bitly APIキー
const bitlyApiKey = "e58992970f4d2565ad5a9c90b6337619b2dd51b6";

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Storageへの参照を取得
const storage = getStorage(app);

// 短縮URLを格納する変数を宣言
let shortLink;

// ファイル選択時の処理
const fileInput = document.getElementById('fileInput');
const resultContainer = document.getElementById('resultContainer');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', handleFileUpload);

function handleFileUpload() {
  const file = fileInput.files[0];
  if (!file) {
    alert('ファイルを選択してください。');
    return;
  }

  // ファイルサイズ制限 (100MB以下)
  const fileSizeLimit = 100 * 1024 * 1024; // 100MB
  if (file.size > fileSizeLimit) {
    alert('ファイルサイズが大きすぎます。最大サイズは100MBです。');
    return;
  }

  const filePath = 'data/' + file.name; // アップロード先のファイルパスを指定

  // ファイルをアップロード
  const storageRef = ref(storage, filePath);
  uploadBytes(storageRef, file)
    .then(() => {
      console.log('ファイルのアップロードに成功しました。');

      // ファイルのダウンロードURLを取得
      return getDownloadURL(storageRef);
    })
    .then((url) => {
      // ダウンロードURLを表示
      console.log('ファイルのURL:', url);

      // 短縮URLを生成
      return shortenURL(url);
    })
    .then((generatedShortLink) => {
      // 短縮URLを表示
      shortLink = generatedShortLink;
      console.log('短縮URL:', shortLink);

      // メッセージを結果のコンテナに追加
      resultContainer.textContent += `短縮URL: ${shortLink}`;
    })
    .catch((error) => {
      // エラーが発生した場合の処理
      console.error('ファイルのアップロードに失敗しました。', error);
    });
}

// Bitlyを使用してURLを短縮する関数
async function shortenURL(longURL) {
  const bitlyAPI = 'https://api-ssl.bitly.com/v4/shorten';

  const response = await fetch(bitlyAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bitlyApiKey}`,
    },
    body: JSON.stringify({
      long_url: longURL,
    }),
  });

  const result = await response.json();
  return result.id; // 短縮URL
}
