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
    # ダウンロードしたイメージをディスクに書き込み前に一時ディレクトリに展開
    unzip -d "$DOWNLOAD_DIR/temp" "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip" || cleanup_and_exit "イメージの展開中にエラーが発生しました."

    # 必要なファイルだけを取り出す
    sudo cp "$DOWNLOAD_DIR/temp/sbin/chromeos-recovery" "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin"

    # 不要な一時ディレクトリを削除
    rm -rf "$DOWNLOAD_DIR/temp"

    # イメージをディスクに書き込み
    sudo dd if="$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin" of=/dev/mmcblk0 bs=4M conv=fsync || cleanup_and_exit "イメージの書き込み中にエラーが発生しました."

    # 書き込みが成功したかを確認
    echo "イメージの書き込みが成功しました。"

    # Chromebookでは再起動はできないため、メッセージの表示のみ
    echo "Chromebookを再起動してください。"
    reboot

elif [ "$mode" == "2" ]; then
    # 残りのディスク容量を確認
    remaining_space=$(df -h "$BACKUP_DIR" | awk 'NR==2 {print $4}')

    # 残りのディスク容量を表示
    echo "残りのディスク容量: $remaining_space"

    # 現在のOSのイメージサイズを確認
    current_os_size=$(sudo du -sh --exclude='/proc/*' --exclude='/sys/*' --exclude='/run/*' --exclude='/dev/*' --exclude='/tmp/*' / | cut -f1)
    
    # 現在のOSのイメージサイズを表示
    echo "現在のOSのイメージサイズ: $current_os_size"

    # ユーザーに確認メッセージを表示
    read -p "このディスク容量でバックアップしますか？(y/n): " confirm
    if [ "$confirm" != "y" ]; then
        cleanup_and_exit "バックアップを中止しました。"
    fi

    # ユーザーに確認メッセージを表示
    read -p "このサイズでバックアップしますか？(y/n): " confirm
    if [ "$confirm" != "y" ]; then
        cleanup_and_exit "バックアップを中止しました。"
    fi

    # 現在のOSを起動可能なイメージとしてバックアップ先ディレクトリに保存
    sudo dd if=/dev/mmcblk0 of="$BACKUP_DIR/current_os_backup_$(date +"%Y%m%d_%H%M%S").img" bs=4M conv=fsync status=progress || cleanup_and_exit "OSのバックアップ中にエラーが発生しました."
    
    # バックアップが成功したかを確認
    echo "OSのバックアップが成功しました。"

else
    # 無効なモードが選択された場合のエラー処理
    cleanup_and_exit "無効なモードが選択されました。"
fi
