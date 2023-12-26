#!/bin/bash

# Error log file path
error_log="/home/chronos/user/Downloads/error_log.txt"

# Recovery image URL
recovery_image_url="https://dl.google.com/dl/edgedl/chromeos/recovery/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin.zip"

# Download directory
download_directory="/home/chronos/user/Downloads"

# Downloaded file name
downloaded_file="$download_directory/chromeos_recovery_image.zip"

# Function to install unzip if not present
install_unzip() {
    echo "Installing unzip..."
    sudo apt-get update
    sudo apt-get install -y unzip
}

# Check if unzip is installed
if ! command -v unzip &> /dev/null; then
    install_unzip
fi

# Download the recovery image
echo "Downloading the recovery image..."
if ! curl -L -o $downloaded_file $recovery_image_url 2>> $error_log; then
    echo "Download error: Failed to download the recovery image."
    exit 1
fi
echo "Recovery image download completed."

# Unzip the downloaded file
echo "Unzipping the recovery image..."
if ! unzip $downloaded_file -d $download_directory 2>> $error_log; then
    echo "Unzip error: Failed to unzip the downloaded file."
    exit 1
fi
echo "Recovery image unzip completed."

# Path to the unzipped image file
recovery_image_file="$download_directory/chromeos_15117.112.0_kukui_recovery_stable-channel_mp-v4.bin"

# Use chromeos-install to restore the recovery image to the device
echo "Writing the recovery image to the device..."
if ! sudo chromeos-install --dst /dev/mmcblk0 --src $recovery_image_file 2>> $error_log; then
    echo "Installation error: Failed to install the recovery image."
    cat $error_log  # Display the error log
    exit 1
fi
echo "Recovery image installation completed."

echo "Process completed successfully."
