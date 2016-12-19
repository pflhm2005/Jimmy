$(function (){
    var img=$('img');
    //img.hover(function (e){
    //    $(this).css({width:"+=100px",height:'+=100px'})
    //},function (){
    //    $(this).css({width:"-=100px",height:'-=100px'})
    //});
    img.mousemove(function (e){
        var x=e.clientX,        //200-300
            ix=this.offsetLeft, //¶¨Öµ200
            w=this.width-10;       //100-200
        var sub=x-ix;           //0-100
        console.log(this.width);
        if(sub<w/2){
            $(this).css({width:"+=1px",height:"+=1px"});
        }
        else{
            $(this).css({width:"-=2px",height:"-=2px"});
        }
    });
});


//ix:200
//x:200-300