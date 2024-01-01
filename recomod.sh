curl -o https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip
unzip chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip
sudo chromeos-install --skip-os-verification --device=/dev/mmcblk0 --image=chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin | sudo tee /home/chronos/user/Downloads/output.txt
