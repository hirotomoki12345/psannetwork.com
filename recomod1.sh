# イメージのダウンロード
curl -L "https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip" -o "/home/chronos/user/Downloads/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip"

# イメージの展開
bsdtar -xvf "/home/chronos/user/Downloads/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip" -C "/home/chronos/user/Downloads"

# ChromeOSの書き込み
sudo /usr/sbin/chromeos-install --dst /dev/mmcblk0 --src "/home/chronos/user/Downloads/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin" --resize_partition 2
