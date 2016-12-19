/**
 * Created by Administrator on 2016/12/13.
 */
$(function (){
    var slide=$(".small"),startX= 0,endX=0;
    slide.on('touchstart',function (e){
        startX= e.originalEvent.touches[0].clientX;
    });
    slide.on('touchend',function (e){
        endX= e.originalEvent.changedTouches[0].clientX;
        console.log(startX);
        console.log(endX);
    });

});