#!/bin/bash

# エラーを保存するファイルを作成
touch /home/chronos/user/Downloads/recovery_error.txt

# デバイスから recovery-image.bin ファイルを検索
RECOVERY_IMAGE=$(find /dev/disk/by-id -name '*-part3' -exec grep recovery-image.bin {} \; | head -1)

# リカバリイメージが見つからなければ、/home/p/chromeos_recovery.bin を使用する
if [ -z "$RECOVERY_IMAGE" ]; then
  RECOVERY_IMAGE=/home/p/chromeos_recovery.bin
fi

# リカバリを実行し、エラーを保存する
chromeos-install --recovery --no-os-check --image=$RECOVERY_IMAGE 2>&1 | tee -a /home/chronos/user/Downloads/recovery_error.txt
