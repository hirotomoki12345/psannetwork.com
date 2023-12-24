#!/bin/bash
set -e

DOWNLOAD_DIR="/home/chronos/user/Downloads"
ERROR_DIR="$DOWNLOAD_DIR/flasherror"
ERROR_LOG="$ERROR_DIR/error_log.txt"
BACKUP_DIR="$DOWNLOAD_DIR"

mkdir -p "$ERROR_DIR" "$BACKUP_DIR"

function cleanup_and_exit {
    echo "エラー: $1" >> "$ERROR_LOG"
    rm -f "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip"
    exit 1
}

trap 'cleanup_and_exit "スクリプトの実行中にエラーが発生しました."' ERR

if mount | grep " / " | grep -q "rw"; then
    sudo umount / || cleanup_and_exit "ルートディレクトリのアンマウント中にエラーが発生しました。"
fi

mode="$1"

if [ "$mode" == "1" ]; then
    echo "Mode 1 開始"
    unzip -d "$DOWNLOAD_DIR/temp" "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip" || cleanup_and_exit "イメージの展開中にエラーが発生しました."
    echo "イメージ展開成功"
    sudo cp "$DOWNLOAD_DIR/temp/sbin/chromeos-recovery" "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin"
    echo "必要なファイルのコピー成功"
    rm -rf "$DOWNLOAD_DIR/temp"
    echo "一時ディレクトリ削除成功"
    sudo dd if="$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin" of=/dev/mmcblk0 bs=4M conv=fsync || cleanup_and_exit "イメージの書き込み中にエラーが発生しました."
    echo "イメージの書き込み成功"
    echo "イメージの書き込みが成功しました。"
    echo "Chromebookを再起動してください。"
    reboot

# ...
elif [ "$mode" == "2" ]; then
    echo "Mode 2 開始"
    echo "remaining_space=$(df -h \"$BACKUP_DIR\" | awk 'NR==2 {print $4}')"
    remaining_space=$(df -h "$BACKUP_DIR" | awk 'NR==2 {print $4}')
    echo "残りのディスク容量: $remaining_space"

    current_os_size=$(sudo du -sh --exclude='/proc/*' --exclude='/sys/*' --exclude='/run/*' --exclude='/dev/*' --exclude="$BACKUP_DIR/*" / | cut -f1)
    echo "現在のOSのイメージサイズ: $current_os_size"
    echo "スクリプトがここまで実行されました。"

    read -p "このディスク容量でバックアップしますか？(y/n): " confirm
    [ "$confirm" != "y" ] && cleanup_and_exit "バックアップを中止しました."

    read -p "このサイズでバックアップしますか？(y/n): " confirm
    [ "$confirm" != "y" ] && cleanup_and_exit "バックアップを中止しました."

    sudo dd if=/dev/mmcblk0 of="$BACKUP_DIR/current_os_backup_$(date +"%Y%m%d_%H%M%S").img" bs=4M conv=fsync status=progress || cleanup_and_exit "OSのバックアップ中にエラーが発生しました."
    echo "OSのバックアップが成功しました."
    echo "スクリプトがここまで実行されました。"

    echo "OSのバックアップが成功しました."

else
    cleanup_and_exit "無効なモードが選択されました。"
fi
