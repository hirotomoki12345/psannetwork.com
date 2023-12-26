#!/bin/bash

# ダウンロード先ディレクトリ
download_dir="/home/chronos/user/Downloads"

# イメージのダウンロード
image_url="https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin"
image_file="${download_dir}/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin"

# イメージのダウンロード
curl -L -o "${image_file}" "${image_url}"

# インストール
install_command="chromeos-install --dst /dev/mmcblk0 --image ${image_file}"
${install_command} 2> "${download_dir}/install_error.txt"
