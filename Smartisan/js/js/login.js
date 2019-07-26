function main(){
    var btn=$('#btn');
    btn.click(function(e){
        
        var user=$('#name').val();
        var password=$('#password').val();
        $.ajax({
            type:'post',
            url:'http://localhost:8080/Smartisan/php/login.php',
            data:{
                name:user,
                password:password
            },
            success:function(data){
                var data = JSON.parse(data);
                if(data.info=="passwordwrong"){
                    alert("密码错误");
                }else if(data.status=="noregister")
                {
                    alert("该账号未注册")
                }else if(data.info=="success"){
                location.href='http://localhost:8080/Smartisan/index.html?name='+user;
                }
               
            }
        })
        e.preventDefault();
    })
   
}
window.onload=main;