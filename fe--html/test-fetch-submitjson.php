<?php
$person=json_decode(file_get_contents("php://input"));
$name='姓名:'.$person->{'name'};
$age='年龄:'.$person->{'age'}; 
echo $name.'   '.$age;
?>