function total() {
    var summer = 0;
    var number = 0;
    var sum = $(".shop_list>li").each(function () {
        //if($(this).children().eq(1))
        if ($(this).children().eq(0).children().eq(0).prop("checked")) {
            //console.log($(this).children().eq(0).children().eq(0).prop("checked"))
            number += Number($(this).children().eq(4).children().eq(1).val());
            //console.log(Number($(this).children().eq(4).children().eq(1).val()))
            summer += Number(($(this).children().eq(5).text().trim().slice(1)))
            //console.log(Number(($(this).children().eq(5).text().trim().slice(1))));
            //console.log(summer);
            //console.log(number);
        }
        $(".number1").text(number);
        $(".number2").text(number);
        $(".sumNumber").text("￥" + summer + ".00");
    });
}
function del(){
    var del=$(".del");
    del.click(function(){
        
    var name=$(this).parent().parent().children().eq(2).text().trim();
        $.ajax({
            url:"http://localhost:8080/Smartisan/php/shopcardel.php",
            type:"post",
            data:{
                goods_name:name
            },
            success:function(data){
                console.log(JSON.parse(data))
            $(this).parent().parent().remove();
                render();
            },
        })
    })
}
function select() {
    var allselect = document.getElementsByClassName("allselect");
    //console.log(allselect);
    var select = document.getElementsByClassName("select");
    //console.log(select);
    for (var i = 0; i < allselect.length; i++) {
        allselect[i].onchange = function () {
            if (this.checked) {
                for (var m = 0; m < select.length; m++) {
                    select[m].checked = true;
                }
                for (var j = 0; j < allselect.length; j++) {
                    allselect[j].checked = true;
                }
            } else {
                for (var m = 0; m < select.length; m++) {
                    select[m].checked = false;
                }
                for (var j = 0; j < allselect.length; j++) {
                    allselect[j].checked = false;
                }
            }
            total()
        }
    }
    for (var o = 0; o < select.length; o++) {
        select[o].onchange = function () {
            for (var j = 0; j < select.length; j++) {
                if (!select[j].checked) {
                    for (var n = 0; n < allselect.length; n++) {
                        allselect[n].checked = false;
                    }
                    break;
                } else {
                    for (var n = 0; n < allselect.length; n++) {
                        allselect[n].checked = true;
                    }
                }
            }
            total()
        }
    }
}

function changeNum() {
    var dec = $(".dec");
    var add = $(".add");
    var sum = $(".sum");
    var num = Number($(".shop_number").val());
    dec.click(function () {
       
        
        if (num > 1) {
            num -= 1;
        }
        $(this).next().val(num);
        
        $(this).parent().next().children().text("￥" + num *Number($(this).parent().prev().text().trim().slice(1)) + ".00");
        total();
    })
    add.click(function () {
        var num = Number($(this).prev().val());
        var num = Number($(".shop_number").val());
        var _this = $(this);
        num += 1;
        $(this).prev().val(num);
        $(this).parent().next().children().text("￥" + num *Number($(this).parent().prev().text().trim().slice(1)) + ".00");
        total();
    })

}

function render() {

    $.ajax({
        type: "post",
        url: "http://localhost:8080/Smartisan/php/shoprender.php",
        success: function (data) {
            var list = $(".shop_list");
            console.log(list)
            var str = '';
            var data = JSON.parse(data);
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                str += ` <li>
                <div class="first">
                    <input type="checkbox" class="select"checked="checked">
                </div>
                <div class="shop_img">
                    <img src="${data[i][3]}" alt="">
                </div>
                <div class="shop_name">
                    <h3>${data[i][2]}</h3>
                </div>
                <div class="shop_price">
                    <p class="price">￥${data[i][4]}.00</p>
                </div>
                <div class="shop_num">
                    <span class="dec">-</span>
                    <input class="shop_number"type="text" value="${data[i][6]}">
                    <span class="add">+</span>
                </div>
                <div class="shop_sum">
                    <p class="sum">￥${data[i][5]}.00</p>
                </div>
                <div class="operate">
                    <button class="del">X</button>
                </div>
            </li>`
            }
            list.html(str);
            select();
            changeNum();
            total();
            del();
        },
        error: function () {
            console.log("请求失败");
        }

    })
}

function main() {
    render();
}
window.onload = main;