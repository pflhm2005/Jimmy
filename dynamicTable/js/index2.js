$(function (){
    function getRandom(num){return Math.ceil(Math.random()*num);}
    $('#btn').click(function (){
        var r, g, b, num,
            ul=[], color,
            //横列输入
            row=parseInt($('#row').val()),
            col=parseInt($('#col').val()),
            t= $("#table");
        //清空屏幕
        t.html("");
        //判断输入
        if(isNaN(row)||isNaN(col)){
            return ;
        }
        else{
            //两层循环 row=行 col=列
            for(var i=0;i<row;i++){
                ul.push(document.createElement('ul'));
                for(var j=0;j<col;j++){
                    r=getRandom(254);
                    g=getRandom(254);
                    b=getRandom(254);
                    //生成颜色
                    color="rgb("+r+","+g+","+b+")";
                    //生成随机数
                    num=getRandom(100);
                    var li=$('<li>'+num+'</li>');
                    //设置样式
                    li.css("background",color);
                    li.appendTo(ul[i]);
                }
                //将生成的元素添加到标签中
                t.append(ul[i]);
            }
            //设置宽度
            $("ul").css("width",col*40+"px");
        }
    });
});