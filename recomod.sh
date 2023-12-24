#!/bin/bash

set -e

# ダウンロード先ディレクトリ
DOWNLOAD_DIR="/home/chronos/user/Downloads"

# エラーファイルのディレクトリとファイル名
ERROR_DIR="$DOWNLOAD_DIR/flasherror"
ERROR_LOG="$ERROR_DIR/error_log.txt"

# バックアップ先ディレクトリ
BACKUP_DIR="/home/chronos/user/Downloads"

# エラーファイルのディレクトリが存在しなければ作成
mkdir -p "$ERROR_DIR"

# バックアップ先ディレクトリが存在しなければ作成
mkdir -p "$BACKUP_DIR"

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

# モードを引数から取得する
mode="$1"

# 選択されたモードに応じて処理を実行
if [ "$mode" == "1" ]; then
    # ダウンロードしたイメージをディスクに書き込み
    download_url="https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip"
    output_file="$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip"
    
    echo "ダウンロード中..."
    
    # ダウンロード進捗を表示
    curl -L "$download_url" -o "$output_file" --progress-bar || cleanup_and_exit "イメージのダウンロード中にエラーが発生しました."
    
    echo "ダウンロードが完了しました."

    # Chromebookでは標準のunzipコマンドではなくbsdtarを使用する
    bsdtar -xvf "$output_file" -C "$DOWNLOAD_DIR" || cleanup_and_exit "イメージの展開中にエラーが発生しました."

    # イメージをディスクに書き込み
    echo "イメージをディスクに書き込み中..."
    sudo dd if="$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin" of=/dev/mmcblk0 bs=4M conv=fsync status=progress || cleanup_and_exit "イメージの書き込み中にエラーが発生しました."

    # 書き込みが成功したかを確認
    echo "イメージの書き込みが成功しました。"

    # Chromebookでは再起動はできないため、メッセージの表示のみ
    echo "Chromebookを再起動してください。"
    reboot

elif [ "$mode" == "2" ]; then
    # バックアップ先ディレクトリにZIP形式でバックアップを作成
    backup_file="$BACKUP_DIR/chromeos_backup_$(date +"%Y%m%d_%H%M%S").zip"
    echo "バックアップの作成中..."
    sudo zip -r -v "$backup_file" "$DOWNLOAD_DIR"/* || cleanup_and_exit "バックアップの作成中にエラーが発生しました."
    
    # バックアップが成功したかを確認
    echo "バックアップの作成が成功しました。"
    
else
    # 無効なモードが選択された場合のエラー処理
    cleanup_and_exit "無効なモードが選択されました。"
fi
