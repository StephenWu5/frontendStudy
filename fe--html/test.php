<!-- 作者的demo有问题 -->
<?php
// 所有页面
// header('Access-Control-Allow-Origin:*');
// 指定域名
header('Access-Control-Allow-Origin:http://127.0.0.1:5500');
$str =file_get_contents('php://input');
echo '服务器端接收数据:'.$str;
flush();
?>