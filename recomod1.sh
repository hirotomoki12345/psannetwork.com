#!/bin/bash

# ダウンロード先ディレクトリ
download_dir="/home/chronos/user/Downloads"

# イメージのダウンロード
image_url="https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin"
image_file="${download_dir}/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin"

# イメージのダウンロード
curl -L -o "${image_file}" "${image_url}"

# ダウンロードの成功確認
if [ $? -eq 0 ]; then
  echo "イメージのダウンロードが成功しました。"
else
  echo "イメージのダウンロードに失敗しました。スクリプトを終了します。"
  exit 1
fi

# デバッグ情報
echo "インストールを開始します..."

# インストール（内部ディスクを指定）
install_command="chromeos-install --dst /dev/sda ${image_file}"
${install_command} 2> "${download_dir}/install_error.txt"

# インストールの成功確認
if [ $? -eq 0 ]; then
  echo "インストールが成功しました。"
else
  echo "インストールに失敗しました。エラーの詳細は ${download_dir}/install_error.txt を確認してください。"
fi
