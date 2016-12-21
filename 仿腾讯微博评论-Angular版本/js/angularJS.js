/**
 * Created by Administrator on 2016/12/17.
 */
    var app=angular.module('app',['ngResource']);

    //获取时间的服务
    app.factory('time',function (){
        var _= new Date();
        var month=(_.getMonth()+1)<10?"0"+(_.getMonth()+1):(_.getMonth()+1),
            day= _.getDate()<10?"0"+_.getDate(): _.getDate(),
            hour= _.getHours()<10?"0"+(_.getHours()): _.getHours(),
            min=  _.getMinutes()<10?"0"+ _.getMinutes():  _.getMinutes();
        return month+"月"+day +"日 "+ hour+":"+ min;
    });

    //constant方法定义的常量可以注入到配置函数中 .constant('url','#').config(function(url){})
    app.value('url',"text2.json");

    //自定义拦截器
    app.factory('int',function ($q){
        var inter={
            'request':function (config){
                console.log("请求成功");
                return config;
            },
            'response':function (response){
                console.log("响应成功");
                return response;
            },
            'requestError':function (rejection){
                console.log("req-error");
                return $q.reject(rejection);
            },
            'responseError':function (rejection){
                console.log("res-error");
                return rejection;
            }
        };
        return inter;
    });

    //注册拦截器
    //app.config(function ($httpProvider){
    //    $httpProvider.interceptors.push('int');
    //});

    //请求JSON文件的服务
    //返回Promise数据的处理以及该服务如何返回问题
    //解决!
    app.factory('getJSON',function ($http){
        return function (url){
            return $http.post(url,{cache:true});
        }
    });

    app.factory('der',['$q',function ($q){
        var der=$q.defer();
        der.resolve({name:"jimmy"});
        der.reject("failed");
        return der;
    }]);

    //service 是独立的，可以很方便易于测试，还能测试出逻辑处理是否正确
    //易于维护，service 中的方法有可能是用在多个地方的
    //严格来讲在controller中出现的逻辑都是和view相关的逻辑，例如控制显示隐藏啊 显示loading啊等等

    //控制器绑定
    app.controller('nc',['$scope','getJSON','time',function ($scope,getJSON,time){
        //初始化
        getJSON('text.json').then(function (result){
            $scope.list1 = result.data[0];
            $scope.list2 = result.data[1];
        });

        //存放添加追加评论的数组
        $scope.arr=[];

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
        //问题 字数截取与显示问题
        //解决！
        $scope.count=function (){
            //完美解决 老子真是日了狗啊
            if(form.content.value.length==0){
                $scope.eq.n=10;
            }else{
                $scope.eq.num=$scope.eq.num.length>max?$scope.eq.num.substr(0,max):$scope.eq.num;
                $scope.eq.n=max-$scope.eq.num.length;
                //console.log($scope.$$watchers);
            }

            //方法1 正常截取 字数显示正常 删除所有输入字符串会报错 length为undefined
            //$scope.eq.num=$scope.eq.num.length>max?$scope.eq.num.substr(0,max):$scope.eq.num;
            //$scope.eq.n=max-$scope.eq.num.length;

            //方法2 字数显示正常 截取出问题 快速按键可以多输入1个字
            //form.content.value=form.content.value.length>max?form.content.value.substr(0,max):form.content.value;
            //$scope.eq.n=max-form.content.value.length;

            //方法3 截取正常 字数显示出错 会出现-1
            //$scope.eq.num=form.content.value.length>max?$scope.eq.num.substr(0,max):$scope.eq.num;
            //$scope.eq.n=max-form.content.value.length;

            //console.log($scope.eq.num.length===form.content.value.length); //true
            //console.log($scope.eq.num===form.content.value); //true
            //console.log(form.content.value);
            //console.log(form.content.value.length);   //0-10
        };

        //点击按钮添加评论 clone()+prepend()不能绑定事件！
        //ng-repeat完美解决！
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

    //第二个控制器测试各种方法
    app.controller('nc2',['der','getJSON','url',function (der,getJSON,url){
        //getJSON(url).then(function (result){
        //    console.log(result.status);
        //    console.log(result.headers());
        //})
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