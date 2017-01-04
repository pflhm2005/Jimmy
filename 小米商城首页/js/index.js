$(function (){
    //输入框
    (function (){
        var sear = $('.search>input'),
            btn = $('.search>button'),
            div = $('.search>div');
        sear.focus(function (){
            sear.css("border-color","#ff6700");
            btn.css("border-color","#ff6700");
            div.fadeOut();
        });
        sear.blur(function (){
            sear.css("border-color","#e0e0e0");
            btn.css("border-color","#e0e0e0");
            div.fadeIn();
        })
    })();

    //导航hover
    (function (){
        var nav = $('.nav>li');
        nav.hover(function (){
            $(this).css("background","rgba(255,103,0,1)");
        },function (){
            $(this).css("background","rgba(0,0,0,0)");
        });
    })();

    //nav轮播图
    (function (){
        var btn_r = $('.btn_r'),
            img = $('.pic>a'),
            btn = $('.btn>li'),
            slide = $('.slide'),
            len = img.length,
            timer,
            num = 0,
            lastnum = 0;
        //按钮显示
        slide.hover(function (){
            btn_r.stop().animate({'right':0});
        },function (){
            btn_r.stop().animate({'right':-41+"px"});
        });
        //初始化
        img.eq(0).css("opacity",1);
        btn.eq(0).addClass("red");
        //下一张按钮
        btn_r.click(function (){
            if(num == len-1){
                num = 0;
            }
            else{
                num++;
            }
            change();
        });
        //小圆点按钮hover事件
        btn.hover(function (){
            num = Number(this.innerHTML)-1;
            change();
        });
        //轮播图函数
        function change(){
            img.eq(lastnum).stop().animate({"opacity":0},500).
                end().eq(num).stop().animate({"opacity":1},500);
            btn.eq(lastnum).removeClass('red').end().eq(num).addClass("red");
            lastnum = num;
        }
        //自动播放
        function autoPlay(){
            timer = setInterval(function (){
                btn_r.click();
            },2000);
        };
        autoPlay();
        //鼠标进入事件
        slide.hover(function (){
            clearInterval(timer);
        },function (){
            autoPlay();
        })
    })();
});