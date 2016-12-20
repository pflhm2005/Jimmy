/**
 * Created by Administrator on 2016/12/17.
 */
    var app=angular.module('app',[]);

    //获取时间的服务
    app.factory('time',function (){
        var _= new Date();
        var month=(_.getMonth()+1)<10?"0"+(_.getMonth()+1):(_.getMonth()+1),
            day= _.getDate()<10?"0"+_.getDate(): _.getDate(),
            hour= _.getHours()<10?"0"+(_.getHours()): _.getHours(),
            min=  _.getMinutes()<10?"0"+ _.getMinutes():  _.getMinutes();
        return month+"月"+day +"日 "+ hour+":"+ min;
    });

    //问题1 异步服务获取数据返回后处理问题
    //app.factory('getJSON',function ($http){
    //    var text=[];
    //    return $http.get('text.json').then(function (result){
    //        //请求json文件并接受返回数据
    //        return text.push(result.data[0],result.data[1]);
    //    });
    //});


    //service 是独立的，可以很方便易于测试，还能测试出逻辑处理是否正确
    //易于维护，service 中的方法有可能是用在多个地方的
    //严格来讲在controller中出现的逻辑都是和view相关的逻辑，例如控制显示隐藏啊 显示loading啊等等

    //控制器绑定
    app.controller('nc',['$scope','$http','time',function ($scope,$http,time){
        //初始化
        $scope.arr=[];
        $http.get('text.json').then(function (result) {
            //请求json文件并接受返回数据
            $scope.list1 = result.data[0];
            $scope.list2 = result.data[1];
        });

        //默认选中第一张
        $scope.active=0;
        //小图片选择事件
        $scope.select=function (index){
            $scope.active=index;
        };

        //最大输入数字
        var max=$scope.max_input=10;
        $scope.eq={num:"",n:max};
        //动态绑定字数限制
        //问题2 字数截取与显示问题
        $scope.count=function (){

            //方法1 正常截取 字数显示正常 删除所有输入字符串会报错 length为undefined
            $scope.eq.num=$scope.eq.num.length>max?$scope.eq.num.substr(0,max):$scope.eq.num;
            $scope.eq.n=max-$scope.eq.num.length;

            //方法2 字数显示正常 截取出问题 快速按键可以多输入1个字
            //form.content.value=form.content.value.length>max?form.content.value.substr(0,max):form.content.value;
            //$scope.eq.n=max-form.content.value.length;

            //方法3 截取正常 字数显示出错 会出现-1
            //$scope.eq.num=form.content.value.length>max?$scope.eq.num.substr(0,max):$scope.eq.num;
            //$scope.eq.n=max-form.content.value.length;

            //console.log($scope.eq.num.length===form.content.value.length); //true
            //console.log($scope.eq.num===form.content.value); //true
        };

        //点击按钮添加评论 不能绑定事件啊！
        //解决！
        $scope.add=function (){
            var obj={"src":$scope.active,"url":"#","n":$scope.name,
                "c":$scope.eq.num,"t":time};
            $scope.arr.unshift(obj);
            form.content.value="";
            form.name.value="";
        };
        //完全删除节点
        $scope.del=function (index){
            $scope.arr.splice(index,1);
        };
    }]);

    //头像图片载入
    app.directive('pic',function (){
        return {
            restrict:'E',
            replace:true,
            templateUrl:'pic.html'
        }
    });
    //评论区域图片载入
    app.directive('comment',function (){
        return {
            restrict:'E',
            replace:true,
            templateUrl:'comment-template.html'
        };
    });
    //评论区域事件绑定
    app.directive('del',function (){
        return {
            restrict:'E',
            replace:true,
            template:'<span class="delete">删除 ',
            link:function (scope, elem){
                elem.bind('click', function () {
                    elem.parent().css('display', 'none');
                });
                elem.parent().bind('mouseenter', function () {
                    elem.parent().css('background',"#f5f5f5");
                    elem.css('display', 'block');
                });
                elem.parent().bind('mouseleave', function () {
                    elem.parent().css('background',"#fff");
                    elem.css('display', 'none');
                });
            }
        };
    });
    //添加评论
    app.directive('addComment',function (){
        return {
            restrict:'E',
            replace:true,
            templateUrl:'addcomment.html'
        };
    });