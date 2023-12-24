#!/bin/bash

set -e

# ダウンロード先ディレクトリ
DOWNLOAD_DIR="/home/chronos/user/Downloads"

# エラーファイルのディレクトリとファイル名
ERROR_DIR="$DOWNLOAD_DIR/flasherror"
ERROR_LOG="$ERROR_DIR/error_log.txt"

# エラーファイルのディレクトリが存在しなければ作成
mkdir -p "$ERROR_DIR"

# エラー時の処理を定義
function cleanup_and_exit {
    local exit_code=$?
    echo "エラー: $1"
    
    # エラーメッセージをファイルに保存
    echo "エラー: $1" >> "$ERROR_LOG"
    
    # ダウンロードしたファイルを削除
    rm -f "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip"
    
    exit $exit_code
}

# トラップを設定してエラーが発生した場合に cleanup_and_exit を呼ぶ
trap 'cleanup_and_exit "スクリプトの実行中にエラーが発生しました."' ERR

# ルートディレクトリのマウントを確認
if mount | grep " / " | grep -q "rw"; then
    # ルートディレクトリが読み取り専用でない場合はアンマウント
    sudo umount / || cleanup_and_exit "ルートディレクトリのアンマウント中にエラーが発生しました。"
fi

# ダウンロードしたイメージをディスクに書き込み
curl -L "https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip" -o "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip" || cleanup_and_exit "イメージのダウンロード中にエラーが発生しました."

# Chromebookでは標準のunzipコマンドではなくbsdtarを使用する
bsdtar -xvf "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip" -C "$DOWNLOAD_DIR" || cleanup_and_exit "イメージの展開中にエラーが発生しました."

# イメージをディスクに書き込み
sudo dd if="$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin" of=/dev/mmcblk0 bs=4M conv=fsync || cleanup_and_exit "イメージの書き込み中にエラーが発生しました."

# 書き込みが成功したかを確認
echo "イメージの書き込みが成功しました。"

# Chromebookでは再起動はできないため、メッセージの表示のみ
echo "Chromebookを再起動してください。"
reboot
