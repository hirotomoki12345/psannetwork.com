# リカバリイメージをダウンロードする
curl -L -O https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip

# リカバリイメージを解凍する
unzip chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip

# 内部ディスクに書き込む
sudo dd if=chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin of=/dev/sda bs=4M status=progress
