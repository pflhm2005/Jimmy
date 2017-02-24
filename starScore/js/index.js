$(function (){
    var num= 0,
        li=$('li+li'),
        iter=true,
        len=$('li').length- 1,
        p=$("p");
        span=$("span");
    li.hover(function (){
        //that=this;
        num=this.innerHTML;
        p.css('left',40+(num-1)*30);
        switch (num) {
            case "1":
                p.html("<p><b>1星:</b>很不满意|差得太离谱，与卖家描述的严重不符，非常不满</p>");
                break;
            case "2":
                p.html("<p><b>2星:</b>不满意|部分有破损，与卖家描述的不符，不满意</p>");
                break;
            case "3":
                p.html("<p><b>3星:</b>一般|质量一般，没有卖家描述的那么好</p>");
                break;
            case "4":
                p.html("<p><b>4星:</b>满意|质量不错，与卖家描述的基本一致，还是挺满意的</p>");
                break;
            case "5":
                p.html("<p><b>5星:</b>非常满意|质量非常好，与卖家描述的完全一致，非常满意</p>");
                break;
        }
        for(var i=0;i<num;i++){
            li.eq(i).addClass('on');
            p.addClass("on");
        }
        //go();
    },function (){
        p.html("");
        for(var i=0;i<len;i++){
            li.eq(i).removeClass('on');
        }
        p.removeClass("on");
    });
    li.click(function (){
        num=this.innerHTML;
        fresh();
        for(var i=0;i<num;i++){
            li.eq(i).css("backgroundPositionY",-28);
        }
        span[0].innerHTML=p[0].innerText;
        p.eq(0).css('display',"none");
    });
    function fresh(){
        var len=$('li').length-1;
        for(var i=0;i<len;i++){
            li.eq(i).css("backgroundPositionY",0);
        }
    }
});