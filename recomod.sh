#!/bin/bash

# コマンドラインオプションを解析する
args=$(getopt -o rno -l recovery,no-os-check,image: -- "$@")

# 解析結果を変数に格納する
eval set -- "$args"

# リカバリオプションが指定されているか確認する
if [ -n "${1}" ]; then
  # エラーメッセージを表示する
  echo "エラー: コマンドラインオプションが正しくありません。"
  echo "chromeos-install -h を実行して、コマンドのヘルプを表示してください。"
  exit 1
fi

# リカバリイメージが指定されているか確認する
if [ -z "${image}" ]; then
  # エラーメッセージを表示する
  echo "エラー: リカバリイメージが指定されていません。"
  echo "chromeos-install -h を実行して、コマンドのヘルプを表示してください。"
  exit 1
fi

# リカバリを実行する
chromeos-install --recovery --no-os-check --image="${image}"
