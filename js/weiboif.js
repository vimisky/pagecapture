
var weibo_api_settings_test = {
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


console.log("[调试] 试一下JSON Object的keys", Object.keys(weibo_api_settings_test));
