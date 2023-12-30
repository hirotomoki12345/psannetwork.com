# 出力を変数に格納する
output=$(chromeos-install -h)

# 出力をファイルに保存する
echo "$output" | grep -v "^$" > /home/chronos/user/Downloads/test.txt
