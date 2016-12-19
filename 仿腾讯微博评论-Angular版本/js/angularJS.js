/**
 * Created by Administrator on 2016/12/17.
 */
    var app=angular.module('app',[]);
    //控制器绑定
    app.controller('nc',['$scope','$http',function ($scope,$http){
        $http.get('text.json').then(function (result){
            //请求json文件并接受返回数据
            $scope.list=result.data[0];
            $scope.list2=result.data[1];
        });

        //初始化
        (function init(){
            //获取格式化后的当前时间
            $scope.time=getTime();
            //默认选中第一张
            $scope.active=0;
            //最大输入数字
            var max=$scope.max_input=10;
            $scope.eq={num:"",n:max};
            $scope.arr=[];
            //小图片选择事件
            $scope.select=function (index){
                $scope.active=index;
            };
            //动态绑定字数限制
            $scope.count=function (){
                $scope.eq.num=$scope.eq.num.length>max?$scope.eq.num.substr(0,max):$scope.eq.num;
                $scope.eq.n=max-$scope.eq.num.length;
            };
            //点击按钮添加评论 不能绑定事件啊！
            //解决！
            $scope.add=function (){
                var obj={"src":$scope.active,"url":"#","n":$scope.name,
                    "c":$scope.eq.num,"t":$scope.time};
                $scope.arr.unshift(obj);
            }
        })();

        //JS方法格式化时间
        function getTime(){
            var _= new Date();
            var month=(_.getMonth()+1)<10?"0"+(_.getMonth()+1):(_.getMonth()+1),
                day= _.getDate()<10?"0"+_.getDate(): _.getDate(),
                hour= _.getHours()<10?"0"+(_.getHours()): _.getHours(),
                min=  _.getMinutes()<10?"0"+ _.getMinutes():  _.getMinutes();
            return month+"月"+day +"日 "+ hour+":"+ min;
        }

    }]);
    //添加评论
    app.directive('addComment',function (){
        return {
            restrict:'E',
            replace:true,
            templateUrl:'addcomment.html',
            link: function (scope,elem){
                console.log(scope.arr);
            }
        };
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