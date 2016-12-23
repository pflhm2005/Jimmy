$(function (){
	(function load(){
        $.ajax({
            url:'content.json',
            success:function (data){
                var html={list:data};
	            var list=template('content',html);
	            $('.box').append(list);
	            go();
	            init();
            }
        })
    })();
	function go(){
		//分页hover事件
		$('.tab-l>li').hover(function (){
		    $('.tab-l>div').stop().animate({left:this.offsetLeft+"px"},200)
		});
		$(".tab-l").mouseleave(function (){
			$('.tab-l>div').stop().animate({left:0},200);
		});

		//一堆选择器
	    var obj2=$('input[id^="shop"]:odd'),
		    obj1=$('input[id^="shop"]:even'),
		    objAll=$('input[id^="shop"]'),
		    selectAll=$('input[id^="all"]'),
		    objCount=obj2.length,
		    iter=0;

		(function (){
			$('.tab-all').html(objCount);
			var len=$('.c-price-tip').length;
			for(var i=0;i<len;i++){
				if($('.c-price-tip>span')[i].innerHTML){
					$('.tab-sale').html(++iter);
				}

			}
		})();

		//变色调用函数
		function changeColor(){
			if(this.checked){
				$(this).parent().parent().css("background-color","#fff8e1");
			}
			else{
				$(this).parent().parent().css("background-color","#fcfcfc");
			}
		}

		//商品点击触发价格计算 并将店铺属性设为checked 调用变色函数
		obj2.on('click',function (){
			count();
			$(this).parent().parent().parent().parent().prev().find('input')[0].checked=this.checked;
			changeColor.call(this);
		});

		//店铺点击事件触发商品点击事件
		obj1.on('click',function (){
			$(this).parent().parent().parent().next().find('input').click();
		});

		//全选事件
		selectAll.on('click',function (){
			selectAll[0].checked=selectAll[1].checked=this.checked;
			for(var i=0;i<objAll.length;i++){
				objAll[i].checked=this.checked;
				count();
			}
			//调用变色函数
			for(var j=0;j<obj2.length;j++){
				changeColor.call(obj2[j]);
			}
		});

		//有一个未被选中 全选不被选中
		objAll.on('change',function (){
		    if(!this.checked){
			    selectAll[0].checked=selectAll[1].checked=false;
		    }
		});

		//商品加减数量与价格变动事件
		$('.c-count>button').on('click',function (){
			var price=Number($(this).parent().prev().find('.c-price-now').html().slice(1)),
				num=Number($(this).parent().find('input').val());
			//原生方法的nextSibling会选择到换行，慎用！
		    if(this.innerHTML=="-"){
			    if(num>1){
				    $(this).next().val(--num);
			    }
		    }
			else{
			    $(this).prev().val(++num);
		    }
			$(this).parent().next().html("￥"+(num*price).toFixed(2));
			count();
		});

		//键盘输入数字事件
		$('.c-count>input').keyup(function (){
			var num=Number(this.value),
				price=Number($(this).parent().prev().find('.c-price-now').html().slice(1));
		    if(this.value>574||isNaN(num)){
			    this.value=1;
			    $(this).next().next().show().fadeOut(3000);
			    $(this).parent().next().html("￥"+price.toFixed(2));
			    count();
		    }
			else{
			    $(this).parent().next().html("￥"+(num*price).toFixed(2));
			    count();
		    }
		});

		//计算总价格刷新页面数据
		function count(){
			var arr=[],sum=0,
				select=$('input[id^="shop"]:odd:checked'),
				len=select.length;
			for(var i=0;i<len;i++){
				arr.push(Number($(select[i]).parent().parent().find('.c-total').html().slice(1)));
			}
			if(arr.length!=0){
				sum=arr.reduce(function (prev,curr){
					return prev+curr;
				});
			}
			sum="￥"+sum.toFixed(2);
			if(len>0){
				$("#submit").addClass('on');
				$("#f-submit").addClass('on');
			}
			else{
				$('#f-submit').removeClass('on');
				$('#submit').removeClass('on');
			}
			$('#total').html(sum);
			$('#f-total').html(sum);
			$('.f-count>span').html(len);
		}

		//删除事件
		$('a.delete').on('click',function (e){
			console.log(objCount);
			e.preventDefault();
			--objCount;
			var ul=$(this).parent().parent().parent().parent().parent(),
				num=ul.prev().find('i').html();
			$("ul.content").eq(num).css("display","none");
			$("ul.delete").eq(num).css("display","block");
			$('.tab-all').html(objCount);
		});
		$('a.cancel').on('click',function (e){
			console.log(objCount);
			e.preventDefault();
		    var num=$(this).prev().html();
			$("ul.content").eq(num).css("display","block");
			$("ul.delete").eq(num).css("display","none");
			++objCount;
			$('.tab-all').html(objCount);
		});
	}
});













