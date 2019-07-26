<?php
        include("public2.php"); 
        $sql="select * from shopcar";
        $res=mysqli_query($con,$sql);
        $arr=mysqli_fetch_all($res);
        echo JSON_encode($arr);
?>