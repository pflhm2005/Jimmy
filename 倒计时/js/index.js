window.onload=function (){
    var tsec=document.getElementsByTagName('span')[2],
        tmin=document.getElementsByTagName('span')[0],
        tinput=document.getElementsByTagName('input')[0],
        sec=parseInt(tsec.innerHTML),
        min=parseInt(tmin.innerHTML),
        id= 0,
        iter=true;
        //tclass=tinput.getAttribute('class');

    tinput.addEventListener('click',function (){
        if(iter){
            //setTimeout(function (){
            //    if(sec<11){
            //        tsec.innerHTML="0"+--sec;
            //    }
            //    else{
            //        tsec.innerHTML=--sec;
            //    }
            //},10);
            //tclass=tclass.concat('red');
            //�����
            tinput.setAttribute('class',"red");
            iter=false;
            autoPlay();
        }else{
            tinput.setAttribute('class',"");
            iter=true;
            pause();
        }
    });

    //��ͣ
    function pause(){
        clearTimeout(id);
    }
    function autoPlay(){
        if(sec==0&&min==0){
            clearTimeout(id);
            return ;
        }
        //Ϊ����ʾ0 ���������жϱ�Ϊ-1
        if(sec>-1){
            id=setTimeout(function (){
                //�����λ������ʾ
                if(sec<11){
                    tsec.innerHTML="0"+--sec;
                }
                else{
                    tsec.innerHTML=--sec;
                }
                autoPlay();
            },1000)
        }
        //���Ϊ0ʱ
        else if(sec==-1&&min!=0){
            if(min<10){
                tmin.innerHTML="0"+--min;
            }
            else{
                tmin.innerHTML=--min;
            }
            sec=59;
            tsec.innerHTML=sec;
            autoPlay();
        }
    }
};