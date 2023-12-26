#!/bin/bash
set -e

# エラーログファイルのパス
error_log="/home/chronos/user/Downloads/error_log.txt"

# リカバリイメージのURL
recovery_image_url="https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin"

# ダウンロード先のディレクトリ
download_directory="/home/chronos/user/Downloads"

# ダウンロード先のファイル名
downloaded_file="$download_directory/chromeos_recovery_image.bin"

# リカバリイメージをダウンロード
echo "リカバリイメージをダウンロードしています..."
if ! curl -L -o $downloaded_file $recovery_image_url 2>> $error_log; then
    echo "ダウンロードエラー: リカバリイメージのダウンロードに失敗しました。"
    exit 1
fi
echo "リカバリイメージのダウンロードが完了しました."

# chromeos-install を使ってリカバリイメージをデバイスに復元
echo "リカバリイメージをデバイスに書き込んでいます..."
if ! sudo chromeos-install /dev/mmcblk0 $downloaded_file 2>> $error_log; then
    echo "インストールエラー: リカバリイメージのインストールに失敗しました。"
    cat $error_log  # エラーログを表示
    exit 1
fi
echo "リカバリイメージのインストールが完了しました."

echo "プロセスが正常に終了しました."
