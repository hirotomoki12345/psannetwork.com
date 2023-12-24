sudo dd if=/dev/zero of=/dev/sda bs=1M
curl -o os-image.bin https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip
sudo dd if=os-image.bin of=/dev/sda bs=1M
