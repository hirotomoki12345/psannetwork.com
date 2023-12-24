# イメージをディスクに書き込み
sudo /usr/sbin/chromeos-install --dst /dev/mmcblk0 --src_image "$DOWNLOAD_DIR/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin" --resize_partition 2 || cleanup_and_exit "ChromeOSの書き込み中にエラーが発生しました."
