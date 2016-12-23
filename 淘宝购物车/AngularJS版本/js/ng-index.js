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
			num:[],     //商品数量
			total:[],   //商品总价
			price:[],   //商品单价
			all:0.00,   //总价格
			sum:[],     //商品的checkbox
			jimmy:[]    //删除与撤销
		};

		//手动输入事件
		$scope.count=function (index){
			if(isNaN($scope.obj.num[index])){
				$scope.obj.num[index]=1;
			}
			$scope.obj.total[index]=($scope.obj.num[index]*$scope.obj.price[index]).toFixed(2);
		};

		//加减按钮点击
		$scope.add=function (index){
		    ++$scope.obj.num[index];
			$scope.obj.total[index]=($scope.obj.num[index]*$scope.obj.price[index]).toFixed(2);
		};
		$scope.sub=function (index){
		    if($scope.obj.num[index]==1){
			    $scope.obj.num[index]=1;
		    }
			else{
			    --$scope.obj.num[index];
			    $scope.obj.total[index]=($scope.obj.num[index]*$scope.obj.price[index]).toFixed(2);
		    }
		};

		//计算总价格事件
		$scope.sum=function (index){
			if($scope.obj.sum[index]){
				++$scope.selected;
				$scope.obj.all=Number($scope.obj.all)+Number($scope.obj.total[index]);
			}
			else{
				--$scope.selected;
				$scope.obj.all=Number($scope.obj.all)-Number($scope.obj.total[index]);
			}
		};

		//全选按钮
		$scope.selectAll=function (){
			var len=$scope.obj.num.length;
			for(var i=0;i<len;i++){
				if($scope.sAll){
					$scope.selected=len;
					if(!$scope.obj.sum[i]){
						$scope.obj.sum[i]=true;
						$scope.obj.all=Number($scope.obj.all)+Number($scope.obj.total[i]);
					}
				}
				else{
					$scope.selected=0;
					$scope.obj.sum[i]=false;
					$scope.obj.all=0.00;
				}
			}
		};

		//删除
		$scope.del=function (index){
		    $scope.obj.jimmy[index]=false;
		};

		//撤销删除
		$scope.show=function (index){
		    $scope.obj.jimmy[index]=true;
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