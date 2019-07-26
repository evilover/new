<?php
        include("public2.php");    
        $id=$_POST["goods_id"];       
        $shopname=$_POST["goods_name"];
        $count=$_POST["goods_num"];
        $price=$_POST["goods_price"];
        $img=$_POST["goods_img"];
        $goodsum=$_POST["goods_sum"];
        $sql="select * from shopcar where goods_name='$shopname'";
        $res=mysqli_query($con,$sql);
        $arr=mysqli_fetch_all($res);
        if(count($arr)){
           $sql="update shopcar set goods_num = '$count' where goods_name='$shopname'";
           $res=mysqli_query($con,$sql);
             echo json_encode(array(
                    "info"=>"false",
                    "show"=>"已有该商品，并且数量变化了",
            ));
        }else{
             if($res){
             echo json_encode(array(
                    "info"=>"true",
                    "show"=>"成功加入购物车",
                ));
            }
            $sqler="insert into shopcar (goods_id,goods_name,goods_num,goods_price,goods_img,goods_sum) values ('$id','$shopname','$count','$price','$img','$goodsum')";
            $res=mysqli_query($con,$sqler);
        }
?>