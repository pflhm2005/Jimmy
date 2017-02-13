/*
    使用说明:

    本插件依赖jQuery 样式已定义在slide.css当中 
    文件按slide.css,jquery,slide.js顺序引入

    结构必须按下定义，ID与类请保持一致:
    <div id="slide">
        <div class="btn_l"></div>
        <div class="btn_r"></div>
        <ul class="pic">
            <li><img src=".."></li>
            ...
            <li><img src=".."></li>
        </ul>
        <ul class="dot"></ul>
    </div>

************只需要复制li标签并填写img标签的src属性***********

    引入方式:页面底部调用$(#silde).slide(obj)可传入4个参数
    width,height:轮播图宽高 必须在css或者传参定义
    autoplay:传入false关闭轮播 数值为轮播间隔 默认2秒
    dot:传入false禁用下方小圆点 默认显示

    示例:
    $(#silde).slide({
        width:300,
        height:200,
        autoplay:1000,
        dot:true,
    })
*/
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function($){
    $.fn.slide = function(obj){
        var prev_btn = this.find(".btn_l"),
            next_btn = this.find(".btn_r"),
            pic = this.find('.pic').children(),
            _dot = this.find(".dot"),
            num = 0,
            lastnum = 0,
            len = pic.length,
            timer = null,
            _obj = obj || {};
        
        //参数修正
        options = {
            dot:_obj.dot === false ?  false :  true,
            autoplay:typeof _obj.autoplay === "number" ? 
            _obj.autoplay :
            _obj.autoplay === false ? false : 2000,
            width:isNaN(_obj.width) ? false : _obj.width,
            height:isNaN(_obj.height) ? false : _obj.height,
        };

        //设轮播图区域宽高
        if(options.width && options.height){
            this.css({width:options.width+"px",height:options.height+"px"});
        }
        
        //初始化框的定位与边距
        this.css({position:"relative",margin:"0 auto",overflow:"hidden",left:0,top:0});

        //根据高度设定箭头文字大小
        var s_height = parseInt(this.css("height")),
            per = 12,
            per2 = 25;
        $(prev_btn).css("fontSize",s_height/per+"px").html("<");
        $(next_btn).css("fontSize",s_height/per+"px").html(">");
        
        //插入对应图片数量的小圆点
        var count = len;
        while(count--){
            _dot.prepend($("<li style='width:"+s_height/per2+"px;height:"+s_height/per2+"px'>" + count + "</li>"));
        }
        var li = _dot.children();
        li.eq(0).addClass("on");

        //默认显示第一张
        pic.eq(num).css("opacity",1);

        //两侧箭头出现
        this.hover(()=>{
            clearInterval(timer);
            prev_btn.stop().animate({left:0},500);
            next_btn.stop().animate({right:0},500);
        },()=>{
            timer = autoplay(options.autoplay);
            prev_btn.stop().animate({left:"-10%"},500);
            next_btn.stop().animate({right:"-10%"},500);
        });

        //小圆点hover切换图片
        li.hover(function(){
            num = $(this).html();
            change();
        });

        //箭头点击切换图片
        prev_btn.click(()=>{
            num = num === 0 ? len - 1 : num - 1;
            change();
        });
        next_btn.click(()=>{
            num = num == len-1 ? 0 : num + 1;
            change();
        });

        //参数函数
        (function handle(){
            options.dot ? true : _dot.css("display","none");
            options.autoplay ? timer = autoplay(options.autoplay) : false;
        })(options);

        //轮播函数
        function autoplay(time){
            return time ? setInterval(()=>{
                next_btn.click();
            },time) : false;
        }

        //切换图片
        function change(){
            pic.eq(lastnum).stop().animate({opacity:0},500)
            .end().eq(num).stop().animate({opacity:1},500);
            li.eq(lastnum).removeClass("on");
            li.eq(num).addClass("on");
            lastnum = num;
        }
    }
}));