$(function (){
    function getRandom(num){return Math.ceil(Math.random()*num);}
    $('#btn').click(function (){
        var r, g, b, num,
            ul=[], color,
            row=parseInt($('#row').val()),
            col=parseInt($('#col').val());
        //var t=document.getElementById('table');
        //t.innerHTML="";
        var t=$('#table');
        t.html("");
        if(isNaN(row)||isNaN(col)){
            alert("别乱输入啊");
        }
        else{
            for(var i=0;i<row;i++){
                ul.push(document.createElement('ul'));
                for(var j=0;j<col;j++){
                    r=getRandom(254);
                    g=getRandom(254);
                    b=getRandom(254);
                    color="rgb("+r+","+g+","+b+")";
                    num=getRandom(100);
                    var li=$('<li>'+num+'</li>');
                    li.css("background",color);
                    li.appendTo(ul[i]);
                }
                t.append(ul[i]);
            }
        }
    });
});