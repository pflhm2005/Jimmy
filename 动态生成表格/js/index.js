$(function (){
    function getRandom(num){
        return Math.ceil(Math.random()*num);
    }
    $('#btn').click(function (){
        var r=getRandom(254),
            g=getRandom(254),
            b=getRandom(254);
        var color="rgb("+r+","+g+","+b+")";
        $('#d').css('background',color);
        var row=parseInt($('#row').val());
        var col=parseInt($('#col').val());


    });
});