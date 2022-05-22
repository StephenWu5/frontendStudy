<?php
$str =file_get_contents('php://input');
$fileName='副本_'.$_REQUEST['fileName'];
// $fp = fopen(iconv("UTF-8","GBK",dirname(__FILE__).$fileName), 'w');
$fp = fopen(dirname(__FILE__).$fileName, 'w+');
fwrite($fp,$str);
fclose($fp);             // 关闭文件
echo $fp.$fileName;
?>