$(function (){
    var btn=$('.btn'),
        startX=0,endX=0,
        iter=true;
    btn.mousedown(function (e){
        iter=true;
        startX=e.clientX;
        btn.mousemove(function (e){
            console.log(iter);
            if(iter){
                endX=e.clientX;
	            if(endX-startX>300){
		            btn.css('left','300px');
	            }
                else if(endX-startX>0){
                    btn.css("left",30+endX-startX);
                }
            }
        });
    });
    $('body').mouseup(function (){
        iter=false;
        if(endX-startX<140){
            btn.css("left",'30px');
        }
        else if(endX-startX>300){
	        btn.css('display','none');
	        $('#head').removeClass('bg').addClass('bg2');
        }
        else{
            btn.animate({'left':'300px'},500);
            setTimeout(function (){
                btn.css('display','none');
                $('#head').removeClass('bg').addClass('bg2');
            },500);
        }
    })
});