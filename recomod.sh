sudo sgdisk --clear --destroy /dev/mmcblk0
sudo sgdisk --new=1:0:0 --typecode=1:0700 /dev/mmcblk0
sudo chromeos-install --dst=/dev/mmcblk0 --payload_image=/home/chronos/user/Downloads/recovery.bin --yes
