$(function (){
    //动态加载图片
    (function init(){
    $.ajax({
        url:'text.json',
        //async:false,
        success: function (data){
            var obj=data;
            var html={list:obj[0]};
            var list=template('pic',html);
            $('.pic').append(list);
            html={list:obj[1]};
            list=template('comment',html);
            $('.comment').append(list);
            $('.pic>li').eq(0).addClass('on');
            var config={
                num:0,
                lastnum:0
            };
            changePic(config);
        }
    });
    })();

    //小图片click事件
    function changePic(config){
        Del();
        $('.pic>li').click(function (){
            //$('.pic>li').eq(config.lastnum).removeClass('on');
            $('.pic>li').eq(config.lastnum).css({opacity: .6,outline:'0'});
            config.num=$(this).find('span').html();
            //$(this).addClass('on');
            $(this).css({opacity: 1,outline:"1px solid orange"});
            config.lastnum=config.num;
        });
        addPic(config);
    }

    //666 终于成功了 引用传递完美解决
    //点击广播提交表单内容
    function addPic(config){
        $('button').click(function (){
            var name=$('input').val(),
                content=$('textarea').val(),
                src=$('.pic img').eq(config.num).attr('src');
            if(name&&content){
                //src=$('.on>img').attr('src');
                str=$("<li><div><img src='"+src+"'/></div><ul><li>" +
                    "<a href='#'>"+name+": "+"</a>"+content+"</li>" +
                    "<li>"+getTime()+"</li></ul><span class='delete'>" +
                    "删除</span></li>").prependTo('.comment');
                //注册hover与删除事件
                Del();
            }else{
                if(!name){
                    $('.name-tip').stop().fadeIn(0).delay(1000).fadeOut(0);
                }
                if(!content){
                    $('.content-tip').stop().fadeIn(0).delay(1000).fadeOut(0);
                }
            }
        });
    }

    //获取格式化后的当前时间
    function getTime(){
        var _= new Date();
        var month=(_.getMonth()+1)<10?"0"+(_.getMonth()+1):(_.getMonth()+1),
            day= _.getDate()<10?"0"+_.getDate(): _.getDate(),
            hour= _.getHours()<10?"0"+(_.getHours()): _.getHours(),
            min=  _.getMinutes()<10?"0"+ _.getMinutes():  _.getMinutes();
        return month+"月"+day +"日 "+ hour+":"+ min;
    }


    //评论区域hover与点击删除事件
    function Del(){
        $('.comment>li').on({mouseenter:function (){
            $(this).css('background',"#f5f5f5");
            $(this).find('span').css("display","block");
        },mouseleave:function (){
            $(this).css('background',"#fff");
            $(this).find('span').css("display","none");
        }});
        var del=$('.delete');
        del.click(function (){
            $(this).parent().fadeOut();
        });
    }

    //动态绑定字数限制
    angular.module('app',[]).controller('nc',function ($scope){
        var max=$scope.max_input=10;
        $scope.eq={num:"",n:max};
        $scope.count=function (){
            $scope.eq.num=$scope.eq.num.length>max?$scope.eq.num.substr(0,max):$scope.eq.num;
            $scope.eq.n=max-$scope.eq.num.length;
        }
    });
});
