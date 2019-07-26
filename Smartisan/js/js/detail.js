function Events() {
    this.filter = $('.filter');
    this.img = $('.img');
    this.bigImg = $('.bigImg');
    this.js_big = $('#js_big');
    this.init();
}
Events.prototype = {
    init: function () {
        this.small();
    },
    small: function () {
        //console.log(this.img)
        this.img.mouseover(this.overcallback.bind(this, this.img));
        this.img.mouseout(this.outcallback.bind(this, this.img));
    },
    overcallback: function (e) {
        this.filter.css('display', 'block');
        this.bigImg.css('display', 'block');
        this.img.mousemove(this.movecallback.bind(this));
    },
    movecallback: function (e) {
        e = e || window.event;
        var x = e.pageX - $('.img').offset().left;
        var y = e.pageY - $('.img').offset().top;
        if (x < 119) {
            x = 119;
        }
        if (x > 356) {
            x = 356;
        }
        if (y < 119) {
            y = 119;
        }
        if (y > 356) {
            y = 356;
        }

        this.filter.css({
            "left": x - 119 + 'px',
            "top": y - 119 + 'px'
        });
        this.js_big.css({
            'left': -(x - 119) * 2 + "px",
            'top': -(y - 119) * 2 + "px"
        })
    },
    outcallback: function (e) {
        this.filter.css('display', 'none');
        this.bigImg.css('display', 'none')
    }
}

function render() {
    $.ajax({
        url: "http://localhost:8080/Smartisan/page/data3.json",
        success: function (data) {
            //console.log(data);
            var id = location.href.split("?")[1].split("=")[1];
            //console.log(id);
            var main1 = $('.main1');
            var index;
           // console.log(data[0].goods_id);
            for (var i = 0; i < data.length; i++) {
                if (data[i].goods_id == id) {
                    index = i;
                    //console.log(index);
                    break;
                }
            }
            var str = `<div class='container1' data_id=${data[index].goods_id}>
            <div class='show'>
                <ul class='smallimg'>`
            for (var m = 0; m < data[index].goods_smallImg.length; m++) {
                str += ` <li>
                   <div><img data_src="${data[index].goods_dataSrc[m]}"src="${data[index].goods_smallImg[m]}" alt=""></div>
                  </li>`
            }
            str += `</ul>
                <div class='img'>
                    <div class='filter'></div>
                    <img src="${data[index].goods_dataSrc[0]}" alt="">
                </div>
            </div>
            <div class='bigImg'>
                <img id='js_big' src="${data[index].goods_dataSrc[0]}" alt="">
            </div>
            <ul class='detail'>
                <li>
                    <h2 class="tit">${data[index].goods_name}</h2>
                    <p>${data[index].goods_des}</p>
                    <span id="now">￥${data[index].goods_price}.00</span>
                    <del id="pre">￥${data[index].goods_pre}.00</del>
                </li>
                <li>
                    <h4>促销活动</h4>
                    <p><span>限时特惠</span>${data[index].goods_title}</p>
                </li>
                <li>
                    <h4>颜色选择</h4>
                    <a href=""><span></span></a>
                    <a href=""><span></span></a>
                    <a href=""><span></span></a>
                </li>
                <li>
                    <h4>版本选择</h4>`
            for (var n = 0; n < data[index].goods_type.length; n++) {
                str += `<i>${data[index].goods_type[n]}</i>`
            }
            str += `</li>
                <li>
                    <h4>数量选择</h4>
                    <div>
                    <span class='dec'>-</span>
                    <input type="text"id='num' value='1'>
                    <span class='add'>+</span>
                    </div>
                </li>
                <li>
                    <h4>服务说明</h4>`
            for (var j = 0; j < data[index].goods_server.length; j++) {
                str += `<p>${data[index].goods_server[j]}</p>`
            }
            str += `</li>
            </ul>
        </div>
        <div class='information'>
        <h2>产品信息</h2>
        <ul class="list">`
            for (var l = 0; l < data[index].goods_big.length; l++) {
                str += `<li>
            <img src="${data[index].goods_big[l]}" alt="">
        </li>`
            }
            str += `
        </ul>
        </div>`;
            main1.html(str);
            new Events();
            over();
            number();
            lazyload(index);

        },
        error: function () {
            console.log("请求失败");
        }
    })
}

function render2() {
    $.ajax({
        url: "http://localhost:8080/Smartisan/page/data3.json",
        success: function (data) {
            //console.log(data);
            var id = location.href.split("?")[1].split("=")[1];
            //console.log(id);
            var main1 = $('.main1');
            var index;
            //console.log(data[0].goods_id);
            for (var i = 0; i < data.length; i++) {
                if (data[i].goods_id == id) {
                    index = i;
                    //console.log(index);
                    break;
                }
            }
            var shop = $(".shop");
            var str = `<div class='shopping'>
    <p>您选择了</p>
    <div class="sh">
        <h3 class="title">${data[index].goods_name} x </h3><input id="shop_num" type="text" value=1>
        <ul>
            <li>${data[index].goods_type[0]}</li>
        </ul>
    </div>
    <div class='go'>
        <div>
            <span id='price_num'>￥${data[index].goods_price}.00</span>
            <del id='pre_num'>￥${data[index].goods_pre}.00</del>
        </div>
        <button class="shopcar">加入购物车</button>
        <button class="skip">现在购买</button>
    </div>
</div>`
            shop.html(str);
            skip();
        }
    })
}

function secondMenu() {
    var ul2 = document.querySelectorAll('#border_border>ul');
    var ul1 = document.querySelectorAll('#head_sec>ul>li');
    for (var i = 0; i < ul1.length; i++) {
        ul1[i].index = i;
        ul1[i].onmousemove = function () {
            for (var m = 0; m < ul1.length; m++) {
                ul2[m].style.display = 'none';
            }
            ul2[this.index].style.display = 'block';
        }
        ul1[i].onmouseout = function () {
            for (var m = 0; m < ul1.length; m++) {
                ul2[m].style.display = 'none';
            }
        }
        ul2[i].onmousemove = function () {
            for (var m = 0; m < ul2.length; m++) {
                ul2[m].style.display = 'block';
            }
        }
        ul2[i].onmouseout = function () {
            for (var m = 0; m < ul2.length; m++) {
                ul2[m].style.display = 'none';
            }
        }
    }
}

function over() {
    var small = $(".smallimg>li>div>img");
    var big = $(".img>img");
    var bigimg = $('.bigImg');
    //console.log(big)
    //console.log(small);

    small.mouseover(function () {
        //console.log($(this).parent().parent().parent().parent().next().children().eq(0));
        $(this).parent().parent().parent().next().children().eq(1).attr("src", $(this).attr("data_src"));
        $(this).parent().parent().parent().parent().next().children().eq(0).attr("src", $(this).attr("data_src"));
    })
}

function number() {
    var num = Number($('#num').val());
    var dec = $('.dec');
    var add = $('.add');
    var now = Number($('#now').text().slice(1))
    var pre = Number($('#pre').text().slice(1));
    dec.click(function () {
        if (num > 1) {
            num -= 1;
            sum1 = num * now;
            sum2 = num * pre;
        }
        $('#num').val(num);
        $('#shop_num').val(num);
        $("#price_num").text("￥" + sum1 + ".00")
        $("#pre_num").text("￥" + sum2 + ".00")
    })
    add.click(function () {
        num += 1;
        sum1 = num * now;
        sum2 = num * pre;
        $('#num').val(num);
        $('#shop_num').val(num);
        $("#price_num").text("￥" + sum1 + ".00")
        $("#pre_num").text("￥" + sum2 + ".00")

    })

}

function lazyload(index) {
    var list = $(".list");
    $.ajax({
        url: "http://localhost:8080/Smartisan/page/data3.json",
        success: function (data) {
            //console.log(data);
            var str = "";
            var id = location.href.split("?")[1].split("=")[1];
            //console.log(id);
            var index;
            for (var i = 0; i < data.length; i++) {
                if (data[i].goods_id == id) {
                    index = i;
                    //console.log(index);
                    break;
                }
            }
            for (var i = 0; i < data[index].goods_big.length; i++) {
                str += `<li>
            <img class="lazyload" data-src=${data[index].goods_big[i]}>
            </li>`
            }
            $(".list").html(str);
            //var img = $(".list li img");
            var img = document.querySelectorAll(".list li img")
            //console.log(img);
            new LazyLoad(img, {
                root: null,
                rootMargin: "0px",
                threshold: 0
            });
        }
    })
}

function skip() {
    var car = $(".shopcar");
    var skip = $(".skip");
    var id = Number($(".container1").attr("data_id"));
    //console.log(id);
    var title = $(".tit").text();
    //console.log(title);
    var price = Number(Number($("#now").text().slice(1)).toFixed(2));
    //console.log(price);
   
    car.click(function () {
        var goods_img=$(".smallimg>li").eq(0).children().eq(0).children().eq(0).attr("src");
        //console.log(goods_img)
        var num=Number($("#num").val());
        var price_sum=Number($("#price_num").text().slice(1))
        console.log(price_sum);
        $.ajax({
            url: "http://localhost:8080/Smartisan/php/shopadd.php",
            type:"post",
            data: {
                goods_sum:price_sum,
                goods_id: id,
                goods_num:num,
                goods_name:title,
                goods_img:goods_img,
                goods_price: price 
            },
            success:function(data){
                console.log(JSON.parse(data));
            }
        })
    })
    skip.click(function () {
        // 跳转的时候由于要根据不同的LI进行不同的渲染，因此在后面加上?id=和获取到的当前LI的id值，从而进行渲染
        location.href = "shopcar.html?id";
    })
}

function main() {
    var id = location.href.split("?")[1].split("=")[1];
    var main1 = $('.main1');
    var index;
    $.ajax({
        url: "http://localhost:8080/Smartisan/page/data3.json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].goods_id == id) {
                    index = i;
                   // console.log(index);
                    break;
                }
            }
        }
    })
    new Events();
    secondMenu();
    render();
    render2();
}
window.onload = main;