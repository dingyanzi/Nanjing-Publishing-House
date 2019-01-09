var Header = React.createClass({
	render:function(){
		return(
		<div className="topwrap">
			<div className="main cc">
				<img src="images/logo.png"/>
				<div className="rt">
					<div className="search_open">
						<div className="se1">
							<input type="text" placeholder="输入百度搜索内容"/>
							<a className="search1" href="javascript:void(0)">
							<i className="icon iconfont icon-search"></i>搜索</a>
						</div>
						<div className="se2">
							<input type="text" placeholder="输入本站搜索内容"/>
							<a className="search2" href="javascript:void(0)">
							<i className="icon iconfont icon-search"></i>搜索</a>
							</div>
							<a href="#" id="remove">取消</a>
					</div>
					<a id="search" onClick = {this.handelClick} href="javascript:void(0)"><i className="icon iconfont icon-search"></i>搜索</a>
					<a id="login" onClick = {this.removeClick} href="javascript:void(0)"><i className="icon iconfont icon-login"></i>登录</a>
				</div>
				<div className="nav">
					<ul className="cc">
						<li className="on">
							<a href="javascript:void(0)">首页</a><i></i></li>
						<li>
							<a href="javascript:void(0)">新闻公告</a><i></i>
						</li>
						<li>
							<a href="javascript:void(0)">图书中心</a><i></i>
						</li>
						<li>
							<a href="javascript:void(0)">在线阅读</a><i></i>
						</li>
						<li>
							<a href="javascript:void(0)">资料下载</a><i></i>
						</li>
						<li>
							<a href="javascript:void(0)">专题文章</a><i></i>
						</li>
						<li>
							<a href="javascript:void(0)">关于我们</a><i></i>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
	},
	handelClick:function(){
		alert(0);
	},
	removeClick:function(){
		alert(1);
	}
});
ReactDOM.render(
	<Header/>, 
	document.getElementById("main")
);