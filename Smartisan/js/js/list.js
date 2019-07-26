function secondMenu() {
  var ul2 = document.querySelectorAll("#border_border>ul");
  var ul1 = document.querySelectorAll("#head_sec>ul>li");
  for (var i = 0; i < ul1.length; i++) {
    ul1[i].index = i;
    ul1[i].onmousemove = function() {
      for (var m = 0; m < ul1.length; m++) {
        ul2[m].style.display = "none";
      }
      ul2[this.index].style.display = "block";
    };
    ul1[i].onmouseout = function() {
      for (var m = 0; m < ul1.length; m++) {
        ul2[m].style.display = "none";
      }
    };
    ul2[i].onmousemove = function() {
      for (var m = 0; m < ul2.length; m++) {
        ul2[m].style.display = "block";
      }
    };
    ul2[i].onmouseout = function() {
      for (var m = 0; m < ul2.length; m++) {
        ul2[m].style.display = "none";
      }
    };
  }
}

function click() {
  var sort = $(".sort>li");
  sort.click(function(){
   $(this).addClass("active").siblings().removeClass();
  });
}
function render() {
  $.ajax({
        url:"data.json",
        success:function(data){
            var str = "";
            for(var i=0;i<data.length;i++){
             str += `<li data_id=${data[i].goods_id}>
                  <i>限时特惠</i>
                  <div class='img'>
                      <img src=${data[i].goods_img[0]} alt="">   
                  </div>
                  <div class='circul'>`;
                  for(var m=0;m<data[i].goods_img.length;m++){
                    str +="<a href='' data_src="+data[i].goods_img[m]+"></a>";  
               }
                str+=`</div>
                  <h3>${data[i].goods_name}</h3>
                  <p>${data[i].goods_title}</p>
                  <span>￥${data[i].goods_price}.00</span>
                  </li>`;    
              }
              $(".list").html(str);
        }
  })
  
}
function mouseover2() {
  var timer=setTimeout(function(){
    var img = $(".img>img");
    var a = $(".circul>a");
    a.mouseover(function() {
        //console.log($(this).parent().prev().children());
        $(this).parent().prev().children().attr("src", $(this).attr("data_src"));
    });
  },500);
  }
function sort(){
    var volume=$('#volume');
    var priceI=$('#priceI');
    var priceD=$('#priceD');
    var defaultS=$('#defaults');
    
    var arr=[];
    var arr2=[];
    $.ajax({
        url:"data.json",
        success:function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                var id=data[i].goods_id;
                var price=data[i].goods_price;
                var volume=data[i].goods_volume;
                arr.push({id,price});
                arr2.push({id,volume});    
            }
        }
    })
    defaultS.click(function(){
      $.ajax({
        url:"data.json",
        success:function(data){
            var str = "";
            console.log(data)
            for(var i=0;i<data.length;i++){
             str += `<li>
                  <i>限时特惠</i>
                  <div class='img'>
                      <img src=${data[i].goods_img[0]} alt="">   
                  </div>
                  <div class='circul'>`;
                  for(var m=0;m<data[i].goods_img.length;m++){
                    str +="<a href='' data_src="+data[i].goods_img[m]+"></a>";  
               }
                str+=`</div>
                  <h3>${data[i].goods_name}</h3>
                  <p>${data[i].goods_title}</p>
                  <span>￥${data[i].goods_price}.00</span>
                  </li>`;    
              }
              $(".list").html(str);
        }
  })
    })
    volume.click(function(){
        for (var i = 0; i < arr2.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr2[i].volume > arr2[j].volume) {
                    temp = arr2[i];
                    arr2[i] = arr2[j];
                    arr2[j] = temp;
                }
            }
        }
        console.log(arr2)
        $('.list').html('');
        $.ajax({
          url:"data.json",
          success:function(data){
              var str = "";
              for(var i=0;i<data.length;i++){
                console.log(data[arr2[i].id-1],i);
               str += `<li>
                    <i>限时特惠</i>
                    <div class='img'>
                        <img src=${data[arr2[i].id-1].goods_img[0]} alt="">   
                    </div>
                    <div class='circul'>`;
                    for(var m=0;m<data[arr2[i].id-1].goods_img.length;m++){
                      str +="<a href='' data_src="+data[arr2[i].id-1].goods_img[m]+"></a>";  
                 }
                  str+=`</div>
                    <h3>${data[arr2[i].id-1].goods_name}</h3>
                    <p>${data[arr2[i].id-1].goods_title}</p>
                    <span>￥${data[arr2[i].id-1].goods_price}.00</span>
                    </li>`;    
                }
                $(".list").html(str);
          }
    })

    })
    priceI.click(function(){
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].price > arr[j].price) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    console.log(arr);
    $('.list').html('');
    $.ajax({
      url:"data.json",
      success:function(data){
          var str = "";
          for(var i=0;i<data.length;i++){
            console.log(data[arr[i].id-1],i);
           str += `<li>
                <i>限时特惠</i>
                <div class='img'>
                    <img src=${data[arr[i].id-1].goods_img[0]} alt="">   
                </div>
                <div class='circul'>`;
                for(var m=0;m<data[arr[i].id-1].goods_img.length;m++){
                  str +="<a href='' data_src="+data[arr[i].id-1].goods_img[m]+"></a>";  
             }
              str+=`</div>
                <h3>${data[arr[i].id-1].goods_name}</h3>
                <p>${data[arr[i].id-1].goods_title}</p>
                <span>￥${data[arr[i].id-1].goods_price}.00</span>
                </li>`;    
            }
            $(".list").html(str);
      }
})
    })
    priceD.click(function(){
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++){
            if (arr[i].price < arr[j].price) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    console.log(arr);
    $('.list').html('');
    $.ajax({
      url:"data.json",
      success:function(data){
          var str = "";
          for(var i=0;i<data.length;i++){
            console.log(data[arr[i].id-1],i);
           str += `<li>
                <i>限时特惠</i>
                <div class='img'>
                    <img src=${data[arr[i].id-1].goods_img[0]} alt="">   
                </div>
                <div class='circul'>`;
                for(var m=0;m<data[arr[i].id-1].goods_img.length;m++){
                  str +="<a href='' data_src="+data[arr[i].id-1].goods_img[m]+"></a>";  
             }
              str+=`</div>
                <h3>${data[arr[i].id-1].goods_name}</h3>
                <p>${data[arr[i].id-1].goods_title}</p>
                <span>￥${data[arr[i].id-1].goods_price}.00</span>
                </li>`;    
            }
            $(".list").html(str);
      }
})
  })
}
function skip(){
  var list=document.getElementsByClassName('list')[0];
  list.addEventListener("click", function (e) {
    var e = e || event;
    var target = e.target || e.srcElement;
   // console.log(target.parentNode.parentNode);
    if (target.parentNode.parentNode.tagName == "LI") {
       var data = target.parentNode.parentNode.getAttribute("data_id");
        console.log(data);
       location.href = "detail.html?id=" + data;
    }
})
}
function main() {
  secondMenu();
  click();
  render();
  mouseover2();
  sort();
  skip();
}
window.onload = main;


