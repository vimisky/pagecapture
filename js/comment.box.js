

var cdata = [
  {id: 1, author: "魏海涛", text: "是否该唱一首《一样的月光》？"},
  {id: 2, author: "谢霆锋", text: "我不会、我会唱《别来无恙》，可以吗？"},
  {id: 3, author: "魏海涛", text: "是否该唱一首《一样的月光》？"},
  {id: 4, author: "魏海涛", text: "是否该唱一首《一样的月光》？"},
  {id: 5, author: "魏海涛", text: "是否该唱一首《一样的月光》？"},
  {id: 6, author: "魏海涛", text: "是否该唱一首《一样的月光》？"},
  {id: 7, author: "魏海涛", text: "是否该唱一首《一样的月光》？"},
  {id: 8, author: "魏海涛", text: "是否该唱一首《一样的月光》？"}
];

var weibo_api_settings = {
	"statuses_public_timeline":{"id":0,"type":0,"name":"广场","desc":"获取最新的公共微博","domain":"https://api.weibo.com/2/","path":"statuses/public_timeline.json","params":{
		"count":50,
		"page":1
	}},
	"statuses_friends_timeline":{"id":1,"type":0,"name":"好友微博","desc":"获取当前登录用户及其所关注用户的最新微博 ","domain":"https://api.weibo.com/2/","path":"statuses/friends_timeline.json","params":{
		"since_id":0,
		"max_id":0,
		"count":50,
		"page":1,
		"base_app":0,
		"feature":0,
		"trim_user":0
	}},
	"statuses_home_timeline":{"id":2,"type":0,"name":"用户主页","desc":"获取当前登录用户及其所关注用户的最新微博 ","domain":"https://api.weibo.com/2/","path":"statuses/home_timeline.json","params":{
		"since_id":0,
		"max_id":0,
		"count":50,
		"page":1,
		"base_app":0,
		"feature":0,
		"trim_user":0
	}},
	"statuses_user_timeline":{"id":3,"type":0,"name":"用户微博","desc":" 获取用户发布的微博","domain":"https://api.weibo.com/2/","path":"statuses/user_timeline.json","params":{
		"uid":0,
		"screen_name":"",
		"since_id":0,
		"max_id":0,
		"count":50,
		"page":1,
		"base_app":0,
		"feature":0,
		"trim_user":0
	}},
	"statuses_mentions":{"id":4,"type":0,"name":"提到我的","desc":"获取@当前用户的最新微博 ","domain":"https://api.weibo.com/2/","path":"statuses/mentions.json","params":{
		"since_id":0,
		"max_id":0,
		"count":50,
		"page":1,
		"filter_by_author":0,
		"filter_by_source":0,
		"filter_by_type":0
	}},
	"statuses_bilateral_timeline":{"id":5,"type":0,"name":"双向关注","desc":"获取双向关注用户的最新微博 ","domain":"https://api.weibo.com/2/","path":"statuses/bilateral_timeline.json","params":{
		"since_id":0,
		"max_id":0,
		"count":50,
		"page":1,
		"base_app":0,
		"feature":0,
		"trim_user":0
	}}						
};


var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment">
				<div className="commentTime">
					<i className="fa fa-briefcase"></i>
					 {this.props.created_time}
				</div>
				<div className="commentContent">
					<div className="commentAuthor">
						<strong>{this.props.author}</strong>
					</div>
					<div className="commentDetail">
						{this.props.children}
					</div>
					
				</div>
			</div>
		);
	}
});

function throttle(method, context, event) {
	clearTimeout(method.tId);
	var thatevent = event;
	method.tId = setTimeout(function(){
		method.call(context, thatevent);
	}, 500);
}

function throttle_(func, wait, options) {
    /* options的默认值
     *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
     *  options.leading = true;
     * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
     *  options.trailing = true; 
     * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
     */
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 当到达wait指定的时间间隔，则调用func函数
      // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
      if (remaining <= 0 || remaining > wait) {
        // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        // options.trailing=true时，延时执行func函数
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };


function adjust_top(event, context){
	var that = context;
	console.log("[debug] this", that, event);
	if (that.moveflag) {
		// console.log("[调试] commentList MouseMove at", event.target ,event.clientX ,event.clientY, event.screenX, event.screenY);
		var distance = event.pageY - that.pointY;
		var clist = event.currentTarget;
		
		clist.style.top = clist.style.top || 0;
		var top = Number.parseInt(clist.style.top);
		console.log("[调试] list高度为%d, 当前top is %d, 移动距离distance is %d, ",clist.scrollHeight, top, distance);
		// console.log("[调试]", clist);
		if (top+distance < 0 && top+distance + Number.parseInt(clist.scrollHeight) >0) {
			clist.style.top = (top + distance)  + "px";
			that.pointY = that.pointY + distance;
		}
		
	};
	event.stopPropagation();
	event.preventDefault();		
}
//this.getDOMNode() React Component转换为DOM
//DOM转换为React Component ???

var CommentList = React.createClass({
	getInitialState: function() {
		return {
			movey:0
		};
	},
	mouseDownHandler:function(event){
		console.log("[调试] commentList Mousedown at", event.clientX ,event.clientY, event.screenX, event.screenY);
		this.moveflag = true;
		this.pointY = event.pageY;
		event.preventDefault();
		event.stopPropagation();		
	},
	mouseMoveHandler:function(event){
		// var dd = event;
		// throttle_(adjust_top, 500, event);
		adjust_top(event, this);
	},
	mouseUpHandler:function(event){
		console.log("[调试] commentList MouseUp at", event.clientX ,event.clientY, event.screenX, event.screenY);
		this.moveflag = false;
		this.pointY = null;
		event.stopPropagation();
		event.preventDefault();		
	},		
	componentDidMount: function() {
		this.moveflag = false;
		this.pointY = null;
	},
	render: function() {
		var commentNodes = [];
		var comments = this.props.comments;
		for (var i = 0; i <= comments.length - 1; i++) {
			var commentNode = (
				<Comment author={comments[i].user.name} created_time={comments[i].created_at} key={comments[i].id}>{comments[i].text}</Comment>
			);
			commentNodes.push(commentNode);
		};
		return (
			<div className="commentList" onMouseDown={this.mouseDownHandler} onMouseMove={this.mouseMoveHandler} onMouseUp={this.mouseUpHandler}>
				{commentNodes}
			</div>
		);
	}
});
var CommentNav = React.createClass({
	previous_page_function: function() {
		console.log("[debug] previous page button clicked1!!");
	},
	next_page_function: function() {
		console.log("[debug] next page button clicked1!!");
	},	
	render: function() {
		return (
			<div className="commentNav">
				<button id="previous_page_btn" onClick={this.previous_page_function}>上一页</button>
				<button id="next_page_btn" onClick={this.next_page_function}>下一页</button>
			</div>
		);
	}
});
var CommentForm = React.createClass({
	refresh_page_function: function(event) {
		console.log("[调试] refresh btn clicked", this, this.props.container);
		this.props.container.loadComments();
	},
	render: function() {
		return (
			<div className="commentForm">
				<input id="weibo_token" name="weibo_token" size="40" placeholder="请输入微博开放平台token" />
				<button class="refresh_weibo_btn" onClick={this.refresh_page_function}>刷新</button>
			</div>
		);
	}
});
var CommentMenu = React.createClass({
	menuitem_clicked: function(event) {
		var item = event.target;
		console.log("[调试] 被选中的菜单项为", item.type);
		var previous_selected_item = item.parentNode.querySelector("li.selected");
		previous_selected_item.classList.remove("selected");
		item.classList.add("selected");
		this.props.container.props.type = item.type;
		this.props.container.props.options = {};
		this.props.container.loadComments();
	},
	render: function() {
		return (
			<div className="commentMenu">
				<ul className="commentMenuList">
					<li className="selected" type="statuses_public_timeline" onClick={this.menuitem_clicked}>广场</li>
					<li type="statuses_home_timeline" onClick={this.menuitem_clicked}>用户微博</li>
					<li type="statuses_bilateral_timeline" onClick={this.menuitem_clicked}>双向关注的好友微博</li>
					<li type="statuses_friends_timeline" onClick={this.menuitem_clicked}>好友微博</li>
				</ul>
			</div>
		);
	}
});
var CommentBox = React.createClass({
	loadComments: function() {

		var access_token_input = document.body.querySelector("#weibo_token");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value;
		var weibo_api_setting = weibo_api_settings[this.props.type];
		var keys = Object.keys(weibo_api_setting.params);
		for (var i = keys.length - 1; i >= 0; i--) {
			params_string = params_string + "&"+ keys[i] + "=" + weibo_api_setting.params[keys[i]];
		};

		var url = weibo_api_setting.domain+weibo_api_setting.path+"?"+params_string ;		
		var that = this;
		JSONPRequest.send(url, function(data){
			console.log("[调试] ",that,"获取的微博数据为", data);

			that.setState({"data":data.data.statuses});
		});

		
	},
	getInitialState: function() {
		return {
			data:[]
		};
	},
	componentDidMount: function(){
		// this.loadComments();
		// setInterval(this.loadComments, this.props.pollInterval);
		var options = this.props.options || {};
		var keys = Object.keys(options);
		var weibo_api_setting = weibo_api_settings[this.props.type];
		for (var i = keys.length - 1; i >= 0; i--) {
			weibo_api_setting.params[keys[i]] = options[keys[i]];
		};
	},
	render: function() {
		return (
		  <div className="commentBox">
		  	<div className="commentBoxTitle"><i className="fa fa-weibo"></i>&nbsp;{this.props.title.toString()}</div>
		  	<CommentMenu container={this}/>
		    <CommentForm container={this}/>
		    <div className="commentlist-container">	    
		    <CommentList comments={this.state.data}/>
		    </div>
		    <CommentNav />
		  </div>
		);
	}
});

var ddata = {"page":2, "count":50};
var sodata = {};
var dtitle = '新浪微博';
ReactDOM.render(
  <CommentBox type="statuses_home_timeline" options={ddata} title={dtitle} pollInterval="1000"/>
  ,
  document.getElementById('tototo')
);
// ReactDOM.render(
//   <CommentBox type="statuses_bilateral_timeline" options={sodata} pollInterval="1000"/>
//   ,
//   document.getElementById('sososo')
// );
// ReactDOM.render(
//   <CommentBox type="statuses_friends_timeline" pollInterval="1000"/>
//   ,
//   document.getElementById('uououo')
// );
// ReactDOM.render(
//   <CommentBox type="statuses_public_timeline" pollInterval="1000"/>
//   ,
//   document.getElementById('vovovo')
// );