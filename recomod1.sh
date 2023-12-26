# リカバリイメージのURL
recovery_image_url="https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip"

# ダウンロード先のディレクトリ
download_directory="/home/chronos/user/Downloads"

# ダウンロード先のファイル名
downloaded_file="$download_directory/chromeos_recovery_image.zip"

# ダウンロード
curl -L -o $downloaded_file $recovery_image_url

# ダウンロードしたファイルの解凍
unzip $downloaded_file -d $download_directory

# 解凍されたイメージファイルのパス
recovery_image_file="$download_directory/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin"

# chromeos-install を使ってリカバリイメージをデバイスに復元
sudo chromeos-install --dst /dev/mmcblk0 --src $recovery_image_file
