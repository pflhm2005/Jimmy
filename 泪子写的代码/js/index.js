/**
 * Created by Administrator on 2016/12/13.
 */
$(function (){
    //同步加载图片
    $.ajax({
        url:'text.json',
        async:false,
        success:function (data){
            data={list:data};
            var list=template('s-pic',data);
            $('.s-pic').html(list);
            var list2=template('pic',data);
            $('.pic').html(list2);
        }
    });

    var num= 0,
        lastnum= 0,
        max_num=$('.s-pic li').length-1,
        slide=$('.s-pic'),
        startX= 0,
        endX=0;

    //初始化
    $('.pic img').eq(0).css("opacity",1);
    //左右按钮浮现
    $('.slide').hover(function (){
        $('.btn_l').animate({'left':0},500);
        $('.btn_r').animate({'right':0},500);
    },function (){
        $('.btn_l').animate({'left':"-20px"},500);
        $('.btn_r').animate({'right':"-20px"},500);
    });
    //前一张
    function next(){
        if(num==0){num=max_num;}
        else{num--;}
        huan();
    }
    //后一张
    function prev(){
        if(num==max_num){num=0;}
        else{num++;}
        huan();
    }
    //左右按钮点击
    $('.btn_l').click(function (){next();});
    $('.btn_r').click(function (){prev();});
    //图片点击
    $('li').click(function (){
        num=$(this).html();
        huan();
    });
    //图片更换
    function huan(){
        $('.pic img').eq(lastnum).stop().animate({"opacity":0},500).
            css("z-index",1).end().eq(num).css("z-index",9).stop().animate({"opacity":1},500);
        if(num==0){
            $('.s-pic').stop().animate({"left":0},300)
        }
        else if(num==max_num){
            $('.s-pic').stop().animate({"left":-720},300)
        }
        else{
            $('.s-pic').stop().animate({"left":-num*80},300);
        }
        lastnum=num;
    }
    //小图拖动
    slide.on('touchstart',function (e){
        startX= e.originalEvent.touches[0].clientX;
    });
    slide.on('touchend',function (e){
        endX= e.originalEvent.changedTouches[0].clientX;
        if(startX-endX>0){prev();}
        else{next();}
    })
});