# リカバリイメージをダウンロードして /home/chronos/user/Downloads に保存する
curl -L -o /home/chronos/user/Downloads/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip

# ダウンロードしたファイルの保存先に移動
cd /home/chronos/user/Downloads

# リカバリイメージをtarを使って解凍する
tar -xvf chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip

# 内部ディスクに書き込む
sudo dd if=chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin of=/dev/sda bs=4M status=progress
