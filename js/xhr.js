$(document).ready(function() {
	// function html2word(Area) {
	// 	var oWD = new ActiveXObject("Word.Application");
	// 	var oDC = oWD.Documents.Add("", 0, 1);
	// 	var oRange = oDC.Range(0, 1);
	// 	var sel = document.body.createTextRange();
	// 	sel.moveToElementText(document.getElementById(Area));
	// 	sel.select();
	// 	sel.execCommand("Copy");
	// 	oRange.Paste();
	// 	oWD.Application.Visible = true;
	// }
	
	// $('a#goword').click(function(event) {
	// 	/* Act on the event */
	// 	html2word('img_wall');
	// });
	var weibo_btn = document.body.querySelector("button.go-weibo-btn");
	weibo_btn.addEventListener("click", function(event){
		chrome.tabs.create({
			"url": "https://api.weibo.com/oauth2/authorize?client_id=2888460384&response_type=code&redirect_uri=http://weibo.com/vimisky",
			"active": true
		}, function(tab) {
			console.log("[调试] 打开微博授权页", tab);
		});
	});
	var weibo_token_btn = document.body.querySelector("button.go-weibo-token-btn");
	weibo_token_btn.addEventListener("click", function(event){
		var code_input = document.body.querySelector("#weibo_code_input");
		console.log("[调试] code_input ", code_input);
		var rurls = ["https://api.weibo.com/*"];
		request_cross_site_request_permission(rurls, get_weibo_token, code_input.value);
		// get_weibo_token(code_input.value);
	});

	function request_cross_site_request_permission(sites_need_permission, callback, param){
		chrome.permissions.request({
			permissions: ['tabs'],
			origins: sites_need_permission
		}, function(granted) {
			// The callback argument will be true if the user granted the permissions.
			if (granted) {
				console.log("用户同意该访问权限");
				for (var i = sites_need_permission.length - 1; i >= 0; i--) {
					// get_img_file(url_array[i], sender.tab.id);
					callback(param);
				};
			} else {
				console.log("用户拒绝该访问权限", sites_need_permission);
				// notification_user(chrome.i18n.getMessage("noticeImageURLCrossDomainNotPermit"));
			}
		});
	}

	function get_weibo_token(code){
		var token_span = document.body.querySelector("#access_token_span");
		var access_token_input = document.body.querySelector("#access_token_input");
		var xhr = new XMLHttpRequest(),
			method = "post",
			url = "https://api.weibo.com/oauth2/access_token" ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo access token 为",res.access_token);
					token_span.innerHTML = res.access_token;
					access_token_input.value = res.access_token;
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式

		// DOMString方式
		var params_string = "client_id=2888460384&client_secret=a2cd5af21e5457b5ea0d0acced39c124&"+
				"grant_type=authorization_code"+
				"&redirect_uri=http://weibo.com/vimisky"+
				"&code="+code;
		xhr.send(params_string);
	}

	var weibo_public_timeline_btn = document.body.querySelector("button.weibo-public_timeline-btn");
	weibo_public_timeline_btn.addEventListener("click", function(event){
		var result_pcount = document.body.querySelector("#result_pcount");
		var result_page = document.body.querySelector("#result_page");
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var page = result_page.value == ""?1:result_page.value;
		get_public_timeline(pcount, page);
	});

	function get_public_timeline(count, page){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&count="+ count +
				"&page=" + page;				
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/statuses/public_timeline.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}
	var weibo_friends_timeline_btn = document.body.querySelector("button.weibo-friends_timeline-btn");
	weibo_friends_timeline_btn.addEventListener("click", function(event){
		var since_id = document.body.querySelector("#friends_timeline_since_id");
		var max_id = document.body.querySelector("#friends_timeline_max_id");
		var result_pcount = document.body.querySelector("#friends_timeline_result_pcount");
		var result_page = document.body.querySelector("#friends_timeline_result_page");
		var filter_type = document.body.querySelector("#friends_timeline_filter_type");
		var trim_user = document.body.querySelector("#friends_timeline_trim_user");
		var sid = since_id.value == ""?0:since_id.value;
		var mid = max_id.value == ""?0:max_id.value;
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var page = result_page.value == ""?1:result_page.value;
		var ftfeature = filter_type.value;
		var tuser = trim_user.value;
		get_friends_timeline(sid, mid, pcount, page, ftfeature, tuser);
	});

	function get_friends_timeline(since_id, max_id, count, page, feature, trim_user){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&since_id="+ since_id +
				"&max_id="+ max_id +
				"&count="+ count +
				"&page=" + page +
				"&feature="+ feature +
				"&trim_user="+ trim_user;				
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/statuses/friends_timeline.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}	
	var weibo_home_timeline_btn = document.body.querySelector("button.weibo-home_timeline-btn");
	weibo_home_timeline_btn.addEventListener("click", function(event){
		var since_id = document.body.querySelector("#home_timeline_since_id");
		var max_id = document.body.querySelector("#home_timeline_max_id");
		var result_pcount = document.body.querySelector("#home_timeline_result_pcount");
		var result_page = document.body.querySelector("#home_timeline_result_page");
		var filter_type = document.body.querySelector("#home_timeline_filter_type");
		var trim_user = document.body.querySelector("#home_timeline_trim_user");
		var sid = since_id.value == ""?0:since_id.value;
		var mid = max_id.value == ""?0:max_id.value;
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var page = result_page.value == ""?1:result_page.value;
		var ftfeature = filter_type.value;
		var tuser = trim_user.value;
		get_home_timeline(sid, mid, pcount, page, ftfeature, tuser);
	});

	function get_home_timeline(since_id, max_id, count, page, feature, trim_user){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&since_id="+ since_id +
				"&max_id="+ max_id +
				"&count="+ count +
				"&page=" + page +
				"&feature="+ feature +
				"&trim_user="+ trim_user;				
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/statuses/home_timeline.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}	
	var weibo_user_timeline_btn = document.body.querySelector("button.weibo-user_timeline-btn");
	weibo_user_timeline_btn.addEventListener("click", function(event){
		var uid_input = document.body.querySelector("#user_timeline_uid");
		var screen_name_input = document.body.querySelector("#user_timeline_screen_name");
		var since_id = document.body.querySelector("#user_timeline_since_id");
		var max_id = document.body.querySelector("#user_timeline_max_id");
		var result_pcount = document.body.querySelector("#user_timeline_result_pcount");
		var result_page = document.body.querySelector("#user_timeline_result_page");
		var filter_type = document.body.querySelector("#user_timeline_filter_type");
		var trim_user = document.body.querySelector("#user_timeline_trim_user");
		var uid = uid_input.value == ""?null:uid_input.value;
		var screen_name = screen_name_input.value == ""?null:screen_name_input.value;
		var sid = since_id.value == ""?0:since_id.value;
		var mid = max_id.value == ""?0:max_id.value;
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var page = result_page.value == ""?1:result_page.value;
		var ftfeature = filter_type.value;
		var tuser = trim_user.value;
		get_user_timeline(uid, screen_name, sid, mid, pcount, page, ftfeature, tuser);
	});

	function get_user_timeline(uid, screen_name, since_id, max_id, count, page, feature, trim_user){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&since_id="+ since_id +
				"&max_id="+ max_id +
				"&count="+ count +
				"&page=" + page +
				"&feature="+ feature +
				"&trim_user="+ trim_user;	
		if (uid != null) {
			params_string = params_string + "&uid=" + uid;
		};	
		if (screen_name != null) {
			params_string = params_string + "&screen_name=" + screen_name;
		};		
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/statuses/user_timeline.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}
	var weibo_mentions_btn = document.body.querySelector("button.weibo-mentions-btn");
	weibo_mentions_btn.addEventListener("click", function(event){

		var since_id = document.body.querySelector("#mentions_since_id");
		var max_id = document.body.querySelector("#mentions_max_id");
		var result_pcount = document.body.querySelector("#mentions_result_pcount");
		var result_page = document.body.querySelector("#mentions_result_page");
		var filter_by_author = document.body.querySelector("#mentions_filter_by_author");
		var filter_by_source = document.body.querySelector("#mentions_filter_by_source");
		var filter_by_type = document.body.querySelector("#mentions_filter_by_type");
		var sid = since_id.value == ""?0:since_id.value;
		var mid = max_id.value == ""?0:max_id.value;
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var page = result_page.value == ""?1:result_page.value;
		var fbauthor = filter_by_author.value;
		var fbsource = filter_by_source.value;
		var fbtype = filter_by_type.value;
		get_mentions_timeline(sid, mid, pcount, page, fbauthor, fbsource, fbtype);
	});

	function get_mentions_timeline(since_id, max_id, count, page, fbauthor, fbsource, fbtype){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&since_id="+ since_id +
				"&max_id="+ max_id +
				"&count="+ count +
				"&page=" + page +
				"&filter_by_author="+ fbauthor +
				"&filter_by_source="+ fbsource +
				"&filter_by_type="+ fbtype;	
	
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/statuses/mentions.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}	
	var weibo_search_topics_btn = document.body.querySelector("button.weibo-search_topics-btn");
	weibo_search_topics_btn.addEventListener("click", function(event){

		var querystring_input = document.body.querySelector("#search_topics_query");
		var result_pcount = document.body.querySelector("#mentions_result_pcount");
		var result_page = document.body.querySelector("#mentions_result_page");
		var querystring = querystring_input.value;
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var page = result_page.value == ""?1:result_page.value;
		get_search_topics(querystring, pcount, page);
	});

	function get_search_topics(querystring, count, page){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&q="+ querystring +
				"&count="+ count +
				"&page=" + page;	
	
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/search/topics.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}	
	var weibo_friendship_friends_btn = document.body.querySelector("button.weibo-friends-btn");
	weibo_friendship_friends_btn.addEventListener("click", function(event){
		var uid_input = document.body.querySelector("#friends_uid");
		var screen_name_input = document.body.querySelector("#friends_screen_name");
		var result_pcount = document.body.querySelector("#friends_result_pcount");
		var result_cursor = document.body.querySelector("#friends_result_cursor");
		var trim_status = document.body.querySelector("#friends_trim_status");
		var uid = uid_input.value == ""?null:uid_input.value;
		var screen_name = screen_name_input.value == ""?null:screen_name_input.value;
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var cursor = result_cursor.value == ""?0:result_cursor.value;
		var tstatus = trim_status.value;
		get_friendship_friends(uid, screen_name, pcount, cursor, tstatus);
	});

	function get_friendship_friends(uid, screen_name, count, cursor, trim_status){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&count="+ count +
				"&cursor=" + cursor +
				"&trim_status="+ trim_status;	
		if (uid != null) {
			params_string = params_string + "&uid=" + uid;
		};	
		if (screen_name != null) {
			params_string = params_string + "&screen_name=" + screen_name;
		};		
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/friendships/friends.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}	
	var weibo_friendship_followers_btn = document.body.querySelector("button.weibo-followers-btn");
	weibo_friendship_followers_btn.addEventListener("click", function(event){
		var uid_input = document.body.querySelector("#followers_uid");
		var screen_name_input = document.body.querySelector("#followers_screen_name");
		var result_pcount = document.body.querySelector("#followers_result_pcount");
		var result_cursor = document.body.querySelector("#followers_result_cursor");
		var trim_status = document.body.querySelector("#followers_trim_status");
		var uid = uid_input.value == ""?null:uid_input.value;
		var screen_name = screen_name_input.value == ""?null:screen_name_input.value;
		var pcount = result_pcount.value == ""?50:result_pcount.value;
		var cursor = result_cursor.value == ""?0:result_cursor.value;
		var tstatus = trim_status.value;
		get_friendship_followers(uid, screen_name, pcount, cursor, tstatus);
	});
	function get_friendship_followers(uid, screen_name, count, cursor, trim_status){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value+
				"&count="+ count +
				"&cursor=" + cursor +
				"&trim_status="+ trim_status;	
		if (uid != null) {
			params_string = params_string + "&uid=" + uid;
		};	
		if (screen_name != null) {
			params_string = params_string + "&screen_name=" + screen_name;
		};		
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/friendships/followers.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}	
	var weibo_user_show_btn = document.body.querySelector("button.weibo-users-btn");
	weibo_user_show_btn.addEventListener("click", function(event){
		var uid_input = document.body.querySelector("#users_uid");
		var screen_name_input = document.body.querySelector("#users_screen_name");
		var uid = uid_input.value == ""?null:uid_input.value;
		var screen_name = screen_name_input.value == ""?null:screen_name_input.value;

		get_user_show(uid, screen_name);
	});
	function get_user_show(uid, screen_name){
		var access_token_input = document.body.querySelector("#access_token_input");
		// var token_string = "2.00bUttEDiUgTJD00db796baeO6MHaD";
		// DOMString方式
		// var params_string = "access_token="+token_span.innerHTML+
		// 		"&count="+ count +
		// 		"&page=" + page;
		var params_string = "access_token="+access_token_input.value;	
		if (uid != null) {
			params_string = params_string + "&uid=" + uid;
		};	
		if (screen_name != null) {
			params_string = params_string + "&screen_name=" + screen_name;
		};		
		var xhr = new XMLHttpRequest(),
			method = "get",
			url = "https://api.weibo.com/2/users/show.json?"+params_string ;
				
		xhr.open(method, url, true, null, null);
		xhr.responseType = "json";
		xhr.onreadystatechange = function(event){
			console.log("[调试] readyState", xhr.readyState);
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					var res = xhr.response;
					console.log("[调试] sina weibo res 为",res);
					var result_div = document.body.querySelector("#result_div");
					result_div.innerHTML = JSON.stringify(res);
				}else{
					console.log("[调试] 请求返回错误，状态为", xhr.status,"内容为", xhr.response);
				};
			};
		};
		xhr.timeout = 1500;//ms
		xhr.ontimeout = function(event){
			console.log("[调试] 接收到请求timeout事件", event);
		}
		//设置header
		// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		// xhr.setRequestHeader("client_id", "2888460384");
		// xhr.setRequestHeader("client_secret","a2cd5af21e5457b5ea0d0acced39c124");
		// FormData方式

		// Blob方式


		xhr.send();		
	}						
});