/**
 * Created by Administrator on 2016/12/21.
 */
var app=angular.module('myApp',['ngRoute']);

app.provider('Weather',function (){
	var apiKey="";
	this.setApiKey=function (key){
		if(key){
			this.apiKey=key;
		}
	};
	this.getUrl=function (type,ext){
		return "http://api.wunderground.com/api"+
			this.apiKey+"/"+type+"/q/"+ext+".json";
	};
	this.$get=function ($q,$http){
		var self=this;
		return {
			getWeatherForecast: function (city){
				var d=$q.defer();
				$http.get(self.getUrl('forecast',city),{cache:true}).
					then(function (data){
						d.resolve(data.forcast.simpleforcast);
					},function (err){
						d.reject(err);
					});
				console.log(d.promise);
				return d.promise;
			}
		};
	}
});
//app.config(function (WeatherProvider){
//	WeatherProvider.setApiKey('c168fcf83120f8ed')
//});

app.controller('MainController',function ($scope,$timeout){
	//创建date对象
	$scope.date={};

	//更新时间
	var updateTime=function (){
	    $scope.date.raw=new Date();
		$timeout(updateTime,1000);
	};
	updateTime();

	//$scope.weather={};
	//Weather.getWeatherForecast('CA/San_Francisco').then(function (data){
	//    $scope.weather.forcast=data;
	//});
});

app.config(function ($routeProvider){
	$routeProvider.when('/',{
		templateUrl:'template/home.html',
		controller:'MainController'
	}).when('/settings',{
		templateUrl:'template/settings.html',
		controller:'SettingsController'
	}).otherwise({redirectTo})
});