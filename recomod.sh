#!/bin/bash

# すべてのパーティションをアンマウント
sudo umount /dev/sda*

# ルートディレクトリをフォーマット
sudo mkfs.ext4 /dev/sda

# ダウンロードしたイメージを展開
curl -o os-image.zip https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15359.58.0_kukui_recovery_stable-channel_mp-v6.bin.zip
unzip os-image.zip
rm os-image.zip

# イメージをディスクに書き込み
sudo dd if=os-image.bin of=/dev/sda bs=1M

# 書き込みが成功したかを確認
if [ $? -eq 0 ]; then
    echo "イメージの書き込みが成功しました。"
else
    echo "エラー: イメージの書き込み中に問題が発生しました。"
    exit 1
fi

# 再起動
sudo reboot
