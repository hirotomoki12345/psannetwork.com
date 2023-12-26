curl -LO https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin
chromeos-install \
  --image chromeos_image_latest.bin \
  --device /dev/mmcblk0
