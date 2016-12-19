$(function (){
    var num= 0,
        li=$('li+li'),
        iter=true,
        len=$('li').length- 1,
        p=document.getElementsByTagName('p')[0],
        span=document.getElementsByTagName('span')[0];
    //var l=document.getElementsByTagName("li");
    //var l2=$('li');
    //类数组 6个元素
    //console.log(l);
    //类数组 7个元素 多出一个对象prevObject
    //console.log(l2);
    li.hover(function (){
        //that=this;
        num=this.innerHTML;
        $('p').eq(0).css('left',40+(num-1)*30);
        switch (num) {
            case "1":
                p.innerHTML='<p><b>1</b>分 很不满意</p>';
                break;
            case "2":
                p.innerHTML='<p><b>2</b>分 不满意</p>';
                break;
            case "3":
                p.innerHTML='<p><b>3</b>分 一般</p>';
                break;
            case "4":
                p.innerHTML='<p><b>4</b>分 满意</p>';
                break;
            case "5":
                p.innerHTML='<p><b>5</b>分 非常满意</p>';
                break;
        }
        for(var i=0;i<num;i++){
            //li.eq(i).css("backgroundPositionY",-28);
            li.eq(i).addClass('on');
        }
        //go();
    },function (){
        p.innerHTML="";
        for(var i=0;i<len;i++){
            //li.eq(i).css("backgroundPositionY",0);
            li.eq(i).removeClass('on');
        }
    });
    //点击事件
    li.click(function (){
        num=this.innerHTML;
        console.log(num);
        fresh();
        for(var i=0;i<num;i++){
            li.eq(i).css("backgroundPositionY",-28);
        }
        span.innerHTML=p.innerText;
        $('p').eq(0).css('display',"none");
    });
    //重置星星
    function fresh(){
        var len=$('li').length-1;
        for(var i=0;i<len;i++){
            li.eq(i).css("backgroundPositionY",0);
        }
    }
});