function secondMenu(){
    var ul2=document.querySelectorAll('#border_border>ul');
    var ul1=document.querySelectorAll('#head_sec>ul>li');
    for(var i=0;i<ul1.length;i++){
        ul1[i].index=i;
        ul1[i].onmousemove=function(){
            for(var m=0;m<ul1.length;m++){
                ul2[m].style.display='none';
            }
            ul2[this.index].style.display='block';
        }
        ul1[i].onmouseout=function(){
            for(var m=0;m<ul1.length;m++){
                ul2[m].style.display='none';
            }
        }
        ul2[i].onmousemove=function(){
            for(var m=0;m<ul2.length;m++){
                ul2[m].style.display='block';
            }
        }
        ul2[i].onmouseout=function(){
            for(var m=0;m<ul2.length;m++){
                ul2[m].style.display='none';
            }
        }
    }
}
function Banner(){
    this.Banner = $("#banner");
    this.ul = $("#banner>ul");
    this.aLi = $("#banner>ul>li");
    this.circular = $("#circular>a");
    this.iNow = 0;
    this.n = 0;
    this.timer = null;
    this.init();
}
Banner.prototype = {
    init:function(){
        this.autoPlay()
        this.bannerMouse();
        this.circularOver();
    },
    circularOver:function(){
       $.each(this.circular,this.handleEach.bind(this))
    },
    handleEach(index){
        this.circular.eq(index).mouseover(this.handlecircularOverCb.bind(this,index))
    },
    handlecircularOverCb(index){
        this.circular.eq(index).addClass("active").siblings().removeClass("active");
        this.n = index;
        this.toImg();
    },
    bannerMouse:function(){
        this.Banner.mouseover(this.handleOver.bind(this));
        this.Banner.mouseout(this.handleOut.bind(this))
    },
    handleOver(){
        clearInterval(this.timer);
    },
    handleOut(){
        this.autoPlay();
    },
    autoPlay(){
        this.timer = setInterval(this.handleAutoPlay.bind(this),3000)
    },
    handleAutoPlay(){
        if(this.n == this.aLi.length-1){
            this.n = 0;
        }else{
            this.n++;
        }
        this.toImg();
    },
    toImg(){
        this.aLi.eq(this.iNow).fadeTo(500,0);
        this.aLi.eq(this.n).fadeTo(500,1);
        this.iNow = this.n;
        this.circular.eq(this.n).addClass("active").siblings().removeClass("active");
    }
}

function main(){
    secondMenu();
    new Banner();
    if((location.href.split("?")[1])){
        var name=$("#name");
        console.log(name);
        name.text(location.href.split("?")[1].split("=")[1])
    }
   
}
window.onload=main;