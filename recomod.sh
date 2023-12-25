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
    img_file=$(ls -1t "$BACKUP_DIR/current_os_backup"/*.img.gz | head -n 1)
    
    if [ -z "$img_file" ]; then
        cleanup_and_exit "バックアップイメージが見つかりませんでした."
    fi
    
    echo "使用するイメージファイル: $img_file"
    
    sudo gzip -dc "$img_file" | sudo dd of=/dev/mmcblk0 bs=4M conv=fsync || cleanup_and_exit "バックアップイメージの書き込み中にエラーが発生しました."
    
    echo "イメージの書き込み成功"
    echo "Chromebookを再起動してください."
    reboot
elif [ "$mode" == "2" ]; then
    echo "Mode 2 開始"
    remaining_space=$(df -h "$BACKUP_DIR" | awk 'NR==2 {print $4}')
    echo "残りのディスク容量: $remaining_space"
    
    # Ensure the backup directory is empty
    sudo rm -rf "$BACKUP_DIR/current_os_backup"
    sudo mkdir -p "$BACKUP_DIR/current_os_backup"
    
    # Exclude unnecessary directories during backup
    exclude_dirs="--exclude='/proc/*' --exclude='/sys/*' --exclude='/run/*' --exclude='/dev/*' --exclude="$BACKUP_DIR/*""

    # Use dd to create a disk image excluding unnecessary directories
    sudo dd if=/dev/mmcblk0 bs=4M conv=fsync status=progress | gzip > "$BACKUP_DIR/current_os_backup/chromeos_backup_$(date +"%Y%m%d_%H%M%S").img.gz" || cleanup_and_exit "OSのバックアップ中にエラーが発生しました."
    
    echo "OSのバックアップが成功しました."
    echo "スクリプトがここまで実行されました."

else
    cleanup_and_exit "無効なモードが選択されました."
fi
