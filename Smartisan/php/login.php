<?php
      include("public.php");

      $name = $_POST["name"];
      $password = $_POST["password"];
      $sql = "select * from user where name='$name'";
      $res = mysqli_query($con,$sql);
      $arr = mysqli_fetch_assoc($res);
      if(count($arr)){
          if($arr['password'] == $password){
              echo json_encode(array(
                  "status"=>true,
                  "info"=>"success"
              ));
          }else{
              echo json_encode(array(
                  "status"=>false,
                  "info"=>"passwordwrong"
              ));
          }
      }else{
          echo json_encode(array(
              "status"=>false,
              "info"=>"noregister"
          ));
      }

?>