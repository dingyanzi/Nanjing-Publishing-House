mainApp.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('indexs', { //首页
				url: '/indexs',
				templateUrl: 'htmls/indexs.html',
				controller: 'HomeController'
			}).state('publichead', { //子页面公共头部
				url: '/publichead/{keys}',
				templateUrl: 'htmls/publichead.html',
				controller: 'publicheadController'
			}).state('publichead.news', { //新闻公告
				url: '/news',
				templateUrl: 'htmls/news.html',
				controller: 'AboutController'
			}).state('publichead.newsdetail', { //新闻公告详情
				url: '/newsdetail/{id}',
				templateUrl: 'htmls/newsdetail.html',
				controller: 'AboutsController'
			}).state('publichead.bookcenteractive', { //图书中心（模版）
				url: '/bookcenteractive/{keys}',
				templateUrl: 'htmls/bookcenteractive.html',
				controller: 'bookcenteractiveController'
			}).state('publichead.bookdetail', { //图书中心>详情页
				url: '/bookdetail/{id}',
				templateUrl: 'htmls/bookdetail.html',
				controller: 'bookdetailController'
			}).state('publichead.book_recommend', { //图书中心（模版）
				url: '/book_recommend',
				views: {
					'': {
						templateUrl: 'htmls/book_recommend.html',
						controller: 'book_recommendController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
			}).state('publichead.book_culture', { //文化（模版）
				url: '/book_culture/{key}',
				views: {
					'': {
						templateUrl: 'htmls/book_culture.html',
						controller: 'book_cultureController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
			}).state('publichead.book_science', { //图书中心>人文社科、少儿文艺、生活科普、教学教辅、文创产品
				url: '/book_science/{key}',
				views: {
					'': {
						templateUrl: 'htmls/book_science.html',
						controller: 'book_scienceController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
			}).state('publichead.online', { //在线阅读
				url: '/online',
				templateUrl: 'htmls/online.html',
				controller: 'onlineController'
			})
			.state('onlineread', { //在线阅读
				url: '/onlineread/{id}',
				templateUrl: 'htmls/onlineread.html',
				controller: 'onlinereadController'
			}).state('publichead.downloadactive', { //资料下载（模版）
				url: '/downloadactive',
				views: {
					'': {
						templateUrl: 'htmls/downloadactive.html',
						controller: 'downloadactiveController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
			}).state('publichead.download_answer', { //资料下载（模版）
				url: '/download_answer',
				views: {
					'': {
						templateUrl: 'htmls/download_answer.html',
						controller: 'download_answerController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
			}).state('publichead.download_data', { //资料下载（模版）
				url: '/download_data',
				views: {
					'': {
						templateUrl: 'htmls/download_data.html',
						controller: 'download_dataController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
			}).state('publichead.downloaddetail', { //资料下载(听力录音)
				url: '/downloaddetail/{id}',
				templateUrl: 'htmls/downloaddetail.html',
				controller: 'downloaddetailController'
			}).state('publichead.special', { //专题文章
				url: '/special/{key}',
				views: {
					'': {
						templateUrl: 'htmls/special.html',
						controller: 'specialController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
			}).state('publichead.Abouts', { 
				url: '/Abouts',
				views: {
					'': {
						templateUrl: 'htmls/Abouts.html',
						controller: 'AboutmainController'
					},
					'nav': {
						templateUrl: 'htmls/publicbottom.html',
						controller: 'publicController'
					}
				}
				
			}).state('publichead.Aboutsdetail', { 
				url: '/Aboutsdetail/{id}',
				templateUrl: 'htmls/Aboutsdetail.html',
				controller: 'AboutdetailController'
			}).state('publichead.submission', { //欢迎投稿
				url: '/submission',
				templateUrl: 'htmls/submission.html',
				controller: 'submissionController'
			}).state('publichead.introduce', { //机构介绍
				url: '/introduce',
				templateUrl: 'htmls/introduce.html',
				controller: 'introduceController'
			}).state('publichead.contacts', { //联系我们
				url: '/contacts',
				templateUrl: 'htmls/contacts.html',
				controller: 'contactsController'
			});

		$urlRouterProvider.otherwise('/indexs');

	}).controller('HomeController', function($scope, $state, httpService) {
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		var bannerlist = data.detail[0].bannerlist;
		$scope.jumps = function(index,item){
			var porturls = "publichead."+bannerlist[index].jumpurl+"";
			if(!item){
				return false;
			}
			
			$state.go(porturls,{id:item});
		}
		
		var urlport = "/banner/newbookindex",
			data = {};
		var promise = httpService.multiply(urlport, data); //新书推荐
		promise.then(function(data) {
			//console.log(JSON.stringify(data))
			$scope.index = data.detail;
			$(".newslist ul li").eq(0).addClass("close")
		}, function(data) {
			$scope.user = {
				error: '数据不存在。。。'
			};
		});
		var urlporta = "/banner/downloadindex",
			data = {};
		var promisea = httpService.multiply(urlporta, data); //下载
		promisea.then(function(data) {
			$scope.indexa = data.detail;
		}, function(data) {
			$scope.user = {
				error: '数据不存在。。。'
			};
		});

		var urlportb = "/banner/newsindex",
			data = {};
		var promiseb = httpService.multiply(urlportb, data); //新闻中心
		promiseb.then(function(data) {
			$scope.indexb = data.detail;
			$scope.isActive = 0;
			$scope.selectItem = function(index) {
				$scope.isActive = index;
			}
		}, function(data) {
			$scope.user = {
				error: '数据不存在。。。'
			};
		});

		var urlportd = "/banner/booktypeindex",
			data = {};
		var promised = httpService.multiply(urlportd, data); //精品图书
		promised.then(function(data) {
			//console.log(JSON.stringify(data))
			$scope.itemd = data.detail;
			$scope.isNow = 0;
			$scope.changeItem = function(index) {
				$scope.isNow = index;
				var type = $scope.itemd[index].type2;

				function run() {
					var urlportc = "/banner/typebookindex"
					var datas = {
						readtype: type
					};
					var promisev = httpService.multiply(urlportc, datas); //精品图书
					promisev.then(function(data) {
						$scope.items = data.detail;
					}, function(data) {
						$scope.user = {
							error: '数据不存在。。。'
						}; //调用承诺接口reject();
					});
				}
				run();
			}
		}, function(data) {
			$scope.user = {
				error: '数据不存在。。。'
			}; //调用承诺接口reject();
		});
		var urlportc = "/banner/typebookindex",
			datad = {
				readtype: "0"
			};
		var promisec = httpService.multiply(urlportc, datad); //精品图书
		promisec.then(function(data) {
			$scope.items = data.detail;
		}, function(data) {
			$scope.user = {
				error: '数据不存在。。。'
			}; //调用承诺接口reject();
		});
	})
	.controller('AboutController', function($scope, $state, httpService) {
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		var id = data.detail[1].publish_menu_id;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
			porm = {
				publish_menu_id: id,
				page: $scope.p
			};
			var prom = httpService.multiply(urlport, porm); //新闻中心
			prom.then(function(data) {
				console.log(JSON.stringify(data))
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		};
		
		$scope.getDatas();
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}
		
		
		
	}).controller('AboutsController', function($scope, $stateParams) {
		$scope.newsid = $stateParams.id;
		alert($scope.newsid)
	}).controller('bookcenteractiveController', function($scope, $state,$stateParams) {
		var index = $stateParams.keys;
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		if(!index){
			index = 0;
		}else{
			
		}
		//console.log(JSON.stringify(data))
		var childlist = data.detail[index].publishtypelist;
		$scope.transferType = childlist;
		
	}).controller('book_recommendController', function($scope, $state, httpService) {
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		var id = data.detail[2].publish_menu_id;
		var moreid = data.detail[2].publishtypelist[0].type_id;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
				porm = {
					publish_menu_id: id,
					type_id: moreid,
					page:$scope.p
				};
			var prom = httpService.multiply(urlport, porm); //新闻中心
			prom.then(function(data) {
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		}
		$scope.getDatas();
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}
	
	}).controller('book_scienceController', function($scope, $stateParams, $state, httpService) {
		var index = $stateParams.key;
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		var id = data.detail[2].publish_menu_id;
		var moreid = data.detail[2].publishtypelist[index].type_id;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
				porm = {
					publish_menu_id: id,
					type_id: moreid,
					page:$scope.p
				};
			var prom = httpService.multiply(urlport, porm); //新闻中心
			prom.then(function(data) {
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		}
		$scope.getDatas();
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}

		
	}).controller('book_cultureController', function($scope, $state, $stateParams, httpService){
		var index = $stateParams.key;
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		var id = data.detail[2].publish_menu_id;
		$scope.moreid = data.detail[2].publishtypelist[index].type_id;
		$scope.threelist = data.detail[2].publishtypelist[index].threelist;
		$scope.now = 0;
		$scope.descript = $scope.threelist[$scope.now].introduction;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
			porm = {
				publish_menu_id: id,
				type_id:$scope.moreid,
				page: $scope.p
			};
			var prom = httpService.multiply(urlport, porm); //新闻中心
			prom.then(function(data) {
				console.log(JSON.stringify(data))
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		};
		
		$scope.getDatas();
		$scope.changeData = function(item,id){
			$scope.now = item;
			$scope.moreid = id;
			$scope.descript = $scope.threelist[$scope.now].introduction;
			$scope.getDatas();
			$scope.p = 1;
		}
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}
	
	}).controller('bookdetailController', function($scope, $state, $stateParams, httpService){//详情页
		$scope.id = $stateParams.id;
		var urlport = "/banner/bookinfo",
				porm = {
					read_id: $scope.id
				};
		$scope.getData = function(){
			var prom = httpService.multiply(urlport, porm);
			prom.then(function(data) {
				//console.log(JSON.stringify(data));
				$scope.result = data.detail;
				$("#meset").append(data.detail.content);
	
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
			
		}
		$scope.getData();
		$scope.preload = function(){
			$scope.id = $scope.result.upreadid;
			porm = {
				read_id: $scope.id
			};
			$("#meset").empty();
			$scope.getData();
		}
		$scope.nextload = function(){
			$scope.id = $scope.result.nextreadid;
			porm = {
				read_id: $scope.id
			};
			$("#meset").empty();
			$scope.getData();
		}
		
		$scope.addlike = function() {
			var urlport = "/banner/likebook",
			porm = {
				read_id: $scope.id
			};
			$.ajax({
				type:"post",
				url:BAS_URL+urlport,
				async:true,
				data:porm,
				success:function(data){
					$scope.$apply(function(){
						$scope.result.likenum = data.detail;
					});
				}
			});
		}
		$scope.jumpOpen = function(){
			var roller = $(".pinglun").offset().top;
			$("body,html").animate({scrollTop:roller},600)
			$(".navs div").animate({
				left: 1* 120
			}, 200);
			$(".ping1").animate({top:-2000},300);
			$(".ping2").animate({top:0},300);
			$(".navs dd").eq(1).addClass("curs").siblings().removeClass("curs");
		
		}
		$scope.reply = function(){
			var img = $("#imgcover").val();
			var id = $scope.id;
			var nickname=$scope.nickname;
			var mail= $scope.mail;
			var content=$scope.content;
			var rid = $scope.rid;
			if(!rid){
				var urlports = "/banner/addcomment",
				porms = {
					read_id: id,
					nickname: nickname,
					mail: mail,
					content: content,
					img: img
				};
			}else{
				var urlports = "/banner/addreply",
				porms = {
					rid: rid,
					nickname: nickname,
					mail: mail,
					content: content,
					img: img
				};
			}
				
			if( !content||!nickname){
				alert("请完善填写内容...");
				return;
			}	

			$.ajax({
				type:"post",
				url:BAS_URL+urlports,
				async:true,
				data:porms,
				success:function(data){
						//alert(data.detail)
						var urlport = "/banner/bookinfo",
							porm = {
								read_id: $scope.id
							};
						var prom = httpService.multiply(urlport, porm);
						prom.then(function(data) {
							$scope.result = data.detail;
							$scope.jumpOpen();
							$scope.rid = undefined;
						}, function(data) {
							$scope.user = {
								error: '数据不存在。。。'
							};
						});
				}

			});
		
			
		}
		$scope.bigger = function(imgs){
			$("html,body").css("overflow","hidden");
			$(".bigger").fadeIn("slow");
			$(".bigger .imggroup").css("background","url("+imgs+") #ffffff")
			//$(".thisimg").attr("src",imgs);
		}
		
		$scope.toreply = function(item,name){
			$scope.rid = item;
			$(".cloopage").find("p").text("回复："+name)
			$(".cloopage").fadeIn("slow");
			$(".navs div").animate({
					left: 0
			}, 200);
			$(".navs dd").eq(0).addClass("curs").siblings().removeClass("curs");
			$(".ping1").animate({top:0},300);
			$(".ping2").animate({top:-2000},300,function(){
				setTimeout(function(){
					$(".cloopage").fadeOut("slow");
				},700)
			});
			
			
			
		}
		
		
		
	}).controller('onlineController', function($scope) {
		var arr = [];
		for(var i = 0; i < 67; i++) {
			var txt = "page/" + i + ".swf";
			arr.push(txt);
		}
		$scope.item = arr;

	}).controller('onlinereadController', function($scope, $stateParams) {
		var type = $stateParams.id;
		if(type == "1") {
			var arr = [];
			for(var i = 1; i < 67; i++) {
				var txt = "allpage/page1/" + i + ".swf";
				arr.push(txt);
			}
			$scope.item = arr;
			var arrs = [];
			for(var i = 1; i < 67; i++) {
				var txt = "allpage/page1/thumb/" + i + ".jpg";
				arrs.push(txt);
			}
			$scope.items = arrs;

		} else if(type == "2") {
			var arr = [];
			for(var i = 1; i < 81; i++) {
				var txt = "allpage/page2/" + i + ".swf";
				arr.push(txt);
			}
			$scope.item = arr;
			var arrs = [];
			for(var i = 1; i < 81; i++) {
				var txt = "allpage/page2/thumb/" + i + ".jpg";
				arrs.push(txt);
			}
			$scope.items = arrs;
		} else {
			var arr = [];
			for(var i = 1; i < 73; i++) {
				var txt = "allpage/page3/" + i + ".swf";
				arr.push(txt);
			}
			$scope.item = arr;
			var arrs = [];
			for(var i = 1; i < 73; i++) {
				var txt = "allpage/page3/thumb/" + i + ".jpg";
				arrs.push(txt);
			}
			$scope.items = arrs;
		}
		$scope.toHere = function(item) {
			var his = 1419;
			$(".imgcontain").animate({
				scrollTop: his * item
			}, 600);
		}

	}).controller('downloadactiveController', function($scope, $stateParams, $state, httpService) {
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		var id = data.detail[4].publish_menu_id;
		var moreid = data.detail[4].publishtypelist[0].type_id;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
				porm = {
					publish_menu_id: id,
					type_id: moreid,
					page:$scope.p
				};
			var prom = httpService.multiply(urlport, porm); //新闻中心
			prom.then(function(data) {
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		}
		$scope.getDatas();
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}
	
		

	}).controller('download_answerController', function($scope, $stateParams, $state, httpService) {
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		var id = data.detail[4].publish_menu_id;
		var moreid = data.detail[4].publishtypelist[1].type_id;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
				porm = {
					publish_menu_id: id,
					type_id: moreid,
					page:$scope.p
				};
			var prom = httpService.multiply(urlport, porm);
			prom.then(function(data) {
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		}
		$scope.getDatas();
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}
	
	
	}).controller('download_dataController', function($scope, $stateParams, $state, httpService) {
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		var id = data.detail[4].publish_menu_id;
		var moreid = data.detail[4].publishtypelist[2].type_id;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
				porm = {
					publish_menu_id: id,
					type_id: moreid,
					page:$scope.p
				};
			var prom = httpService.multiply(urlport, porm);
			prom.then(function(data) {
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		}
		$scope.getDatas();
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}
	
	}).controller('downloaddetailController', function($scope, $state, $stateParams, httpService) {
		$scope.id = $stateParams.id;
		var urlport = "/banner/bookinfo",
				porm = {
					read_id: $scope.id
				};
		$scope.getData = function(){
			var prom = httpService.multiply(urlport, porm);
			prom.then(function(data) {
				//console.log(JSON.stringify(data));
				$scope.result = data.detail;
				$("#meset").append(data.detail.content);
	
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
			
		}
		$scope.getData();
		$scope.preload = function(){
			$scope.id = $scope.result.upreadid;
			porm = {
				read_id: $scope.id
			};
			$("#meset").empty();
			$scope.getData();
		}
		$scope.nextload = function(){
			$scope.id = $scope.result.nextreadid;
			porm = {
				read_id: $scope.id
			};
			$("#meset").empty();
			$scope.getData();
		}
		
		$scope.addlike = function() {
			var urlport = "/banner/likebook",
			porm = {
				read_id: $scope.id
			};
			$.ajax({
				type:"post",
				url:BAS_URL+urlport,
				async:true,
				data:porm,
				success:function(data){
					$scope.$apply(function(){
						$scope.result.likenum = data.detail;
					});
				}
			});
		}
		$scope.jumpOpen = function(){
			var roller = $(".pinglun").offset().top;
			$("body,html").animate({scrollTop:roller},600)
			$(".navs div").animate({
				left: 1* 120
			}, 200);
			$(".ping1").animate({top:-2000},300);
			$(".ping2").animate({top:0},300);
			$(".navs dd").eq(1).addClass("curs").siblings().removeClass("curs");
		
		}
		$scope.reply = function(){
			var img = $("#imgcover").val();
			var id = $scope.id;
			var nickname=$scope.nickname;
			var mail= $scope.mail;
			var content=$scope.content;
			var rid = $scope.rid;
			if(!rid){
				var urlports = "/banner/addcomment",
				porms = {
					read_id: id,
					nickname: nickname,
					mail: mail,
					content: content,
					img: img
				};
			}else{
				var urlports = "/banner/addreply",
				porms = {
					rid: rid,
					nickname: nickname,
					mail: mail,
					content: content,
					img: img
				};
			}
				
			if( !content||!nickname){
				alert("请完善填写内容...");
				return;
			}	

			$.ajax({
				type:"post",
				url:BAS_URL+urlports,
				async:true,
				data:porms,
				success:function(data){
						//alert(data.detail)
						var urlport = "/banner/bookinfo",
							porm = {
								read_id: $scope.id
							};
						var prom = httpService.multiply(urlport, porm);
						prom.then(function(data) {
							$scope.result = data.detail;
							$scope.jumpOpen();
							$scope.rid = undefined;
						}, function(data) {
							$scope.user = {
								error: '数据不存在。。。'
							};
						});
				}

			});
		
			
		}
		$scope.bigger = function(imgs){
			$("html,body").css("overflow","hidden");
			$(".bigger").fadeIn("slow");
			$(".bigger .imggroup").css("background","url("+imgs+") #ffffff")
			//$(".thisimg").attr("src",imgs);
		}
		
		$scope.toreply = function(item,name){
			$scope.rid = item;
			$(".cloopage").find("p").text("回复："+name)
			$(".cloopage").fadeIn("slow");
			$(".navs div").animate({
					left: 0
			}, 200);
			$(".navs dd").eq(0).addClass("curs").siblings().removeClass("curs");
			$(".ping1").animate({top:0},300);
			$(".ping2").animate({top:-2000},300,function(){
				setTimeout(function(){
					$(".cloopage").fadeOut("slow");
				},700)
			});
			
			
			
		}
		

	}).controller('publicheadController', function($scope,$stateParams) {
		$scope.its = $stateParams.keys;
		var index = $stateParams.keys;
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		if(!index){
			index = 0;
		}else{
			
		}
		//console.log(JSON.stringify(data))
		var childlist = data.detail[index].publishtypelist;
		var mainame = data.detail[index].menu_name;
		$scope.transferType = childlist;
		$scope.nowtitle = mainame;
		
		if(!index){
			$(".bannerImg").css("background-image","url(images/onlineread.png)");
		}else{
			var bannerlist = data.detail[index].bannerlist;
			$scope.bannerlist = bannerlist[0];
			$(".bannerImg").css("background-image","url("+bannerlist[0].imgurl+")");
		}
		

	}).controller('publicController', function($scope, $stateParams, $state, httpService) {
		var urlport = "/banner/publicbook",
			porm = {
			};
		var prom = httpService.multiply(urlport, porm);
		prom.then(function(data) {
			$scope.remen = data.detail.remen;
			$scope.zuijin = data.detail.zuijin;
			$scope.comment = data.detail.comment;
		}, function(data) {
			$scope.user = {
				error: '数据不存在。。。'
			};
		});
		
		
		
		
		

	}).controller('specialController', function($scope, $stateParams, $state, httpService) {
		var index = $stateParams.key;
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		$scope.p = 1;
		if(!index){
			index = 0;
		}
		var id = data.detail[5].publish_menu_id;
		var moreid = data.detail[5].publishtypelist[index].type_id;
		$scope.getDatas = function(){
			var urlport = "/banner/selectmenu",
				porm = {
					publish_menu_id: id,
					type_id: moreid,
					page: $scope.p
				};
			var prom = httpService.multiply(urlport, porm);
			prom.then(function(data) {
				$scope.result = data.detail;
				$scope.total = data.detail.totalPage;
				var arrs = [],total=$scope.total;
				if($scope.p>8){
					return;
				}
				if(total>8){
					total = 8;
				}
				for(var i=1; i<total+1;i++){
					arrs.push(i);
				}
				$scope.arrs = arrs;
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		}
		$scope.getDatas();
		$scope.preData = function(){
			if($scope.p>1){
				$scope.p--;
				$scope.getDatas();
				if($scope.p<8){
					return;
				}
				if($scope.p<$scope.total-7){
					var arrd = [];
					for(var i=0;i<$scope.arrs.length;i++){
						arrd.push($scope.arrs[i]-1);
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = 1;
			}
		}
		$scope.nexData = function(){
			if($scope.p<$scope.total){
				$scope.p++;
				$scope.getDatas();
				if($scope.p>$scope.total){
					return;
				}
				if($scope.p>8){
					var arrd = [];
					if($scope.p>$scope.total-7){
						var k = $scope.total-7;
						for(var i=k;i<k+8;i++){
							arrd.push(i);
						}
					}else{
						for(var i=0;i<$scope.arrs.length;i++){
						 arrd.push($scope.arrs[i]+1);
						}
					}
					$scope.arrs = arrd;
				}
			}else{
				$scope.p = total;
			}
		}
		$scope.thisData = function(item){
			$scope.p = item;
			$scope.getDatas();
		}

	}).controller('AboutmainController', function($scope, indexFac, httpService) {
		var all = localStorage.getItem("all");
		var data = JSON.parse(all);
		var id = data.detail[6].publish_menu_id;
		var urlport = "/banner/selectmenu",
			porm = {
				publish_menu_id: id
			};
		var prom = httpService.multiply(urlport, porm);
		prom.then(function(data) {
			//console.log(JSON.stringify(data))
			localStorage.setItem("lastdetail",JSON.stringify(data))
			$scope.result = data.detail.department;
			$("#read").append(data.detail.introduction);
		}, function(data) {
			$scope.user = {
				error: '数据不存在。。。'
			};
		});
		$scope.maindata = indexFac.setNewList();
		$scope.secondata = [{
			imgs: "images/214x207_1.jpg"
		}, {
			imgs: "images/214x207_2.jpg"
		}, {
			imgs: "images/214x207_3.jpg"
		}, {
			imgs: "images/214x207_4.jpg"
		}, {
			imgs: "images/214x207_5.jpg"
		}];
		$scope.toggle = function(item) {
			$(".hd ul li").eq(item).addClass("currents").siblings().removeClass("currents");
			$(".bd ul").animate({
				marginLeft: -1100 * item
			}, 200);
			var lengths = $scope.maindata.length;
			if(lengths < 5) {

			} else {
				if(item > 3) {
					if(item == lengths - 1) {

					} else {
						var items = item - 3;
						$(".hd ul").animate({
							marginLeft: -220 * items
						}, 200)
					}
				} else {
					$(".hd ul").animate({
						marginLeft: 0
					}, 200)
				}
			}
		};
	}).controller('AboutdetailController', function($scope,$stateParams,httpService) {
			var all = localStorage.getItem("all");
			var data = JSON.parse(all);
			var id = data.detail[6].publish_menu_id;
			var urlport = "/banner/selectmenu",
				porm = {
					publish_menu_id: id
				};
			var prom = httpService.multiply(urlport, porm);
			prom.then(function(data) {
				//console.log(JSON.stringify(data))
				$(".show").append(data.detail.introduction);
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
			var alllist = localStorage.getItem("lastdetail");
			var index = $stateParams.id;
			if(index==""){
				$(".show").append("<p></p>");
				$scope.titles = "出版社简介";
				$scope.createtime = "2017-06-30 16:03:24";
			}else{
				var data = JSON.parse(alllist);
				$(".show").append(data.detail.department[index].content);
				$scope.titles = data.detail.department[index].department_name;
				$scope.createtime = data.detail.department[index].createtime;
			}
			
			
			
			
	}).controller('submissionController', function($scope) {

	}).controller('introduceController', function($scope) {

	}).controller('contactsController', function($scope,httpService) {
		$scope.jumpRun = function(){
			var name = $scope.name;
			var mail = $scope.mail;
			var area = $scope.area;
			if(!name||!area||!mail){
				alert("请填写昵称、邮箱和留言...");return
			}
			var urlport = "/banner/publishmessage",
			porm = {
				content:area,
				nickname:name,
				mail:mail
			};
			var prom = httpService.multiply(urlport, porm);
			prom.then(function(data) {
				alert(0)
			}, function(data) {
				$scope.user = {
					error: '数据不存在。。。'
				};
			});
		}
		
		
		
	})