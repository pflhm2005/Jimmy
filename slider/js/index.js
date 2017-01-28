$(function (){
    var div=document.getElementById('div'),
        Left=Top=Right=Bottom=false;

    setInterval(function (){
        if(Left)
            div.style.left=div.offsetLeft-10+"px";
        if(Top)
            div.style.top=div.offsetTop-10+"px";
        if(Right)
            div.style.left=div.offsetLeft+10+"px";
        if(Bottom)
            div.style.top=div.offsetTop+10+"px";
    },40);

    $(document).keydown(function (event){
        switch (event.keyCode){
            case 37:
                Left=true;
                break;
            case 38:
                Top=true;
                break;
            case 39:
                Right=true;
                break;
            case 40:
                Bottom=true;
                break;
        }
        return false;
    });
    $(document).keyup(function (event){
        switch (event.keyCode){
            case 37:
                Left=false;
                break;
            case 38:
                Top=false;
                break;
            case 39:
                Right=false;
                break;
            case 40:
                Bottom=false;
                break;
        }
        return false;
    });
});