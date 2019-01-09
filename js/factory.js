var mainApp = angular.module("mainApp", ['ui.router']);
mainApp.controller('myctrl', function($scope,$state,httpService) {
	$scope.result ="";
	var urlport = "/banner/bannerList",data={};
	var promise = httpService.multiply(urlport,data);  //同步调用，获取承诺接口
    promise.then(function(data){
          $scope.nav = data.detail;
          //console.log(JSON.stringify(data))
		  $scope.$broadcast('transfer.type', data.detail);
		  localStorage.setItem("all",JSON.stringify(data));
		  $scope.setKeys = function(index,item,urls){
		  	var item = item-1;
		  	$scope.keys = item;
		  	var jumpurl = "publichead."+urls;
		  	$state.go(jumpurl,{key:index,keys:item});
		  }
        },function(data){
          $scope.user={error:'数据不存在。。。'}; //调用承诺接口reject();
        });
        
});



var BAS_URL = "http://192.168.12.56";
mainApp.factory('httpService', function($http, $q) {
	var factory = {};
	factory.multiply = function(urlport, data) {
		var defer = $q.defer(); //声明延后执行
		$http.post(BAS_URL + urlport, data, {
			'Content-Type': 'application/x-www-form-urlencoded'
		}).success(function(data) {
			defer.resolve(data);
			console.log('UserInfoService success');
		}).error(function(data) {
			defer.reject(data); //声明执行失败
		});
		return defer.promise; //返回承诺，返回获取数据的API
	}
	return factory;
});



mainApp.factory('indexFac', function() {
	var factory = {};
	var arr = [{
		urls: "images/264x180.jpg",
		name: "男难啊阿大"
	}, {
		urls: "images/264x180.jpg",
		name: "男难啊阿大"
	}];
	var newarr = [{
		imgurl: "images/683x461_1.jpg",
		name: "陆海明",
		zhiwei: ["南京出版传媒集团副总编辑", "副总经理", "党委委员", "南京出版社社长"],
		description: "1964年9月生，史学博士、编审，南京历史文化专家。江苏省“五个一批”人才，江苏省新闻出版行业第二批领军人才，江苏省“333人才”（第二层次）,江苏首届名编辑。著有《六朝都城》《南京民国建筑》《南京历代名号》等。1964年9月生，史学博士、编审，南京历史文化专家。江苏省“五个一批”人才，江苏省新闻出版行业第二批领军人才，江苏省“333人才”（第二层次）,江苏首届名编辑。著有《六朝都城》《南京民国建筑》《南京历代名号》等。"
	}, {
		imgurl: "images/683x461_2.jpg",
		name: "樊立文",
		zhiwei: ["从事出版工作"],
		description: "1966年7月生，中共党员。南京市宣传系统“五个一批”人才。从事出版工作近30年，策划编辑了一大批重点图书，获得了“双效”。其中，责编的一批图书入选国家、省、市各级各类图书奖。"
	}, {
		imgurl: "images/683x461_3.jpg",
		name: "孙维桢",
		zhiwei: ["图书出版发行管理"],
		description: "1964年9月生，毕业于解放军信息工程学院，中共党员。军旅生涯17载，从部队到地方，由新闻出版行政管理到图书出版发行管理，连续多年被评为南京市宣传文化系统优秀共产党员。"
	}, {
		imgurl: "images/683x461_4.jpg",
		name: "孙伟实",
		zhiwei: ["从事图书出版印制工作"],
		description: "1963年9月生，本科学历，中共党员。从事图书出版印制工作30多年，熟悉出版流程，具有丰富的出版专业知识和实践经验，精通图书出版印装工艺和成本的核算，对行政管理工作驾轻就熟。"
	}, {
		imgurl: "images/683x461_5.jpg",
		name: "余力",
		zhiwei: ["副编审"],
		description: "1963年8月生，研究生学历，副编审。2009年获南京市第七届“十佳编辑”荣誉称号，2015年获南京市劳动模范称号。从事编辑工作近30年，获得国家级、省级等各类出版奖多项。"
	}];
	factory.setName = function() {
		return "John Doe";
	}
	factory.setList = function() {
		return arr;
	}
	factory.setNewList = function() {
		return newarr;
	}
	return factory;
});
