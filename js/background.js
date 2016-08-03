var target_rule = {
	"url_new": "http://dev.cloudxinhua.com:8022/wordpress/wp-admin/post-new.php"
};
var crawler_rule = [{
	"url_regex": /http:\/\/www.cnblogs.com\/\S+\/p\/\d+\.html/g
}];
console.log("[调试] 原字符串为", crawler_rule[0].url_regex);
var tab_crawler;

function notification_user(msg) {
	var msg_opts = {};
	msg_opts.type = 'basic';
	msg_opts.iconUrl = 'images/icon128x128.png';
	msg_opts.title = chrome.i18n.getMessage("extName");
	msg_opts.message = msg;
	msg_opts.isClickable = true;
	chrome.notifications.create('hehe', msg_opts, function(notificationId) {
		console.log('[用户通知]发送成功,ID:' + notificationId);
	});
}

function google_format_to_regex(str) {
	var sdot = str.replace(/\*/g, '\\S*');
	sdot = sdot.replace(/\./g, '\\.');
	sdot = sdot.replace(/\//g, '\\/');
	console.log("[调试] 转换后的字符串为", sdot);
	return sdot;
}

function config_reload() {
	cAstConfig.api.crawler_rule_query_all(function(rules) {
		crawler_rule = rules;
		if (null == crawler_rule) {
			notification_user(chrome.i18n.getMessage("noticeCrawlRuleNotFound"));
		} else {
			for (var i = crawler_rule.length - 1; i >= 0; i--) {
				crawler_rule[i].url_regex = google_format_to_regex(crawler_rule[i].url_regex);
			};
		}

	});
	cAstConfig.api.target_rule_query(function(rule) {
		target_rule = rule;
		if (null == target_rule) {
			notification_user(chrome.i18n.getMessage("noticeTargetRuleNotFound"));
		}
	});
}
config_reload();

function shareto(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的转载按钮被点击!");
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var is_in = false;
	for (var i = crawler_rule.length - 1; i >= 0; i--) {
		if (tab_clicked.url.match(crawler_rule[i].url_regex)) {
			is_in = true;
		}
	}
	if (!is_in) {
		notification_user(chrome.i18n.getMessage("noticeCrawlRuleNotFound"));
		return;
	};
	tab_crawler = null;
	if (null != target_rule && null != target_rule.url_new) {
		// chrome.tabs.query({"active":true},function(tabs){
		// 	tab_crawler = tabs[0];
		// 	console.log("当前活动tab是");
		// 	console.log(tab_crawler);
		// });
		console.log("[调试] tab_crawler状态", tab_clicked);
		tab_crawler = tab_clicked;
		chrome.tabs.create({
			"url": target_rule.url_new + "#fromassistent",
			"active": true
		}, function(tab) {
			console.log("[调试] 打开转载目标页", tab);
		});
	} else {
		notification_user(chrome.i18n.getMessage("noticeTargetRuleNotFound"));
	}

}

function check_photo_upload_panel(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看图片上传状态按钮被点击");
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};
	msg_btn_clicked.type = "Target.ImagesPanelOpen";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(target_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", target_response);
	});
}

function enable_dom_element_operator_btn() {
	//update brother nodes enabled
	chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel", {
		"enabled": true
	});
	// chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel.copydompath", {"enabled":true});
	// chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel.copyelement", {"enabled":true});
	// chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel.copytext", {"enabled":true});	
}

function disable_dom_element_operator_btn() {
	//update brother nodes disabled
	chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel", {
		"enabled": false
	});
	// chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel.open", {"enabled":false});
	// chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel.copydompath", {"enabled":false});
	// chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel.copyelement", {"enabled":false});
	// chrome.contextMenus.update("btn.rightclick.set_element_dom_path_panel.copytext", {"enabled":false});	
}

function enable_set_element_dom_path_panel(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的开启/关闭设置DOM规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};
	if (info.checked == true) {
		msg_btn_clicked.type = "Crawler.DomSelectorEnabled";
		enable_dom_element_operator_btn();
		chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
			console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
		});
	} else {
		msg_btn_clicked.type = "Crawler.DomSelectorDisabled";
		disable_dom_element_operator_btn();
		chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
			console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
		});
	}
}

function open_set_element_dom_path_panel(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的打开设置对话框按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.RuleSetPanelOpen";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	});
}

function copydompath_this_element_select(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的复制DOM路径按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.CopyDOMPathBtnClicked";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	});
}

function copyelement_this_element_select(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的复制Element按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.CopyElementBtnClicked";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	});
}

function copytext_this_element_select(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的复制文本按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.CopyTextBtnClicked";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	});
}

function view_this_crawler_rule(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看当前网站抓取规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.ViewThisCrawlerRule";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	});
}

function download_all_images(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看当前网站抓取规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.DownloadAllImages";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	});
}

function download_all_videos(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看当前网站抓取规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.DownloadAllVideos";

	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	});
}

function process_image(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看当前网站抓取规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	// var msg_btn_clicked = {};

	// msg_btn_clicked.type = "Crawler.ProcessImage";

	// chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
	// 	console.log("[消息]", "-x13-", "background接收到", tab_clicked.id, "回复的注入信息结果", crawler_response);
	// });
	if (info.mediaType == "image") {
		if ( null != info.srcUrl ) {
			if ( true == info.srcUrl.startsWith("data") ) {
				chrome.tabs.create({
					"url": "options.html?img_url="+info.srcUrl+"#photoProcess",
					"active": true
				}, function(tab) {
					console.log("[调试] 打开图片处理页", tab);
				});					
			}else if( true == info.srcUrl.startsWith("http") || true == info.srcUrl.startsWith("https") ){
				var sites_need_permission = [];
				dn = get_site_domainname_from_url(info.srcUrl)+"/*";
				console.log("[调试] 申请URL跨域权限", dn);
				sites_need_permission.push(dn);
				chrome.permissions.request({
					permissions: ['tabs'],
					origins: sites_need_permission
				}, function(granted) {
					// The callback argument will be true if the user granted the permissions.
					if (granted) {
						console.log("用户同意该访问权限");
						chrome.tabs.create({
							"url": "options.html?img_url="+info.srcUrl+"#photoProcess",
							"active": true
						}, function(tab) {
							console.log("[调试] 打开图片处理页", tab);
						});	
					} else {
						console.log("用户拒绝该访问权限", dn);
						notification_user(chrome.i18n.getMessage("noticeImageURLCrossDomainNotPermit"));
					}
				});		

			};

		}else {
			notification_user(chrome.i18n.getMessage("noticeNotValidImage"));
		}
	}else{
		notification_user(chrome.i18n.getMessage("noticeNotValidImage"));
	}
}

function screen_snapshot(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看当前网站抓取规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};

	// 不用chrome自带的desktopCapture
	// chrome.desktopCapture.chooseDesktopMedia(["window"], function(streamid) {
	// 	console.log("[调试] background 获取到streamid", streamid);

	// 	var msg_btn_clicked = {};

	// 	msg_btn_clicked.type = "Crawler.ScreenSnapshot";
	// 	msg_btn_clicked.data = streamid;

	// 	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
	// 		console.log("[消息]", "-x13-", "background接收到", tab_clicked, "回复的注入信息结果", crawler_response);
	// 	});

	// });
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.ScreenSnapshot";
	
	chrome.tabs.captureVisibleTab({"format":"png"}, function(dataUrl){
		var data = {};
		data.dataUrl = dataUrl;
		msg_btn_clicked.data = data;
		chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
			console.log("[消息]", "-x13-", "background接收到", tab_clicked, "回复的注入信息结果", crawler_response);
		});
	});
}

function selected_content_snapshot(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看当前网站抓取规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.SelectedContentSnapshot";
	
	chrome.tabs.captureVisibleTab({"format":"png"}, function(dataUrl){
		var data = {};
		data.dataUrl = dataUrl;
		msg_btn_clicked.data = data;
		chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
			console.log("[消息]", "-x13-", "background接收到", tab_clicked, "回复的注入信息结果", crawler_response);
		});
	});



}
function page_content_snapshot(info, tab_clicked) {
	console.log("[事件] ", tab_clicked, "上的查看当前网站抓取规则按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
		return;
	};
	var msg_btn_clicked = {};

	msg_btn_clicked.type = "Crawler.PageContentSnapshot";
	console.log("[消息]", "-s1-", "background向crawler发送PageContentSnapshot的请求消息");
	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-s4-", "background接收到", tab_clicked, "回复的按钮响应结果", crawler_response);

	});
}

function chat_weixin_crawl_once_handler(info, tab_clicked){
	console.log("[事件]", tab_clicked, "上的微信聊天记录抓取一次按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user("页面尚未完全载入");		
	};
	var msg_btn_clicked = {};
	msg_btn_clicked.type = "Weixin.ChatCrawler.Once";
	console.log("[消息]", "-wx1-", "background向微信网页版发送Weixin.ChatCrawler.Once的请求消息");
	chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
		console.log("[消息]", "-wx4-", "background接收到", tab_clicked, "回复的按钮响应结果", crawler_response);

	});		
}

function chat_weixin_crawl_timer_switcher_handler(info, tab_clicked){
	console.log("[事件]", tab_clicked, "上的微信聊天记录定时抓取按钮被点击", info);
	if (tab_clicked.status != "complete") {
		notification_user("页面尚未完全载入");		
	};
	var msg_btn_clicked = {};

	switch(info.menuItemId){
		case 'btn.rightclick.chat_weixin_crawl_timer_switcher_stop':
			//取消其他的checked状态

			msg_btn_clicked.type = "Weixin.ChatCrawler.Switcher.Close";
			console.log("[消息]", "-wx1-", "background向微信网页版发送Weixin.ChatCrawler.Switcher.Close的请求消息");
			chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
				console.log("[消息]", "-wx4-", "background接收到", tab_clicked, "回复的按钮响应结果", crawler_response);

			});	
			break;			
		case 'btn.rightclick.chat_weixin_crawl_timer_switcher_min':
			msg_btn_clicked.type = "Weixin.ChatCrawler.Switcher.Open";
			msg_btn_clicked.data = {"interval_level":1 , "interval_value":15};			
			console.log("[消息]", "-wx1-", "background向微信网页版发送Weixin.ChatCrawler.Switcher.Open的请求消息");
			chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
				console.log("[消息]", "-wx4-", "background接收到", tab_clicked, "回复的按钮响应结果", crawler_response);

			});		
			break;
		case 'btn.rightclick.chat_weixin_crawl_timer_switcher_middle':
			msg_btn_clicked.type = "Weixin.ChatCrawler.Switcher.Open";
			msg_btn_clicked.data = {"interval_level":2 , "interval_value":60};			
			console.log("[消息]", "-wx1-", "background向微信网页版发送Weixin.ChatCrawler.Switcher.Open的请求消息");
			chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
				console.log("[消息]", "-wx4-", "background接收到", tab_clicked, "回复的按钮响应结果", crawler_response);

			});	
			break;	
		case 'btn.rightclick.chat_weixin_crawl_timer_switcher_max':
			msg_btn_clicked.type = "Weixin.ChatCrawler.Switcher.Open";
			msg_btn_clicked.data = {"interval_level":3 , "interval_value":900};						
			console.log("[消息]", "-wx1-", "background向微信网页版发送Weixin.ChatCrawler.Switcher.Open的请求消息");
			chrome.tabs.sendMessage(tab_clicked.id, msg_btn_clicked, null, function(crawler_response) {
				console.log("[消息]", "-wx4-", "background接收到", tab_clicked, "回复的按钮响应结果", crawler_response);

			});	
			break;	
		default:
			console.log("[debug] 内部错误, 按钮编号找不到");
			break;
	}

}

// function shareto(info, tab) {
// 	console.log("页面" + info.pageUrl + "上的按钮" + info.menuItemId + "被点击");
// 	// console.log(info);
// 	console.log(tab);
// 	// 由于参数中带了tab，如果仅是对active tab进行操作，那么这里可以不用tabs[0]这种方式
// 	// chrome.tabs.query({active:true, currentWindow:true},function(tabs){
// 	// // 	// chrome.tabs.sendMessage(integer tabId, any message, object options, function responseCallback)
// 	// 	console.log("向tab"+tabs[0].id+"送消息");
// 	chrome.tabs.sendMessage(tab.id, {
// 		"greeting": "heo"
// 	}, function(response) {
// 		console.log(response);
// 	});
// 	// 不能用这个方法想content scripts发消息
// 	// chrome.runtime.sendMessage(tab.id, {"greeting":"heo"},function(response){
// 	// 	console.log(response);
// 	// });		
// 	// });
// }
contexts_shareto = ["page", "video", "audio"];

btnid1 = chrome.contextMenus.create({
	"id": "btn.rightclick.pagecapture",
	"title": chrome.i18n.getMessage("extShareBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": shareto
});
btnid2 = chrome.contextMenus.create({
	"id": "btn.rightclick.check_photo_upload_panel",
	"title": chrome.i18n.getMessage("extCheckImagesBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": check_photo_upload_panel
});

btnid3 = chrome.contextMenus.create({
	// "enabled":true,
	// "parentId":"btn.rightclick.set_element_dom_path_panel",
	"type": "checkbox",
	"checked": false,
	"id": "btn.rightclick.enable_set_element_dom_path_panel",
	"title": chrome.i18n.getMessage("extEnableSetDomRuleBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": enable_set_element_dom_path_panel
});

btnid4 = chrome.contextMenus.create({
	"enabled": false,
	"id": "btn.rightclick.set_element_dom_path_panel",
	"title": chrome.i18n.getMessage("extSetDomRuleBtnTitle"),
	"contexts": contexts_shareto
});

btnid5 = chrome.contextMenus.create({
	// "enabled":false,
	"parentId": "btn.rightclick.set_element_dom_path_panel",
	"id": "btn.rightclick.set_element_dom_path_panel.open",
	"title": chrome.i18n.getMessage("extSetElementRuleBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": open_set_element_dom_path_panel
});
btnid6 = chrome.contextMenus.create({
	// "enabled":false,
	"parentId": "btn.rightclick.set_element_dom_path_panel",
	"id": "btn.rightclick.set_element_dom_path_panel.copydompath",
	"title": chrome.i18n.getMessage("extCopyDomPathBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": copydompath_this_element_select
});
btnid7 = chrome.contextMenus.create({
	// "enabled":false,
	"parentId": "btn.rightclick.set_element_dom_path_panel",
	"id": "btn.rightclick.set_element_dom_path_panel.copyelement",
	"title": chrome.i18n.getMessage("extCopyElementBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": copyelement_this_element_select
});
btnid8 = chrome.contextMenus.create({
	// "enabled":false,
	"parentId": "btn.rightclick.set_element_dom_path_panel",
	"id": "btn.rightclick.set_element_dom_path_panel.copytext",
	"title": chrome.i18n.getMessage("extCopyTextBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": copytext_this_element_select
});
btnid9 = chrome.contextMenus.create({
	"id": "btn.rightclick.view_this_crawler_rule",
	"title": chrome.i18n.getMessage("extViewThisCrawlerRuleBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": view_this_crawler_rule
});
btnid10 = chrome.contextMenus.create({
	"id": "btn.rightclick.download_all_images",
	"title": chrome.i18n.getMessage("extDownloadAllImagesBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": download_all_images
});
var btnid11 ;
// btnid11 = chrome.contextMenus.create({
// 	"id": "btn.rightclick.download_all_videos",
// 	"title": chrome.i18n.getMessage("extDownloadAllVideosBtnTitle"),
// 	"contexts": contexts_shareto,
// 	"onclick": download_all_videos
// });
btnid12 = chrome.contextMenus.create({
	"id": "btn.rightclick.process_image",
	"title": chrome.i18n.getMessage("extImageProcessBtnTitle"),
	"contexts": ["image"],
	"onclick": process_image
});
btnid13 = chrome.contextMenus.create({
	"id": "btn.rightclick.screen_snapshot",
	"title": chrome.i18n.getMessage("extScreenSnapshotBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": screen_snapshot
});
btnid14 = chrome.contextMenus.create({
	"id": "btn.rightclick.selected_content_snapshot",
	"title": chrome.i18n.getMessage("extSelectedContentSnapshotBtnTitle"),
	"contexts": ["selection"],
	"onclick": selected_content_snapshot
});
btnid15 = chrome.contextMenus.create({
	"id": "btn.rightclick.page_content_snapshot",
	"title": chrome.i18n.getMessage("extPageContentSnapshotBtnTitle"),
	"contexts": contexts_shareto,
	"onclick": page_content_snapshot
});

btnid16 = chrome.contextMenus.create({
	"id": "btn.rightclick.chat_weixin_crawl_once",
	"title":"微信聊天记录抓取",
	"contexts": contexts_shareto,
	"onclick": chat_weixin_crawl_once_handler
});

btnid17 = chrome.contextMenus.create({
	"id": "btn.rightclick.chat_weixin_crawl_timer_switcher",
	"title":"微信聊天记录定时抓取",
	"contexts": contexts_shareto,
	// "onclick": chat_weixin_crawl_timer_switcher_handler
});

btnid18 = chrome.contextMenus.create({
	"parentId": "btn.rightclick.chat_weixin_crawl_timer_switcher",	
	"type":"radio",
	"checked":true,
	"id": "btn.rightclick.chat_weixin_crawl_timer_switcher_stop",
	"title":"停止",
	"contexts": contexts_shareto,
	"onclick": chat_weixin_crawl_timer_switcher_handler
});

btnid19 = chrome.contextMenus.create({
	"parentId": "btn.rightclick.chat_weixin_crawl_timer_switcher",		
	"type":"radio",
	"checked":false,
	"id": "btn.rightclick.chat_weixin_crawl_timer_switcher_min",
	"title":"30秒",
	"contexts": contexts_shareto,
	"onclick": chat_weixin_crawl_timer_switcher_handler
});

btnid20 = chrome.contextMenus.create({
	"parentId": "btn.rightclick.chat_weixin_crawl_timer_switcher",		
	"type":"radio",
	"checked":false,
	"id": "btn.rightclick.chat_weixin_crawl_timer_switcher_middle",
	"title":"1分钟",
	"contexts": contexts_shareto,
	"onclick": chat_weixin_crawl_timer_switcher_handler
});

btnid21 = chrome.contextMenus.create({
	"parentId": "btn.rightclick.chat_weixin_crawl_timer_switcher",	
	"type":"radio",
	"checked":false,
	"id": "btn.rightclick.chat_weixin_crawl_timer_switcher_max",
	"title":"15分钟",
	"contexts": contexts_shareto,
	"onclick": chat_weixin_crawl_timer_switcher_handler
});

console.log("[调试] 生成按钮ID ", btnid1, btnid2, btnid3, btnid4, btnid5, btnid6, 
	btnid7, btnid8, btnid9, btnid10, btnid11, btnid12, btnid13, btnid14, btnid15, btnid16);
//可以用上面的方法代替这个。onclick参数必须为一个function名，而不是incline function
// chrome.contextMenus.onClicked.addListener(function(info, tab){
// 	if (info.menuItemId=="btn.rightclick.pagecapture") {
// 		console.log("转载到。。。按钮被点击");
// 	};
// });

function blob_to_DataURL(blob, callback) {
	var fReader = new FileReader();

	fReader.onload = function(event) {
		var dataurl = null;
		if (event.target.readyState) {
			var dataurl = event.target.result;
			if (null != dataurl) {
				var data_array = dataurl.split(',', 2);
				dataurl = data_array[1];
			};
		} else {
			console.log("[调试] FileReader还没有准备好");
		}

		callback(dataurl);
	}
	fReader.readAsDataURL(blob);
}

function get_img_file(url, target_tab_id) {

	var dxhr = new XMLHttpRequest(),
		method = 'GET',
		is_async = true,
		username = '',
		password = '';
	dxhr.open(method, url, is_async);
	dxhr.onreadystatechange = function(event) {
		if (dxhr.readyState == XMLHttpRequest.DONE) {
			if (dxhr.status == 200) {
				console.log('[调试] 下载完图片，大小为', dxhr.response.size, '开始上传');
				// upload_file(dxhr.response);
				blob_to_DataURL(dxhr.response, function(imagedata) {

					var crawl_info = {};
					crawl_info.imagedata = imagedata;
					crawl_info.imagetype = dxhr.response.type;
					crawl_info.imageoriginurl = url;

					var msg_crawl_info = {};
					msg_crawl_info.type = "Crawl.ImagesResult";
					msg_crawl_info.data = crawl_info;
					console.log("[消息]", "-x8-", "crawler向runtime回复图片抓取信息", msg_crawl_info);
					chrome.tabs.sendMessage(target_tab_id, msg_crawl_info, null, function(target_response) {
						console.log("[消息]", "-x13-", "background接收到", target_tab_id, "回复的注入信息结果", target_response);
					});
				});

				// sendResponse(msg_crawl_info);

			};
		};

	};
	dxhr.responseType = 'blob';
	dxhr.send();

}

function get_site_domainname_from_url(url) {
	var uuarray = url.split("//", 2);
	var schema = uuarray[0];
	//去除schema的冒号
	schema = schema.replace(":", "");

	var urlpath = uuarray[1];
	var urlpath_array = urlpath.split("/");
	var domainname = urlpath_array[0];
	return schema + "://" + domainname;
}

var snapshot_page = {
	canvas:document.createElement("canvas"),
	scrollX:0,
	scrollY:0,
	totalX:0,
	totalY:0
};

function sleepSomeTime(millisecond) {
	var start = new Date().getTime();
	var end = new Date().getTime();
	do {

		end = new Date().getTime();
	} while ((end - start) < millisecond);

}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log("[消息]", "-2-", "background接收到", sender, "发来消息", message.type);

	var msg_confirm = {};
	msg_confirm.type = "Msg.Confirm";
	sendResponse(msg_confirm);
	console.log("[消息]", "-3-", "background回复确认消息", msg_confirm.type);
	//只处理认识的消息，不认识的不处理
	if (message.type == "Crawl.Req") {
		console.log("[消息]", "-5-", "background判断消息类型为", message.type);
		console.log("[消息]", "-6-", "background向", tab_crawler, "转发抓取消息", message);
		chrome.tabs.sendMessage(tab_crawler.id, message, null, function(crawler_response) {
			console.log("[消息]", "-9-", "background接收到", message.type, "类型的消息");
			console.log("[消息]", "-10-", "background转发抓取结果，向目标页", sender, "发出注入请求", crawler_response);
			// sendResponse(crawler_response);
			// sendResponse("呵呵，字符串也不行，消息乱了");
			chrome.tabs.sendMessage(sender.tab.id, crawler_response, null, function(target_response) {
				console.log("[消息]", "-13-", "background接收到", sender.tab, "回复的注入信息结果", target_response);
			});
		});
	};
	if (message.type == "Config.Update") {
		console.log("[消息] -xx- 接收到配置更新的消息");
		config_reload();
	};
	if (message.type == "Crawl.ImagesReq") {
		console.log("[消息]", "-x5-", "background判断消息类型为", message.type);
		console.log("[消息]", "-x6-", "background向", tab_crawler, "转发图片抓取消息", message);

		var url_array = message.data;
		var sites_need_permission = [];
		for (var i = url_array.length - 1; i >= 0; i--) {
			var siterex = get_site_domainname_from_url(url_array[i]) + "/*";
			sites_need_permission.push(siterex);
		};
		console.log("[调试] 准备在background抓取图片");
		chrome.permissions.request({
			permissions: ['tabs'],
			origins: sites_need_permission
		}, function(granted) {
			// The callback argument will be true if the user granted the permissions.
			if (granted) {
				console.log("用户同意该访问权限");
				for (var i = url_array.length - 1; i >= 0; i--) {
					get_img_file(url_array[i], sender.tab.id);
				};
			} else {
				console.log("用户拒绝该访问权限", sites_need_permission);
				notification_user(chrome.i18n.getMessage("noticeImageURLCrossDomainNotPermit"));
			}
		});



	};

	if (message.type == "Download.images") {
		console.log("[消息]", "-s6-", "background判断消息类型为", message.type);
		console.log("[调试] 下载图片列表", message.data);
		// chrome.downloads.showDefaultFolder();
		var img_urls = message.data;
		for (var i = img_urls.length - 1; i >= 0; i--) {
			
			chrome.downloads.download({
				'url': img_urls[i],
				'saveAs': true
			}, function(downloadId) {
				chrome.downloads.search({'id':downloadId}, function(downloadItem){
					console.log("[调试] 已下载", downloadItem);
				});
				
			});			
		};
		
	};

	// if (message.type == "Snapshot.init") {
	// 	if (sender.tab.status != "complete") {
	// 		notification_user(chrome.i18n.getMessage("noticeSourcePageNotLoaded"));
	// 		return;
	// 	};
	// 	var msg_btn_clicked = {};

	// 	msg_btn_clicked.type = "Snapshot.inited";
		
	// 	chrome.tabs.captureVisibleTab({"format":"png"}, function(dataUrl){
	// 		var data = {};
	// 		data.dataUrl = dataUrl;
	// 		msg_btn_clicked.data = data;
	// 		chrome.tabs.sendMessage(sender.tab.id, msg_btn_clicked, null, function(crawler_response) {
	// 			console.log("[消息]", "-x13-", "background接收到", sender.tab, "回复的注入信息结果", crawler_response);
	// 		});
	// 	});
	// };
	if (message.type == "Snapshot.next") {
		console.log("[消息]", "-s6-", "background判断消息类型为", message.type);
		var msg_btn_clicked = {};

		msg_btn_clicked.type = "Snapshot.nexted";
		sleepSomeTime(500);
		console.log("[调试] background开始截屏", message.data.currentY ,"的时间", new Date().getTime());
		chrome.tabs.captureVisibleTab({"format":"png"}, function(dataUrl){
			console.log("[调试] background完成截屏", message.data.currentY ,"的时间", new Date().getTime());
			var data = {};
			data.dataUrl = dataUrl;
			data.currentY = message.data.currentY;
			msg_btn_clicked.data = data;
			console.log("[调试]", "-s7-", "background向crawler发送next截屏dataUrl", msg_btn_clicked);
			chrome.tabs.sendMessage(sender.tab.id, msg_btn_clicked, null, function(crawler_response) {
				console.log("[消息]", "-s10-", "background接收到", sender.tab, "确认的回复消息", crawler_response);
			});
		});

	};
	if (message.type == "Snapshot.last") {
		console.log("[消息]", "-s13-", "background判断消息类型为", message.type);
		var msg_btn_clicked = {};

		msg_btn_clicked.type = "Snapshot.finished";
		sleepSomeTime(500);
		console.log("[调试] background最后一次截屏的开始时间", new Date().getTime());
		chrome.tabs.captureVisibleTab({"format":"png"}, function(dataUrl){
			console.log("[调试] background最后一次截屏的完成时间", new Date().getTime());
			var data = {};
			data.dataUrl = dataUrl;
			msg_btn_clicked.data = data;
			console.log("[调试]", "-s14-", "background向crawler发送last截屏dataUrl", msg_btn_clicked);
			chrome.tabs.sendMessage(sender.tab.id, msg_btn_clicked, null, function(crawler_response) {
				console.log("[消息]", "-s17-", "background接收到", sender.tab, "确认的回复消息", crawler_response);
			});
		});
	};
});

// chrome.tabs.onCreated.addListener(function(tab) {
// 	console.log("[事件] 选项卡创建,Tab ID: ", tab.id);

// });


function fnCrawler_tab_inject(tabId, changeInfo, tab) {
	
	//注入微信爬虫脚本
	if ("complete" == tab.status && changeInfo.status == "complete" && null != tab.url.match("https://wx.qq.com")) {
		console.log("[debug] 微信页面被打开，并加载完成");
		chrome.tabs.executeScript(tabId, {
			"file": "js/chat.weixin.crawler.js"
		}, function(results) {
			console.log("[注入] chat.weixin.crawler.js注入完成：", results);
		});		
	};
	// console.log("[事件] 选项卡更新,Tab ID: ", tabId);
	if (null == crawler_rule) {
		return;
	};
	for (var i = crawler_rule.length - 1; i >= 0; i--) {
		if ("complete" == tab.status && changeInfo.status == "complete" && null != tab.url.match(crawler_rule[i].url_regex)) {
			console.log("[注入] 命中抓取选项卡,网址为" + tab.url);
			var inject_code = 'var crawl_rule = {' +
				'"title": "' + crawler_rule[i].title_dom_path + '",' +
				'"content": "' + crawler_rule[i].content_dom_path + '",' +
				'"time": "' + crawler_rule[i].time_dom_path + '",' +
				'"url_regex":"' + crawler_rule[i].url_regex + '"' +
				'};';
			chrome.tabs.insertCSS(tabId, {
				"file": "css/bootstrap.min.css"
			}, function(results) {
				console.log("[注入] bootstrap.min.css注入完成：", results);
			});
			chrome.tabs.insertCSS(tabId, {
				"file": "css/cropper.min.css"
			}, function(results) {
				console.log("[注入] cropper.min.css注入完成：", results);
			});
			chrome.tabs.insertCSS(tabId, {
				"file": "css/repost.css"
			}, function(results) {
				console.log("[注入] repost.css注入完成：", results);
			});
			chrome.tabs.executeScript(tabId, {
				"file": "js/jquery.min.js"
			}, function(results) {
				console.log("[注入] jquery.min.js注入完成：", results);
			});
			chrome.tabs.executeScript(tabId, {
				"file": "js/bootstrap.min.js"
			}, function(results) {
				console.log("[注入] bootstrap.min.js注入完成：", results);
			});
			chrome.tabs.executeScript(tabId, {
				"file": "js/cropper.min.js"
			}, function(results) {
				console.log("[注入] cropper.min.js注入完成：", results);
			});
			chrome.tabs.executeScript(tabId, {
				"file": "js/html2canvas.js"
			}, function(results) {
				console.log("[注入] html2canvas.js注入完成：", results);
			});			
			// chrome.tabs.executeScript(tabId, {
			// 	"file": "js/jquery.leanModal.min.js"
			// }, function(results) {
			// 	console.log("[注入] 目标页面jquery.leanModal.min.js注入完成：", results);
			// });
			chrome.tabs.executeScript(tabId, {
				"code": inject_code
			}, function(results) {
				console.log("[注入] 配置变量code注入完成", inject_code);
			});
			chrome.tabs.executeScript(tabId, {
				"file": "js/crawler.js"
			}, function(results) {
				console.log("[注入] crawler.js注入完成：", results);
			});
		};

	};
}

function fnTarget_tab_inject(tabId, changeInfo, tab) {
	// console.log("[事件] 选项卡更新,Tab ID: ", tabId);
	if (null == target_rule) {
		return;
	};
	console.log("[调试] changeInfo,", changeInfo, "tab,", tab);
	if ("complete" == tab.status && null != tab.url.match(target_rule.url_new + "#fromassistent")) {
		console.log("[注入] 命中目标选项卡,网址为" + tab.url);

		var inject_code = 'var tgt_rule = {' +
			'"title": "' + target_rule.title_dom_path + '",' +
			'"content": "' + target_rule.content_dom_path + '",' +
			'"label": "' + target_rule.title_label_dom_path + '"' +
			'};';
		chrome.tabs.insertCSS(tabId, {
			"file": "css/bootstrap.min.css"
		}, function(results) {
			console.log("[注入] 目标页面bootstrap.min.css注入完成：", results);
		});
		chrome.tabs.executeScript(tabId, {
			"file": "js/jquery.min.js"
		}, function(results) {
			console.log("[注入] 目标页面jquery.min.js注入完成：", results);
		});
		chrome.tabs.executeScript(tabId, {
			"file": "js/bootstrap.min.js"
		}, function(results) {
			console.log("[注入] 目标页面bootstrap.min.js注入完成：", results);
		});
		chrome.tabs.executeScript(tabId, {
			"code": inject_code
		}, function(results) {
			console.log("[注入] 配置变量code注入完成", inject_code);
		});
		chrome.tabs.executeScript(tabId, {
			"file": "js/inject.js"
		}, function(results) {
			console.log("[注入] 目标页面inject.js注入完成：", results);
		});
	};
}

chrome.tabs.onUpdated.addListener(fnCrawler_tab_inject);
chrome.tabs.onUpdated.addListener(fnTarget_tab_inject);