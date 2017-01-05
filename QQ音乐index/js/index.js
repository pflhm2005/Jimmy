$(function (){

    console.clear();

    var arrr = [
        [
            {"src":"qb1","title":"遇见爱情的利先生 电视剧原声带…","name":"华语群星"},
            {"src":"qb2","title":"我可以","name":"王野"},
            {"src":"qb3","title":"WINTER","name":"악동뮤지션"},
            {"src":"qb4","title":"嘿嘿嘿","name":"费玉清"},
            {"src":"qb5","title":"过去了","name":"黄渤"},
            {"src":"qb6","title":"화랑 OST Part. 4","name":"웬디"},
            {"src":"qb7","title":"낭만닥터 김사부 OST Part.5","name":"이석훈"},
            {"src":"qb8","title":"다시, 첫사랑 OST Part.1","name":"김그림"},
            {"src":"qb9","title":"原宿いやほい","name":"きゃりーぱみゅぱみゅ"},
            {"src":"qb10","title":"Queen Elizabeth (Remixes)","name":"Cheat Codes"},
            {"src":"qb11","title":"e of s","name":"澤野弘之"},
            {"src":"qb12","title":"What Do You Love (Hook N Sling Remix)","name":"Seeb"},
            {"src":"qb1","title":"遇见爱情的利先生 电视剧原声带…","name":"华语群星"},
            {"src":"qb2","title":"我可以","name":"王野"},
            {"src":"qb3","title":"WINTER","name":"악동뮤지션"},
            {"src":"qb4","title":"嘿嘿嘿","name":"费玉清"}
        ],
        [
            {"src":"hy9","title":"多瑙河畔","name":"沙宝亮"},
            {"src":"hy10","title":"'17聚幸福'江苏卫视2017跨年晚…","name":"华语群星"},
            {"src":"hy11","title":"我赖你","name":"苏打绿"},
            {"src":"hy12","title":"爱在当下","name":"邰正宵"},
            {"src":"qb1","title":"遇见爱情的利先生 电视剧原声带…","name":"华语群星"},
            {"src":"qb2","title":"我可以","name":"王野"},
            {"src":"qb4","title":"嘿嘿嘿","name":"费玉清"},
            {"src":"qb5","title":"过去了","name":"黄渤"},
            {"src":"hy5","title":"一枝孤芳","name":"钟汉良"},
            {"src":"hy6","title":"New Day","name":"黄子韬"},
            {"src":"hy7","title":"2016安徽卫视国剧盛典","name":"华语群星"},
            {"src":"hy8","title":"梦想的声音 第10期","name":"梦想的声音"},
            {"src":"hy9","title":"多瑙河畔","name":"沙宝亮"},
            {"src":"hy10","title":"'17聚幸福'江苏卫视2017跨年晚…","name":"华语群星"},
            {"src":"hy11","title":"我赖你","name":"苏打绿"},
            {"src":"hy12","title":"爱在当下","name":"邰正宵"}
        ]
    ];

//    $.ajax({
//        url:'qb.json',
//        success: function (data){
//            var arr=[];
//            var html = [{list:data[0]},{list:data[1]}];
//            //分页数据
//            arr.push(template('qb',html[0]),template('qb',html[1]));
//            var pic = $('.pic');
//            for(var i= 0,len=arr.length;i<len;i++){
//                pic.eq(i).append(arr[i]);
//            }
//            tab();
//            mask();
//            btn();
//        }
//    });

    (function init(){
        var arr=[];
        var html = [{list:arrr[0]},{list:arrr[1]}];
        //分页数据
        arr.push(template('qb',html[0]),template('qb',html[1]));
        var pic = $('.pic');
        for(var i= 0,len=arr.length;i<len;i++){
            pic.eq(i).append(arr[i]);
        }
        tab();
        mask();
        btn();
    })();

    //搜索框
    (function (){
        var input = $('.sear-input'),
            dropdown = $('.sear'),
            add = $('.add'),
            last = $('.sear>li:last-child'),
            arr = [],
            num=5;

        //slide
        input.focusin(function (){
            dropdown.slideToggle("fast");
        });

        input.blur(function (){
            setTimeout(function (){
                dropdown.slideToggle("fast");
            },1000);
        });

        //搜索栏添加
        add.click(function (e){
            console.log(e.__proto__);
            var res = input.val(),
                len = arr.length;
            e.preventDefault();
            //没有输入不进行添加
            if(!res){
                return;
            }
            var obj={};
            obj.key = input.val();
            //遍历查询是否重复
            for(var i= 0,len=arr.length;i<len;i++){
                if(arr[i].key == obj.key){
                    var count =$('.count').eq(i).html();
                    count++;
                    $('.count').eq(i).html(count);
                    return;
                }
            }
            num++;
            obj.value = $("<li><span>"+ num +"</span><span>"+res+"</span><span class='count'>1</span></li>");
            arr.push(obj);
            //不重复添加
            arr[len].value.insertBefore(last);
        })
        $('.delete').click(function (){
            if(arr.length ==0){
                return ;
            }
            arr.pop();
            $('.sear>li').eq(arr.length+5).remove();
        })
    })();



    //切换分类
    function tab(){
        var tab = $('.tab>li'),
            pic = $('.pic'),
            num = 0,
            lastnum = 0;
        tab.on('click',function (){
            num = $(this).index();
            tab.eq(lastnum).removeClass('on');
            pic.eq(lastnum).removeClass('on');
            tab.eq(num).addClass("on");
            pic.eq(num).addClass("on");
            lastnum = num;
        })
    }

    //左右按钮hover,click和二级变色
    function btn(){
        var btn_l = $('.btn_l'),
            btn_r = $('.btn_r'),
            slide = $('#slide'),
            btn = $('.btn>li'),
            btn_a = btn.children(),
            pic = $('.pic'),
            obj={
                num:0,
                lastnum:0
            }
        slide.hover(function (){
            btn_l.css("left",0);
            btn_r.css("right",0);
        },function (){
            btn_l.css("left",-70);
            btn_r.css("right",-70);
        })
        slide.mousemove(function (e){
            var px = e.clientX;
            if(px<70){
                btn_l.css("background","#31c27c");
            }
            else if(px>1279){
                btn_r.css("background","#31c27c");
            }
            else{
                btn_l.css("background","rgba(153,153,153,.4)");
                btn_r.css("background","rgba(153,153,153,.4)");
            }
        })

        function change(obj){
            pic.animate({left:obj.num*(-1200)},500);
        }

        //左右按钮click
        btn_r.click(function (){
            //防止多次点击的BUG
            //如果是动画状态 直接返回
            if(pic.is(":animated")){
                return ;
            }
            next(btn_a,obj);
            if(pic.css("left") == "-3600px"){
                pic.css("left",0);
            }
            pic.animate({left:"-="+1200},500);
            console.log(pic.css("left"));
        });
        btn_l.click(function (){
            if(pic.is(":animated")){
                return ;
            }
            prev(btn_a,obj);
            if(pic.css("left") == "0px"){
                pic.css("left",-3600);
            }
            pic.animate({left:"+="+1200},500);
        })

        //下方横条click
        btn.click(function (){
            obj.num = Number(this.innerText)-1;
            pic.animate({left:obj.num*-1200+"px"},500);
            btn_a.eq(obj.lastnum).removeClass("on");
            btn_a.eq(obj.num).addClass("on");
            obj.lastnum = obj.num;
            console.log(obj.num);
        });
    };

    //左右按钮触发的横条变色
    function next(btn_a,obj){
        var on = $('.btn>li>a.on');
        obj.num = Number(on.parent()[0].innerText);
        if(obj.num == 3){
            btn_a.eq(2).removeClass("on");
            btn_a.eq(0).addClass("on");
            //重新赋值
            obj.num = 0;
        }
        else{
            btn_a.eq(obj.num-1).removeClass("on");
            btn_a.eq(obj.num).addClass("on");
        }
        obj.lastnum = obj.num;
    }
    function prev(btn_a,obj){
        var on = $('.btn>li>a.on');
        obj.num = Number(on.parent()[0].innerText);
        if(obj.num == 1){
            btn_a.eq(0).removeClass("on");
            btn_a.eq(2).addClass("on");
            obj.num = 2;
        }
        else{
            btn_a.eq(obj.num-1).removeClass("on");
            btn_a.eq(obj.num-2).addClass("on");
        }
        obj.lastnum = obj.num
    }

    //mask hover
    function mask(){
        var pic = $('.pic>li');
        pic.hover(function (){
            $(this.children[0]).stop().fadeIn();
            $(this.children[1].children[0]).css("transform","scale(1.1)");
            $(this.children[0].children).stop().css("transform","scale(1.5)");
        },function (){
            $(this.children[0]).stop().fadeOut();
            $(this.children[1].children[0]).css("transform","scale(1)");
            $(this.children[0].children).stop().css("transform","scale(1)");
        })
    };

    //fix hover
    (function fix(){
        //获取滚动事件
        $(window).scroll(function (){
            if($('body').scrollTop() == 0){
                f1.css("display","none");
            }
            else{
                f1.css("display","block");
            }
        })
        var f1 = $('.f1'),
            f2 = $('.f2'),
            f3 = $('.f3');
        f1.click(function (){
            $('body').animate({scrollTop:0},500);
        });
        f1.hover(function (){
            $(this).parent().addClass("on");
        },function (){
            $(this).parent().removeClass("on");
        })
        f2.hover(function (){
            $(this).html("意见反馈").addClass("on");
        },function (){
            $(this).html('').removeClass("on");
        });
        f3.hover(function (){
            $(this).html("播放器").addClass("on");
        },function (){
            $(this).html('').removeClass("on");
        });
    })();

});