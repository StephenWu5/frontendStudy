<?php
for ($i=0;$i<count($_FILES['myfile']['name']);$i++)
{
    move_uploaded_file($_FILES['myfile']['tmp_name'][$i],dirname(__FILE__).'/uploads/'.
    $_FILES['myfile']['name'][$i]);
    echo '已上传文件:'.$_FILES['myfile']['name'][$i].'<br/>';
    echo '路径是'.$_FILES['myfile']['tmp_name'][$i].'<br/>';
    echo dirname(__FILE__).'/uploads/'.
    iconv("utf-8","gbk",$_FILES['myfile']['name'][$i]);
}
flush();
?>