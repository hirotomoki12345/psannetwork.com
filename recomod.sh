# 出力を変数に格納する
output=$(chromeos-install -h)

# 変数の内容をファイルに保存する
echo "$output" > /home/chronos/user/Downloads/test.txt
