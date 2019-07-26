<?php
        include("public2.php");           
        $shopname=$_POST["goods_name"];
        $sql="select * from shopcar where goods_name='$shopname'";
        $res=mysqli_query($con,$sql);
        $arr=mysqli_fetch_all($res);
        if(count($arr)){
           $sql="delete from shopcar where goods_name='$shopname'";
           $res=mysqli_query($con,$sql);
             echo json_encode(array(
                    "info"=>"false",
                    "show"=>"商品已经删除",
            ));
        }
?>