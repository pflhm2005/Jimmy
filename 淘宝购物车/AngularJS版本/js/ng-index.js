	var app=angular.module('app',[]);
	
	app.factory('getJSON',['$http',function ($http){
	    return function (url){
	        return $http.post(url,{cache:true});
	    }
	}]);

	app.controller('nc',['$scope','getJSON',function ($scope,getJSON){
	    getJSON('content.json').then(function (result){
		    $scope.data=result.data;
	    });

		//定义对象
		$scope.obj={
			accounts:true,  //未选中商品按钮置灰
			selected:0, //被选中商品数量
			del:[],     //判断是否被删除
			num:[],     //商品数量
			total:[],   //商品总价
			price:[],   //商品单价
			all:0.00,   //总价格
			sum:[],     //商品的checkbox按钮变化
			jimmy:[],   //删除与撤销按钮
			arr:[]      //计算总价的数组
		};

		//计算总价
		function countAll(){
			//默认未选商品
			$scope.obj.accounts=true;
		    for(var i=0;i<$scope.obj.num.length;i++){
			    //重置数组值防止价格叠加
			    $scope.obj.arr[i]=0;
			    if($scope.obj.sum[i]){
				    //有商品选中按钮变色
				    $scope.obj.accounts=false;
				    //将该商品金额加入数组对应索引
				    $scope.obj.arr[i]=Number($scope.obj.total[i]);
			    }
		    }
			$scope.obj.all=$scope.obj.arr.reduce(function (prev,curr){
			    return prev+curr;
			})
		}

		//计算单价
		function countPrice(index){
			$scope.obj.total[index]=$scope.obj.num[index]*$scope.obj.price[index];
		}

		//加减按钮点击
		$scope.add=function (index){
		    ++$scope.obj.num[index];
			countPrice(index);
			countAll();
		};
		$scope.sub=function (index){
		    if($scope.obj.num[index]==1){
			    $scope.obj.num[index]=1;
		    }
			else{
			    --$scope.obj.num[index];
			    countPrice(index);
			    countAll();
		    }
		};

		//手动输入事件
		$scope.count=function (index){
			//直接做非数字与数字过大判断
			if(isNaN($scope.obj.num[index])||$scope.obj.num[index]>500){
				$scope.obj.num[index]=1;
			}
			countPrice(index);
			countAll();
		};

		//checkbox选项变动事件
		$scope.sum=function (index){
			if($scope.obj.sum[index]){
				++$scope.selected;
				countAll();
			}
			else{
				--$scope.selected;
				countAll();
			}
		};

		//全选按钮
		$scope.selectAll=function (){
			//商品数量
			var len=$scope.obj.num.length;
			$scope.selected=len;
			for(var i=0;i<len;i++){
				//全部选中
				if($scope.sAll){
					//被删除的商品不计入已选商品
					if($scope.obj.del[i]){
						--$scope.selected;
					}
					//只对未被选中且未被删除的做处理
					if(!$scope.obj.sum[i]&&!$scope.obj.del[i]){
						$scope.obj.sum[i]=true;
						countAll();
					}
				}
				//全部不选中
				else{
					$scope.obj.accounts=true;
					$scope.selected=0;
					$scope.obj.sum[i]=false;
					$scope.obj.all=0.00;
				}
			}
		};

		//删除
		$scope.del=function (index){
			if($scope.obj.sum[index]){
				--$scope.selected;
				//如果删前被选中就去掉去掉选中
				$scope.obj.sum[index]=false;
				countAll();
			}
			$scope.obj.del[index]=true;
		    $scope.obj.jimmy[index]=false;
		};

		//撤销删除
		$scope.show=function (index){
			$scope.obj.del[index]=false;
		    $scope.obj.jimmy[index]=true;
			//撤销删除商品数量重置为1
			$scope.obj.num[index]=1;
		};

	}]);
	//模板输入
	app.directive('content',function (){
	    return {
		    restrict:"E",
		    replace:true,
		    templateUrl:'content.html'
	    }
	});