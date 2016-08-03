$(document).ready(function() {

	var is_cfn_validated = cAstConfig.api.validate();
	console.log("[调试] 选项页加载，查看数据服务是否正常", is_cfn_validated);

	if (undefined == null) {
		console.log("[debug] undefined == null");
	};

	if (undefined == 0) {
		console.log("[debug] undefined == 0");
	};

	function speak_some_thing(sword) {
		chrome.tts.speak(sword, {
			'lang': 'zh_CN',
			'rate': 1.0
		});
	}

	function localizeHtmlPage() {
		//Localize by replacing __MSG_***__ meta tags
		var objects = document.getElementsByTagName('html');
		for (var j = 0; j < objects.length; j++) {
			var obj = objects[j];

			var valStrH = obj.innerHTML.toString();
			var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1) {
				return v1 ? chrome.i18n.getMessage(v1) : "";
			});

			if (valNewH != valStrH) {
				obj.innerHTML = valNewH;
			}
		}
	}

	localizeHtmlPage();



	function get_site_from_url(str) {
		//如果分割出来的长度不超过howmany参数，那么返回实际的数组的长度
		var str_array = str.split("/", 3)
		console.log("[调试] 分割后的数组长度为", str_array.length);
		if (null != str_array[0].match("http")) {
			return str_array[2];
		};
		if (null != str_array[0].match("")) {
			return str_array[2];
		};
		return str_array[0];
	}

	function get_site_permission_str(str) {
		str = get_site_from_url(str);
		if (str[str.length - 1] == "/") {
			console.log("[调试] 返回网站权限字符串为", "http://" + str + "*");
			return "http://" + str + "*";
		} else {
			console.log("[调试] 返回网站权限字符串为", "http://" + str + "/*");
			return "http://" + str + "/*";
		}
	}

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

	function notification_config_update() {
		var msg_notice = {};
		msg_notice.type = "Config.Update";
		console.log("[消息] -xx- 发送配置更新消息");
		chrome.runtime.sendMessage(msg_notice, function(response) {
			console.log("[消息] -xx- 接收到更新回复");
		});
	}

	function crawler_page_data_load() {
		cAstConfig.api.crawler_rule_query_all(function(crawler_rules) {

			$('div.crawlerInfo table tbody').html('');

			if (crawler_rules == undefined) {
				return;
			};

			$.each(crawler_rules, function(index, val) {
				/* iterate through array or object */
				$('<tr><td><input title="选择/不选" type="checkbox" /></td><td>' + index + '</td>' +
					'<td><a class="crawler_rule_edit_btn" href="/options.html#crawlerEdit?' + val.id + '" data-ruleid=' + val.id + '>' + val.site_name + '</a></td>' +
					'<td>' + val.modify_time + '</td><td>' + val.site_url + '</td><td><button class="crawler_rule_delete_btn btn btn-default" data-ruleid=' + val.id + '>删除</button></td></tr>').appendTo($('div.crawlerInfo table tbody'));
			});

			$('a.crawler_rule_edit_btn').click(function(event) {
				/* Act on the event */
				var rule_id = $(this).data('ruleid');
				cAstConfig.api.crawler_rule_query_by_id(rule_id, function(qrule) {
					console.log('[调试] 要编辑的抓取规则当前对象为', qrule);
					$('div.itab').hide();
					$('div.crawlerDetail').show(function() {
						$('div.crawlerDetail input#id').val(qrule.id);
						$('div.crawlerDetail input#site_url').val(qrule.site_url);
						$('div.crawlerDetail input#site_name').val(qrule.site_name);
						$('div.crawlerDetail input#url_regex').val(qrule.url_regex);
						$('div.crawlerDetail input#title_dom_path').val(qrule.title_dom_path);
						$('div.crawlerDetail input#author_dom_path').val(qrule.author_dom_path);
						$('div.crawlerDetail input#time_dom_path').val(qrule.time_dom_path);
						$('div.crawlerDetail input#content_dom_path').val(qrule.content_dom_path);
					});
				});
				console.log("[调试] 抓取规则", rule_id, "被点击");
			});
			$('button.crawler_rule_delete_btn').click(function(event) {
				/* Act on the event */
				var rule_id = $(this).data('ruleid');
				console.log('[调试] 抓取规则', rule_id, '删除按钮被点击');
				cAstConfig.api.crawler_rule_delete(rule_id, function(status) {
					crawler_page_data_load();
				});
			});
			console.log('[调试] 抓取规则载入成功');
		});
	}

	function target_page_data_load() {
		//初始化目标规则
		cAstConfig.api.target_rule_query(function(rule) {
			if (undefined == rule) {
				return;
			};

			//设置网站类型
			$('div.targetInfo select#site_type').val(rule.site_type);
			//设置网站域名
			$('div.targetInfo input#site_url').val(rule.site_url);
			//设置网站名称
			$('div.targetInfo input#site_name').val(rule.site_name);
			//设置新建文章URL
			$('div.targetInfo input#url_new').val(rule.url_new);
			//设置标题DOM路径
			$('div.targetInfo input#title_dom_path').val(rule.title_dom_path);
			//设置作者DOM路径
			$('div.targetInfo input#title_label_dom_path').val(rule.title_label_dom_path);
			//设置时间DOM路径
			$('div.targetInfo input#time_dom_path').val(rule.time_dom_path);
			//设置正文DOM路径
			$('div.targetInfo input#content_dom_path').val(rule.content_dom_path);
			console.log('[调试] 目标规则载入成功');
		});
	}

	function reload_json_config_from_file(file, callback) {
		var fReader = new FileReader();

		fReader.onload = function(event) {
			var crawler_config_obj = null;
			if (event.target.readyState) {
				var crawler_config_string = event.target.result;
				if (null != crawler_config_string) {
					crawler_config_obj = JSON.parse(crawler_config_string);
				};
			} else {
				console.log("[调试] FileReader还没有准备好");
			}

			callback(crawler_config_obj);
		}
		fReader.readAsText(file);

	}

	// notification_user('加载完成');
	//deprecated
	// $('ul.submenu li').removeClass('active');
	// $('ul.submenu li:first').addClass('active');


	$('a#machineBtn').click(function(event) {
		/* Act on the event */
		// speak_some_thing('这是我社的机器人发稿系统，她的特点就是快、抓的快、发的快、信息传播就是快！快！快！快！');
		$('ul.nav li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('div.itab').hide();
		$('div.itab-detail').hide();
		$('div.machineInfo').show();
	});


	$('input#crawler_config_fileinput').click(function(event) {
		/* Act on the event */
		// modal_panel.querySelector('input').files = null;
		$('button#target_config_import_apply_btn').data('config_json_obj', null);
		$("div#crawler_upload_area span.upload_result_tips").remove();
	});

	$('input#target_config_fileinput').click(function(event) {
		/* Act on the event */
		$('button#crawler_config_import_apply_btn').data('config_json_obj', null);
		$("div#target_upload_area span.upload_result_tips").remove();
	});

	$('button#crawler_config_import_upload_btn').click(function(event) {
		/* Act on the event */

		var file = $('input#crawler_config_fileinput').get(0).files[0];
		if (file == null) {
			notification_user(chrome.i18n.getMessage("noticeFileNotSelected"));
			return;
		};
		reload_json_config_from_file(file, function(config_json_obj) {
			console.log("[调试] 抓取配置信息为", config_json_obj);
			//先不发生实际作用
			$('button#crawler_config_import_apply_btn').data('config_json_obj', config_json_obj);
			$('div#crawler_upload_area').append('<span class="upload_result_tips">'+chrome.i18n.getMessage("infoNextStepApplyBtn")+'</span>')
		});
	});
	$('button#crawler_config_import_apply_btn').click(function(event) {
		/* Act on the event */
		var config = $(event.target).data('config_json_obj');
		for (var i = config.length - 1; i >= 0; i--) {

			// add_crawler_rule(config[i]);
			test_crawler_sync(add_crawler_rule, config[i]);

		};

	});
	var crawler_queue = [];
	var crawler_storage_used_flag = false;

	function test_crawler_sync(func, conf) {
		if (conf != null) {
			if (crawler_storage_used_flag) {
				crawler_queue.push(conf);
			} else {
				crawler_storage_used_flag = true;
				func(conf);
			}

		} else {
			config = crawler_queue.shift();
			if (config != null) {
				crawler_storage_used_flag = true;
				func(config);
			};
		}
	}


	$('button#target_config_import_upload_btn').click(function(event) {
		/* Act on the event */

		var file = $('input#target_config_fileinput').get(0).files[0];
		if (file == null) {
			notification_user(chrome.i18n.getMessage("noticeFileNotSelected"));
			return;
		};
		console.log("[调试] 目标配置导入保存按键被点击", event);
		//FileReaderSync不是类、只是接口
		// var sfReader = new FileReaderSync();

		// var config_json_string = sfReader.readAsText(file);
		// var config_json_obj = JSON.parse(config_json_string);
		// save_target_rule(config_json_obj);
		reload_json_config_from_file(file, function(config_json_obj) {
			console.log("[调试] 目标配置信息为", config_json_obj);

			$('button#target_config_import_apply_btn').data('config_json_obj', config_json_obj);

			$('div#target_upload_area').append('<span class="upload_result_tips">'+chrome.i18n.getMessage("infoNextStepApplyBtn")+'</span>')

		});
		//测试代码
		// var config_json_string = '{"content_dom_path":"textarea#content",' +
		// 	'"modify_time":"Thu Jan 07 2016 18:32:38 GMT+0800 (中国标准时间)",' +
		// 	'"site_name":"天空之心","site_type":"1","site_url":"http://dev.cloudxinhua.com:8024",' +
		// 	'"title_dom_path":"div#poststuff div#post-body div#post-body-content div#titlediv div#titlewrap input#title",' +
		// 	'"title_label_dom_path":"#title-prompt-text",' +
		// 	'"url_new":"http://dev.cloudxinhua.com:8022/wordpress/wp-admin/post-new.php"}';
		// var config_json_obj = JSON.parse(config_json_string);
		// save_target_rule( config_json_obj );
	});

	$('button#target_config_import_apply_btn').click(function(event) {
		/* Act on the event */
		var config = $(event.target).data('config_json_obj');
		save_target_rule(config);
	});

	$('#crawler_config_import_modal').on('hidden.bs.modal', function(e) {
		var modal_panel = e.target;
		modal_panel.querySelector('input').files = null;
		$(modal_panel).find("button#crawler_config_import_apply_btn").data('config_json_obj', null);
		$(modal_panel).find("span.upload_result_tips").remove();

	});
	$('#target_config_import_modal').on('hidden.bs.modal', function(e) {
		var modal_panel = e.target;
		modal_panel.querySelector('input').files = null;
		$(modal_panel).find("button#target_config_import_apply_btn").data('config_json_obj', null);
		$(modal_panel).find("span.upload_result_tips").remove();
	});


	$('button#crawler_config_export_btn').click(function(event) {
		/* Act on the event */

		cAstConfig.api.crawler_rule_query_all(function(crawler_rules) {

			console.log("[调试] 查询到以下抓取规则", crawler_rules);
			console.log("[调试] 抓取规则转换为字符串：", JSON.stringify(crawler_rules));
			var testblob = new Blob([JSON.stringify(crawler_rules)], {
				'type': "text/plain"
			});
			var oUrl = window.URL.createObjectURL(testblob);
			chrome.downloads.download({
				'url': oUrl,
				'saveAs': true
			}, function(downlaodId) {
				console.log("[调试] 已下载", downlaodId);

			});
		});
		// var testjson = JSON.parse(teststring);

	});

	$('button#target_config_export_btn').click(function(event) {
		/* Act on the event */
		cAstConfig.api.target_rule_query(function(rule) {

			var testblob = new Blob([JSON.stringify(rule)], {
				'type': "text/plain"
			});
			var oUrl = window.URL.createObjectURL(testblob);
			chrome.downloads.download({
				'url': oUrl,
				'saveAs': true
			}, function(downlaodId) {
				console.log("[调试] 已下载", downlaodId);

			});
		});
	});

	$('a#crawlerBtn').click(function(event) {
		/* Act on the event */
		$('ul.nav li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('div.itab').hide();
		$('div.itab-detail').hide();
		$('div.crawlerInfo').show(function() {
			crawler_page_data_load();
		});

	});
	$('a#targetBtn').click(function(event) {
		/* Act on the event */
		$('ul.nav li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('div.itab').not('div.targetInfo').hide();
		$('div.itab-detail').hide();
		$('div.targetInfo').show(function() {
			target_page_data_load();
		});
	});
	$('a#photoProcessBtn').click(function(event) {
		/* Act on the event */
		$('ul.nav li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('div.itab').not('div.photoProcess').hide();
		$('div.itab-detail').hide();
		$('div.photoProcess').show(function() {
			// target_page_data_load();
		});
	});	
	$('a#helpBtn').click(function(event) {
		/* Act on the event */
		$('ul.nav li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('div.itab').not('div.helpInfo').hide();
		$('div.itab-detail').hide();
		$('div.helpInfo').show();
	});
	function add_crawler_rule(rule) {
		cAstConfig.api.crawler_rule_query_count(function(crawler_rules_count) {
			if (crawler_rules_count < 5) {

				var method_new = true;
				var check_status = false;
				if (rule.url_regex == '' || rule.site_url == '' || rule.site_name == '' ||
					rule.title_dom_path == '' || rule.author_dom_path == '' || rule.time_dom_path == '' || rule.content_dom_path == '') {
					check_status = false;
				} else {
					check_status = true;
				}
				if (rule.id) {
					method_new = false;
				} else {
					rule.id = new Date().getTime();
				}
				if (check_status == true) {
					if (method_new) {
						chrome.permissions.request({
							permissions: ['tabs'],
							origins: [get_site_permission_str(rule.url_regex)]
						}, function(granted) {
							// The callback argument will be true if the user granted the permissions.
							if (granted) {
								console.log("[调试] 用户同意该访问权限");
								cAstConfig.api.crawler_rule_new(rule, function(result) {
									if (result) {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedSuccess"));
										notification_config_update();

									} else {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedFailure"));
									}
									crawler_storage_used_flag = false;
									test_crawler_sync(add_crawler_rule, null);
								});

							} else {
								console.log("[调试] 用户拒绝该访问权限");
								notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedFailureAsPermission"));
								crawler_storage_used_flag = false;
								test_crawler_sync(add_crawler_rule, null);
							}

						});
					} else {

						cAstConfig.api.crawler_rule_query_by_url(rule.url_regex, function(object) {
							if (null == object) {
								chrome.permissions.request({
									permissions: ['tabs'],
									origins: [get_site_permission_str(rule.url_regex)]
								}, function(granted) {
									// The callback argument will be true if the user granted the permissions.
									if (granted) {
										console.log("[调试] 用户同意该访问权限");
										cAstConfig.api.crawler_rule_update(rule, function(result) {
											if (result) {
												notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedSuccess"));
												notification_config_update();
												crawler_storage_used_flag = false;
												test_crawler_sync(add_crawler_rule, null);
											} else {
												notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedFailure"));

												cAstConfig.api.crawler_rule_new(rule, function(xresult) {
													if (xresult) {
														notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedSuccess"));
														notification_config_update();
													} else {
														notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedFailure"));
													}
													crawler_storage_used_flag = false;
													test_crawler_sync(add_crawler_rule, null);
												});

											}
										});

									} else {
										console.log("[调试] 用户拒绝该访问权限");
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedFailureAsPermission"));
										crawler_storage_used_flag = false;
										test_crawler_sync(add_crawler_rule, null);
									}

								});
							} else {
								cAstConfig.api.crawler_rule_update(rule, function(result) {
									if (result) {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedSuccess"));
										notification_config_update();
										crawler_storage_used_flag = false;
										test_crawler_sync(add_crawler_rule, null);
									} else {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedFailure"));

										cAstConfig.api.crawler_rule_new(rule, function(xresult) {
											if (xresult) {
												notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedSuccess"));
												notification_config_update();
											} else {
												notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedFailure"));
											}
											crawler_storage_used_flag = false;
											test_crawler_sync(add_crawler_rule, null);
										});

									}

								});
							}
						});
					}

				} else {
					notification_user(chrome.i18n.getMessage("noticeRuleFormatError"));
					crawler_storage_used_flag = false;
					test_crawler_sync(add_crawler_rule, null);
				}
			} else {
				notification_user(chrome.i18n.getMessage("noticeCrawlRuleNumberOut"));
				crawler_storage_used_flag = false;
				test_crawler_sync(add_crawler_rule, null);
			}
		});
	}

	$('a#crawler_rule_save_btn').click(function(event) {
		/* Act on the event */
		cAstConfig.api.crawler_rule_query_count(function(crawler_rules_count) {
			if (crawler_rules_count < 5) {
				var method_new = true;
				var rule = {};
				rule.url_regex = $('div.crawlerDetail input#url_regex').val();
				rule.title_dom_path = $('div.crawlerDetail input#title_dom_path').val();
				rule.author_dom_path = $('div.crawlerDetail input#author_dom_path').val();
				rule.time_dom_path = $('div.crawlerDetail input#time_dom_path').val();
				rule.content_dom_path = $('div.crawlerDetail input#content_dom_path').val();
				rule.site_url = $('div.crawlerDetail input#site_url').val();
				rule.site_name = $('div.crawlerDetail input#site_name').val();
				rule.modify_time = Date();
				if (undefined == $('div.crawlerDetail input#id').val() ||
					$('div.crawlerDetail input#id').val() == '') {
					console.log('没有ID');
					rule.id = new Date().getTime();
				} else {
					console.log('[调试] 已经有ID了');
					method_new = false;
					console.log($('div.crawlerDetail input#id').val());
					rule.id = $('div.crawlerDetail input#id').val();
				}
				var check_status = false;
				if (rule.url_regex == '' || rule.site_url == '' || rule.site_name == '' ||
					rule.title_dom_path == '' || rule.author_dom_path == '' || rule.time_dom_path == '' || rule.content_dom_path == '') {
					check_status = false;
				} else {
					check_status = true;
				}

				if (check_status == true) {
					if (method_new) {
						chrome.permissions.request({
							permissions: ['tabs'],
							origins: [get_site_permission_str(rule.url_regex)]
						}, function(granted) {
							// The callback argument will be true if the user granted the permissions.
							if (granted) {
								console.log("[调试] 用户同意该访问权限");
								cAstConfig.api.crawler_rule_new(rule, function(result) {
									if (result) {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedSuccess"));
										notification_config_update();
									} else {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedFailure"));
									}
								});

							} else {
								console.log("[调试] 用户拒绝该访问权限");
								notification_user(chrome.i18n.getMessage("noticeCrawlRuleAddedFailureAsPermission"));
							}
						});
					} else {

						cAstConfig.api.crawler_rule_query_by_url(rule.url_regex, function(object) {
							if (null == object) {
								chrome.permissions.request({
									permissions: ['tabs'],
									origins: [get_site_permission_str(rule.url_regex)]
								}, function(granted) {
									// The callback argument will be true if the user granted the permissions.
									if (granted) {
										console.log("[调试] 用户同意该访问权限");
										cAstConfig.api.crawler_rule_update(rule, function(result) {
											if (result) {
												notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedSuccess"));
												notification_config_update();
											} else {
												notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedFailureDone"));
											}
										});

									} else {
										console.log("[调试] 用户拒绝该访问权限");
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedFailureAsPermission"));
									}
								});
							} else {
								cAstConfig.api.crawler_rule_update(rule, function(result) {
									if (result) {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedSuccess"));
										notification_config_update();
									} else {
										notification_user(chrome.i18n.getMessage("noticeCrawlRuleUpdatedFailureDone"));
									}
								});
							}
						});
					}

				} else {
					notification_user(chrome.i18n.getMessage("noticeRuleFormatError"));
				}

			} else {
				notification_user(chrome.i18n.getMessage("noticeCrawlRuleNumberOut"));
			}
		});

	});
	$('button#crawler_rule_cancel_btn').click(function(event) {
		/* Act on the event */
		$('div.crawlerInfo').show();
		$('div.crawlerDetail').hide();
	});

	$('button#crawler_rule_clear_btn').click(function(event) {
		/* Act on the event */
		cAstConfig.api.crawler_rule_clear(function(result) {
			if (result) {
				notification_user(chrome.i18n.getMessage("noticeCrawlRuleClearSuccess"));
				notification_config_update();
			} else {
				notification_user(chrome.i18n.getMessage("noticeCrawlRuleClearFailure"));
			}
			crawler_page_data_load();
		});
	});
	$('button#crawler_rule_refresh_btn').click(function(event) {
		/* Act on the event */
		crawler_page_data_load();
	});

	$('a#crawler_rule_new_btn').click(function(event) {
		/* Act on the event */
		cAstConfig.api.crawler_rule_query_count(function(crawler_rules_count) {

			if (crawler_rules_count < 5) {
				$('div.itab').hide();
				$('div.crawlerDetail').show(function() {
					$('div.crawlerDetail input#id').val('');
					$('div.crawlerDetail input#url_regex').val('');
					$('div.crawlerDetail input#title_dom_path').val('');
					$('div.crawlerDetail input#author_dom_path').val('');
					$('div.crawlerDetail input#time_dom_path').val('');
					$('div.crawlerDetail input#content_dom_path').val('');
					$('div.crawlerDetail input#site_url').val('');
					$('div.crawlerDetail input#site_name').val('');
				});
			} else {
				notification_user(chrome.i18n.getMessage("noticeCrawlRuleNumberOut"));
			}

		});
	});

	function save_target_rule(rule) {

		var check_status = false;
		if (rule.site_type == '' || rule.site_url == '' || rule.site_name == '' || rule.url_new == '' ||
			rule.title_dom_path == '' || rule.title_label_dom_path == '' || rule.time_dom_path == '' || rule.content_dom_path == '') {
			check_status = false;
		} else {
			check_status = true;
		}

		if (check_status == true) {

			chrome.permissions.request({
				permissions: ['tabs'],
				origins: [get_site_permission_str(rule.url_new)]
			}, function(granted) {
				// The callback argument will be true if the user granted the permissions.
				if (granted) {
					console.log("[调试] 用户同意该访问权限");
					cAstConfig.api.target_rule_new(rule, function(result) {
						if (result) {
							notification_user(chrome.i18n.getMessage("noticeTargetRuleUpdatedSuccess"));
							notification_config_update();
						} else {
							notification_user(chrome.i18n.getMessage("noticeTargetRuleUpdatedFailure"));
						}
					});

				} else {
					console.log("[调试] 用户拒绝该访问权限");
					notification_user(chrome.i18n.getMessage("noticeTargetRuleAddedFailureAsPermission"));
				}
			});


		} else {
			notification_user(chrome.i18n.getMessage("noticeRuleFormatError"));
		}

	}

	$('a.target_rule_save_btn').click(function(event) {
		/* Act on the event */
		//初始化目标规则
		var rule = {};
		//设置网站类型
		rule.site_type = $('div.targetInfo select#site_type').val();
		//设置网站域名
		rule.site_url = $('div.targetInfo input#site_url').val();
		//设置网站名称
		rule.site_name = $('div.targetInfo input#site_name').val();
		//设置新建文章URL
		rule.url_new = $('div.targetInfo input#url_new').val();
		//设置标题DOM路径
		rule.title_dom_path = $('div.targetInfo input#title_dom_path').val();
		//设置作者DOM路径
		rule.title_label_dom_path = $('div.targetInfo input#title_label_dom_path').val();
		//设置时间DOM路径
		rule.time_dom_path = $('div.targetInfo input#time_dom_path').val();
		//设置正文DOM路径
		rule.content_dom_path = $('div.targetInfo input#content_dom_path').val();
		//设置规则修改时间
		rule.modify_time = Date();
		console.log('[调试] 新增目标规则', rule);

		save_target_rule(rule);

		// var check_status = false;
		// if (rule.site_type == '' || rule.site_url == '' || rule.site_name == '' || rule.url_new == '' ||
		// 	rule.title_dom_path == '' || rule.title_label_dom_path == '' || rule.time_dom_path == '' || rule.content_dom_path == '') {
		// 	check_status = false;
		// } else {
		// 	check_status = true;
		// }

		// if (check_status == true) {

		// 	chrome.permissions.request({
		// 		permissions: ['tabs'],
		// 		origins: [get_site_permission_str(rule.url_new)]
		// 	}, function(granted) {
		// 		// The callback argument will be true if the user granted the permissions.
		// 		if (granted) {
		// 			console.log("用户同意该访问权限");
		// 			cAstConfig.api.target_rule_new(rule, function(result) {
		// 				if (result) {
		// 					notification_user('更新抓取规则完成');
		// 					notification_config_update();
		// 				} else {
		// 					notification_user('更新抓取规则失败');
		// 				}
		// 			});

		// 		} else {
		// 			console.log("用户拒绝该访问权限");
		// 			notification_user('未添加该规则');
		// 		}
		// 	});


		// } else {
		// 	notification_user('请按照要求填写所有必填项');
		// }
	});

	chrome.tabs.getCurrent(function currentTab(tab) {
		currentUrl = tab.url;
		defaultPage = true;

		if (currentUrl.match('#crawlerInfo') != null) {
			defaultPage = false;
			$('a#crawlerBtn').click();
		};
		if (currentUrl.match('#targetInfo') != null) {
			defaultPage = false;
			$('a#targetBtn').click();
		};
		if (currentUrl.match('#machineInfo') != null) {
			defaultPage = false;
			$('a#machineBtn').click();
		};
		if (currentUrl.match('#photoProcess') != null) {
			defaultPage = false;
			$('a#photoProcessBtn').click();
		};		
		if (currentUrl.match('#aboutInfo') != null) {
			defaultPage = false;
			$('a#aboutBtn').click();
		};		
		if (defaultPage == true) {
			$('a#machineBtn').click();
		}

	});

// Image Processor

	var cropper_enabled_flag = false;

	function to_process_image_init() {
		var search_string = window.location.search;
		// console.log("[调试] 查询参数为", search_string);
		if ( null != search_string && '' != search_string) {
			var index = search_string.indexOf("img_url=");
			if ( undefined != index && index != 0 ) {
				
				document.body.querySelector("#image_to_process").src = search_string.substring(index+8);
			};
		};
	}
	
	to_process_image_init();

	function cropper_plugin_init() {
		if (false == cropper_enabled_flag) {
			if (undefined != document.body.querySelector("#image_to_process").src && 
				'' != document.body.querySelector("#image_to_process").src ) {
				
				$("#image_to_process").cropper({
					preview: '.cropper-preview',
					movable: true,
					crop: function(e) {
						// Output the result data for cropping image.
						$("div#snapshot_img_info input#cropper_select_x").val(e.x);
						$("div#snapshot_img_info input#cropper_select_y").val(e.y);
						$("div#snapshot_img_info input#cropper_select_width").val(e.width);
						$("div#snapshot_img_info input#cropper_select_height").val(e.height);
						$("div#snapshot_img_info input#cropper_select_rotate").val(e.rotate);
						$("div#snapshot_img_info input#cropper_select_scalex").val(e.scaleX);
						$("div#snapshot_img_info input#cropper_select_scaley").val(e.scaleY);
					}
				});
				cropper_enabled_flag = true;
			}else{
				notification_user("没有要处理的图片，请先上传或者在所浏览的网页中的图片点击右键选择\"图片处理\"");
			}			
		}else{
			notification_user("已经处于编辑模式");
		}
	}

	// cropper_plugin_init();

	function toolbar_init() {

		var enable_cropper_btn = document.body.querySelector("#enable_cropper_btn");
		enable_cropper_btn.addEventListener("click", cropper_plugin_init);

		var selector_ratio_btns = document.body.querySelectorAll("#cropper_selector_ratio_btns button");

		for (var i = selector_ratio_btns.length - 1; i >= 0; i--) {

			selector_ratio_btns[i].addEventListener("click", function(event) {
				var ratio = event.target.dataset.ratio;
				$("#image_to_process").cropper("setAspectRatio", ratio);
				console.log("[调试] ratio ", ratio);
			});
		};

		var action_btns = document.body.querySelectorAll("[data-cropper-method]");
		console.log("[调试] action_btns", action_btns);
		for (var i = action_btns.length - 1; i >= 0; i--) {
			// console.log("[调试] action_btns[i] dataset ", action_btns[i].dataset);
			var method = action_btns[i].dataset.cropperMethod;
			if (method != undefined && method != '') {
				action_btns[i].addEventListener("click", function(event) {
					var action_btn = event.currentTarget;
					var methodOption = action_btn.getAttribute("method-option");
					console.log("[调试] 第一个参数是", action_btn, methodOption);
					if (methodOption != undefined) {

						var methodSecondOption = action_btn.getAttribute("method-second-option");
						console.log("[调试] 第二个参数是", methodSecondOption);
						if (methodSecondOption != undefined) {

							$("#image_to_process").cropper(action_btn.dataset.cropperMethod, methodOption, methodSecondOption);
						} else {

							$("#image_to_process").cropper(action_btn.dataset.cropperMethod, methodOption);
							if (action_btn.dataset.cropperMethod == "scaleX" || action_btn.dataset.cropperMethod == "scaleY") {
								action_btn.setAttribute("method-option", -methodOption);
							};
						}

					} else {
						console.log("[调试] 系统命令，无参数");
						$("#image_to_process").cropper(action_btn.dataset.cropperMethod);
						if (action_btn.dataset.cropperMethod == "destroy") {
							cropper_enabled_flag = false;
						};
					}
					event.preventDefault();
				});
			};

		};

		var cropper_size_width_input = document.body.querySelector("#cropper_save_dialog #cropper_size_width");
		var cropper_size_height_input = document.body.querySelector("#cropper_save_dialog #cropper_size_height");
		cropper_size_width_input.addEventListener("change", function(event) {
			var width_input = event.target;
			var div_refer = width_input.parentElement;

			var tmp_element = div_refer.nextElementSibling;
			while (!tmp_element.classList.contains("checkbox")) {
				tmp_element = tmp_element.nextElementSibling;
			}
			var check_input_item = tmp_element.querySelector("#size_lock_ratio");
			console.log("[调试] width: checkbox status ", check_input_item.checked, check_input_item.value);
			if (check_input_item.checked) {
				var assistant_img_size_adjust = document.body.querySelector("#assistant_img_size_adjust");
				//html5居然也可以使用冒号:，擦
				var cropper_type = assistant_img_size_adjust.querySelector("input[name=cropper_type]:checked").value;
				if (cropper_type == "cropper_type_ratio") {
					cropper_size_height_input.value = width_input.value;
				};
				if (cropper_type == "cropper_type_pixel") {
					var origin_canvas = document.body.querySelector("#cropper_result_div").querySelector("canvas");
					var height = (width_input.value * origin_canvas.height) / origin_canvas.width;
					cropper_size_height_input.value = height;
				};

			};
		});

		cropper_size_height_input.addEventListener("change", function() {
			var height_input = event.target;
			var div_refer = height_input.parentElement;

			var tmp_element = div_refer.nextElementSibling;
			while (!tmp_element.classList.contains("checkbox")) {
				tmp_element = tmp_element.nextElementSibling;
			}
			var check_input_item = tmp_element.querySelector("#size_lock_ratio");
			console.log("[调试] height: checkbox status ", check_input_item.checked, check_input_item.value);
			if (check_input_item.checked) {
				var assistant_img_size_adjust = document.body.querySelector("#assistant_img_size_adjust");
				//html5居然也可以使用冒号:，擦
				var cropper_type = assistant_img_size_adjust.querySelector("input[name=cropper_type]:checked").value;
				if (cropper_type == "cropper_type_ratio") {
					cropper_size_width_input.value = height_input.value;
				};
				if (cropper_type == "cropper_type_pixel") {
					var origin_canvas = document.body.querySelector("#cropper_result_div").querySelector("canvas");
					var width = (height_input.value * origin_canvas.width) / origin_canvas.height;
					cropper_size_width_input.value = width;
				}
			};
		});
		var restore_image_size_btn = document.body.querySelector("#restore_img_size_btn");
		restore_image_size_btn.addEventListener("click", function(){
			var origin_img = document.body.querySelector("#cropper_result_div").querySelector("#origin_img");
			var target_img = document.body.querySelector("#cropper_result_div").querySelector("#target_img");

			var last_width = origin_img.dataset.lastWidth;
			var last_height = origin_img.dataset.lastHeight;
			var target_canvas = document.createElement("canvas");

			target_canvas.width = last_width;
			target_canvas.height = last_height;
			console.log("[调试] 恢复为 长", last_width, "高为 ", last_height);
			var target_ctx = target_canvas.getContext("2d");
			// console.log("[调试] 目标canvas的长为：", cropper_size_width, "高为：", cropper_size_height);
			if (undefined != origin_img) {
				// target_ctx.scale(cropper_size_width_ratio, cropper_size_height_ratio);
				target_ctx.drawImage(origin_img, 0, 0,last_width, last_height);
			};

			// $("#cropper_save_dialog").modal('show').find("#cropper_result_div").append($(target_canvas));
			target_img.src = target_canvas.toDataURL();
			target_img.width = target_canvas.width;
			target_img.height = target_canvas.height;
			origin_img.dataset.lastWidth = null;
			origin_img.dataset.lastHeight = null;
			restore_image_size_btn.disabled = true;

			$("#cropper_save_dialog").find("#cropper_download_btn").attr('href', target_canvas.toDataURL());			
		});
		var adjust_image_size_btn = document.body.querySelector("#adjust_img_size_btn");
		adjust_img_size_btn.addEventListener("click", function() {
			// var origin_canvas = document.body.querySelector("#cropper_result_div").querySelector("canvas");
			var origin_img = document.body.querySelector("#cropper_result_div").querySelector("#origin_img");
			var target_img = document.body.querySelector("#cropper_result_div").querySelector("#target_img");
			var assistant_img_size_adjust = document.body.querySelector("#assistant_img_size_adjust");
			//html5居然也可以使用冒号:，擦
			var cropper_type = assistant_img_size_adjust.querySelector("input[name=cropper_type]:checked").value;
			var cropper_size_width = 0; assistant_img_size_adjust.querySelector("#cropper_size_width").value;
			var cropper_size_height = 0; assistant_img_size_adjust.querySelector("#cropper_size_height").value;
			var cropper_size_width_ratio = 1;
			var cropper_size_height_ratio = 1;
			if (cropper_type == "cropper_type_ratio") {

				cropper_size_width_ratio = assistant_img_size_adjust.querySelector("#cropper_size_width").value;
				cropper_size_height_ratio = assistant_img_size_adjust.querySelector("#cropper_size_height").value;

				var origin_size_width = target_img.width;
				var origin_size_height = target_img.height;
				cropper_size_width = origin_size_width*cropper_size_width_ratio  ;
				cropper_size_height = origin_size_height*cropper_size_height_ratio  ;
			}
			
			var target_canvas = document.createElement("canvas");

			target_canvas.width = cropper_size_width;
			target_canvas.height = cropper_size_height;

			var target_ctx = target_canvas.getContext("2d");
			// console.log("[调试] 目标canvas的长为：", cropper_size_width, "高为：", cropper_size_height);
			if (undefined != target_img) {
				// target_ctx.scale(cropper_size_width_ratio, cropper_size_height_ratio);
				target_ctx.drawImage(target_img, 0, 0,cropper_size_width, cropper_size_height);
			};

			// $("#cropper_save_dialog").modal('show').find("#cropper_result_div").append($(target_canvas));
			target_img.src = target_canvas.toDataURL();
			origin_img.dataset.lastWidth = target_img.width;
			origin_img.dataset.lastHeight = target_img.height;			
			target_img.width = target_canvas.width;
			target_img.height = target_canvas.height;

			restore_image_size_btn.disabled = false;

			$("#cropper_save_dialog").find("#cropper_download_btn").attr('href', target_canvas.toDataURL());
		});

		var save_cropper_btn = document.body.querySelector("#save_cropper_btn");
		save_cropper_btn.addEventListener("click", function() {
			var result = $("#image_to_process").cropper("getCroppedCanvas");
			var img_element = document.createElement("img");
			img_element.width = result.width;
			img_element.height = result.height;
			img_element.id = "origin_img";

			img_element.src = result.toDataURL("image/jpeg");
			var clone_img_element = img_element.cloneNode(true);
			clone_img_element.id = "target_img";
			img_element.style.display = "none";
			$("#cropper_save_dialog").modal('show').find("#cropper_result_div").css("overflow", "scroll").html("").append($(img_element)).append($(clone_img_element));

			$("#cropper_save_dialog").find("#cropper_download_btn").attr('href', result.toDataURL());
		});

	}
	toolbar_init();

	function process_photo_upload_modal_init(){
		var upload_btn = document.body.querySelector("#process_photo_upload_btn");
		upload_btn.addEventListener("click", function(event){
			// window.location.href = "http://www.baidu.com";
			var fileinput = document.body.querySelector("#process_photo_upload_fileinput");
			if (fileinput.files != null && fileinput.files.length > 0) {
				var file = fileinput.files[0];
				var fileReader = new FileReader();
				fileReader.onload = function(event){
					console.log("[调试] 读取上传图片load Event", event);
					console.log("[调试] window.location", window.location);
					// var img_container = document.body.querySelector("#image_to_process");
					// img_container.src = event.target.result;
					// window.location.href = "http://www.baidu.com";
					// window.location.href = window.location.origin + window.location.pathname+"?img_url="+event.target.result+"#photoProcess";
					window.location.search = "?img_url="+event.target.result;
					// window.location.search = "?img_url=dogu";
					console.log("[调试] 重定向后window.location", window.location);

				};

				fileReader.readAsDataURL(file);
			};
		});
	}
	process_photo_upload_modal_init();

});