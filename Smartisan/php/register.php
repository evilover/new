<?php
    include("public.php");
    $name = $_POST["name"];
    $password = $_POST["password"];
    $sql = "select * from user where name='$name'";
    $res = mysqli_query($con,$sql);
    $arr = mysqli_fetch_all($res);
    //print_r($arr);
    if(count($arr)){
        echo json_encode(array(
            "status"=>"false",
            "info"=>"用户名重复"
        ));
    }else{
        $insert = "insert into user (name,password) values ('$name','$password')";
        $n = mysqli_query($con,$insert);
        if($n){
            echo json_encode(array(
                "status"=>"true",
                "info"=>"注册成功"
            ));
        }
    }


?>