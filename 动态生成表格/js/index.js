$(function (){

    //生成随机数
    function getRandom(num){return Math.floor(Math.random()*num);}

    //生成按钮
    $('#btn').click(function (){
        createTable(parseInt($('#row').val()),parseInt($('#col').val()));
    });

    //清空容器
    function fresh(t){
        t.html("");
    }

    //ul设宽
    function setWidth(col,width){
        $("ul").css("width",col*width+"px");
    }
    
    //获得随机颜色
    function getColor(){
        for(var i=0,arr=[];i<6;i++){
            arr.push(getRandom(16).toString(16));
        }
        return "#"+arr.join("");
        // return "#"+getRandom(0xffffff).toString(16);
    }
    console.log(getColor());

    //生成表格
    function createTable(row,col,tar){
        if(isNaN(row) || isNaN(col)){
            return ;
        }
        var t = tar || $("#table");
        fresh(t);
        for(var i=0,ul=[];i<row;i++){
            ul.push($("<ul>"));
            for(var j=0;j<col;j++){
                var li=$('<li>'+getRandom(100)+'</li>');
                li.css("background",getColor());
                li.appendTo(ul[i]);
            }
            t.append(ul[i]);
        }
        setWidth(col,40);
    }
    

    //随机按钮
    $('#btn_random').click(function () {
        createTable(getRandom(40)+10,getRandom(40)+10);
    });
});