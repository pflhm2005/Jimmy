$(function (){
    var num= 0,
        li=$('li+li'),
        iter=true,
        len=$('li').length- 1,
        p=document.getElementsByTagName('p')[0],
        span=document.getElementsByTagName('span')[0];
    //var l=document.getElementsByTagName("li");
    //var l2=$('li');
    //������ 6��Ԫ��
    //console.log(l);
    //������ 7��Ԫ�� ���һ������prevObject
    //console.log(l2);
    li.hover(function (){
        //that=this;
        num=this.innerHTML;
        $('p').eq(0).css('left',40+(num-1)*30);
        switch (num) {
            case "1":
                p.innerHTML='<p><b>1</b>�� �ܲ�����</p>';
                break;
            case "2":
                p.innerHTML='<p><b>2</b>�� ������</p>';
                break;
            case "3":
                p.innerHTML='<p><b>3</b>�� һ��</p>';
                break;
            case "4":
                p.innerHTML='<p><b>4</b>�� ����</p>';
                break;
            case "5":
                p.innerHTML='<p><b>5</b>�� �ǳ�����</p>';
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
    //����¼�
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
    //��������
    function fresh(){
        var len=$('li').length-1;
        for(var i=0;i<len;i++){
            li.eq(i).css("backgroundPositionY",0);
        }
    }
});