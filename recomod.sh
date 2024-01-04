echo -e "g\nw" | sudo fdisk /dev/mmcblk0
sudo chromeos-install --dst=/dev/mmcblk0 --payload_image=/home/chronos/user/Downloads/recovery.bin --yes
