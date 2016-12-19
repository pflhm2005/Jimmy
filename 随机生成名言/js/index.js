/**
 * Created by Administrator on 2016/12/8.
 */
angular.module("quote",[]).controller
("QuoteController",function ($scope){
    $scope.quote={
        1:{
            text:"You're gonna need a bigger boat.",
            name:"-Jaws"
        },
        2:{
            text:"I've had a wonderful time, " +
            "but this wasn't it.",
            name:"- Groucho Marx"
        },
        3:{
            text:"Soylent Green is people!",
            name:"- Soylent Green"
        }
    };
    $scope.click=function (num){
        var ran=Math.ceil(Math.random()*num);
        $scope.text=$scope.quote[ran].text;
        $scope.name=$scope.quote[ran].name;
    }
});


//$(function () {
//        var obj = {
//            1:{
//                text:"You're gonna need a bigger boat.",
//                name:"-Jaws"
//            },
//            2:{
//                text:"I've had a wonderful time, but this wasn't it.",
//                name:"- Groucho Marx"
//            },
//            3:{
//                text:"Soylent Green is people!",
//                name:"- Soylent Green"
//            }
//        };
//        //return(1,num+1)µÄËæ»úÊý
//        function getRandom(num){
//            return Math.floor(Math.random()*num)+1;
//        }
//        var num=0;
//        function getQuote(){
//            num=getRandom(2);
//            $(".text").html(obj[num].text);
//            $(".name").html(obj[num].name);
//        }
//        $('.btn3').click(function () {
//            getQuote();
//        });
//    }
//);