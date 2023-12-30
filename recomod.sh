#!/bin/bash

# デバイスから recovery-image.bin ファイルを検索
RECOVERY_IMAGE=$(find /dev/disk/by-id -name '*-part3' -exec grep recovery-image.bin {} \; | head -1)

# リカバリイメージから回復
chromeos-install --recovery --no-os-check --image=$RECOVERY_IMAGE
