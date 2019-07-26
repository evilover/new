function main(){
    var btn=$('#btn');
    console.log(btn);
    var name=$('#name');
    
    var password=$('#password');
    console.log(name);
    console.log(password);
    name.blur(function(){
        var reg = /^[a-zA-Z0-9_-]{4,16}$/;
        if(!(reg.test($('#name').val()))){
            $('#name').val('用户名不合法');
             var timer=setTimeout(function(){
            $('#name').val('');
        },600)
        }
       
    })
    password.blur(function(){
        console.log($('#password').val())
        if(!$('#password').val()){
            $('#password').attr('type','text')
            $('#password').val('密码不能为空');
            var timer=setTimeout(function(){
                $('#password').attr('type','password')
                $('#password').val('');
            },600)
        }
        
    })
    btn.click(function(e){
        
        var user=$('#name').val();
        var password=$('#password').val();
        console.log(user);
        $.ajax({
            type:'post',
            url:'http://localhost:8080/Smartisan/php/register.php',
            data:{
                name:user,
                password:password,
            },
            success:function(data){
                var data=JSON.parse(data);
               //console.log(data);
                if(data.status=="false"){
                    alert(data.info)
                }
                if(data.indo=="true"){
                    location.href="login.html"
                }
            }
        })
        e.preventDefault();
    })
   
}
window.onload=main;