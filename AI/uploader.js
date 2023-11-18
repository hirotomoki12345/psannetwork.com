  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js';
  import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.3.0/firebase-storage.js';

  // Firebase構成
  const firebaseConfig = {
    apiKey: "AIzaSyAQ6Wxch09h7hBaevt2tMa6los7DoKp-EE",
    authDomain: "psan-file.firebaseapp.com",
    projectId: "psan-file",
    storageBucket: "psan-file.appspot.com",
    messagingSenderId: "608944420732",
    appId: "1:608944420732:web:9fed02b5c6e9e8185fd6f9",
  };

  // Firebaseアプリの初期化
  const app = initializeApp(firebaseConfig);

  // Storageへの参照を取得
  const storage = getStorage(app);

  // ファイル選択時の処理
  const fileInput = document.getElementById('fileInput');
  const resultContainer = document.getElementById('resultContainer');
  const uploadButton = document.getElementById('uploadButton');
  const fileIdInput = document.getElementById('fileIdInput');
  const downloadButton = document.getElementById('downloadButton');

  let fileId; // ファイルIDを格納する変数

  uploadButton.addEventListener('click', handleFileUpload);
  downloadButton.addEventListener('click', handleFileDownload);

  function handleFileUpload() {
    const files = fileInput.files;
    if (!files || files.length === 0) {
      alert('ファイルを選択してください。');
      return;
    }

    fileId = generateRandomId(); // ファイルIDを生成

    resultContainer.innerHTML = ''; // 既存の結果をクリア

    // 各ファイルに対して処理を行う
    Array.from(files).forEach((file, index) => {
      const filePath = generateFilePath(file, fileId); // ファイルの保存先のパスを生成

      // ファイルをアップロード
      const storageRef = ref(storage, filePath);
      uploadBytes(storageRef, file)
        .then(() => {
          console.log(`ファイル ${index + 1} のアップロードに成功しました。`);

          // ファイルのダウンロードURLとファイルIDを取得
          return Promise.all([getDownloadURL(storageRef), fileId]);
        })
        .then(([url, fileId]) => {
          // ダウンロードリンクとファイルIDを表示
          const linkElement = document.createElement('a');
          linkElement.href = url;
          linkElement.target = '_blank';
          linkElement.textContent = `ファイル ${index + 1} のダウンロード`;
          linkElement.classList.add('fileLink');
          resultContainer.appendChild(linkElement);
        resultContainer.innerHTML += `ファイルID: ${fileId}<br>`;

        })
        .catch((error) => {
          // エラーが発生した場合の処理
          console.error(`ファイル ${index + 1} のアップロードに失敗しました。`, error);
        });
    });
  }

  async function handleFileDownload() {
    const inputtedFileId = fileIdInput.value.trim();
    if (!inputtedFileId) {
      alert('ファイルIDを入力してください。');
      return;
    }

    // 入力されたファイルIDを使用してファイルの保存先のパスを構築
    const filePath = `data/${inputtedFileId}`;

    // ファイルの一覧を取得
    try {
      const fileRef = ref(storage, filePath);
      const fileList = await listAll(fileRef);

      // ダウンロードリンクとファイルIDを表示
      fileList.items.forEach(async (file) => {
        const url = await getDownloadURL(file);
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.textContent = `ファイルのダウンロード (ファイルID: ${inputtedFileId})`;
        linkElement.classList.add('fileLink');
        resultContainer.appendChild(linkElement);

        // ファイルIDも表示
        resultContainer.innerHTML += `ファイルID: ${inputtedFileId}<br>`;
      });
    } catch (error) {
      // エラーが発生した場合の処理
      console.error('ファイルのダウンロードに失敗しました。', error);
    }
  }

  // ファイルの保存先のパスを生成する関数
  function generateFilePath(file, id) {
    return `data/${id}/${encodeURIComponent(file.name)}`;
  }

// ランダムなIDを生成する関数（9桁）
function generateRandomId() {
  return Math.random().toString(36).substring(2, 11);
}

