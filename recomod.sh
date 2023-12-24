#!/bin/bash

set -e

# エラーファイルのディレクトリとファイル名
ERROR_DIR="/home/chronos/user/Downloads/flasherror"
ERROR_LOG="$ERROR_DIR/error_log.txt"

# エラーファイルのディレクトリが存在しなければ作成
mkdir -p "$ERROR_DIR"

# エラー時の処理を定義
function cleanup_and_exit {
    local exit_code=$?
    echo "エラー: $1"
    
    # エラーメッセージをファイルに保存
    echo "エラー: $1" >> "$ERROR_LOG"
    
    # 作業ディレクトリから出る
    cd ~
    
    # ダウンロードしたファイルを削除
    rm -f os-image.zip os-image.bin
    
    # ルートディレクトリをマウント
    sudo mount -o remount,rw /
    
    # ルートディレクトリをアンマウント
    sudo umount /

    exit $exit_code
}

# トラップを設定してエラーが発生した場合に cleanup_and_exit を呼ぶ
trap 'cleanup_and_exit "スクリプトの実行中にエラーが発生しました."' ERR

# ルートディレクトリをアンマウント
sudo umount / || cleanup_and_exit "ルートディレクトリのアンマウント中にエラーが発生しました。"

# ディスクを検索し、ルートディレクトリをフォーマット
DISK=$(lsblk -no NAME,MOUNTPOINT | awk '$2=="/"{print $1}')
sudo mkfs.ext4 /dev/$DISK || cleanup_and_exit "ディスクのフォーマット中にエラーが発生しました。"

# 作業ディレクトリに移動
cd ~

# ダウンロードしたイメージを展開
curl -o os-image.zip https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip || cleanup_and_exit "イメージのダウンロード中にエラーが発生しました。"
unzip os-image.zip || cleanup_and_exit "イメージの展開中にエラーが発生しました。"
rm -f os-image.zip || cleanup_and_exit "ダウンロードしたZIPファイルの削除中にエラーが発生しました。"

# イメージをディスクに書き込み
sudo dd if=os-image.bin of=/dev/$DISK bs=1M || cleanup_and_exit "イメージの書き込み中にエラーが発生しました。"

# 書き込みが成功したかを確認
echo "イメージの書き込みが成功しました。"

# 再起動
sudo reboot
