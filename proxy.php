<?php
// プロキシを介してコンテンツを取得
$data = file_get_contents("https://www.ugtop.com/spill.shtml", false,
    stream_context_create(['http' => [
        'method' => 'GET',
        'request_fulluri' => true,
        'proxy' => 'tcp://135.148.90.31:8000',
        'timeout' => 2,
    ]])
);
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>プロキシ経由で取得したコンテンツの表示</title>
</head>
<body>
    <!-- 取得したデータをiframeで表示 -->
    <iframe width="100%" height="600" srcdoc="<?php echo htmlentities($data); ?>"></iframe>
</body>
</html>
