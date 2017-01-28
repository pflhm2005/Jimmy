window.onload=function (){
    var tsec=document.getElementsByTagName('span')[2],
        tmin=document.getElementsByTagName('span')[0],
        tinput=document.getElementsByTagName('input')[0],
        sec=parseInt(tsec.innerHTML),
        min=parseInt(tmin.innerHTML),
        id= 0,
        iter=true;
    tinput.addEventListener('click',function (){
        if(iter){
            tinput.setAttribute('class',"red");
            tinput.setAttribute('value','暂停');
            iter=false;
            autoPlay();
        }else{
            tinput.setAttribute('class',"");
            tinput.setAttribute('value','启动');
            iter=true;
            pause();
        }
    });
    function pause(){
        clearTimeout(id);
    }
    function autoPlay(){
        if(sec==0&&min==0){
            clearTimeout(id);
            return ;
        }
        if(sec>-1){
            id=setTimeout(function (){
                tsec.innerHTML=sec<11?"0"+--sec:--sec;
                autoPlay();
            },1000)
        }
        else if(sec==-1&&min!=0){
            tmin.innerHTML=min<11?"0"+--min:--min;
            sec=59;
            tsec.innerHTML=sec;
            autoPlay();
        }
    }
};