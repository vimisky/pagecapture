(function(window, document, undefined) {

	function _fnLibValidate() {
		console.log("[调试] Config.js生效");
		return true;
	}

	function _fnCrawler_rule_query_by_id(id, callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		_fnCrawler_rule_query_all(function(crawler_rules) {
			if (crawler_rules == null) {
				callback(null);
				return;
			};
			var rule_existed = false;
			$.each(crawler_rules, function(index, val) {
				/* iterate through array or object */
				if (val.id == id) {
					rule_existed = true;
					callback(val);
					return;
				};
			});
			if (!rule_existed) {
				callback(null);	
			};
			
		}, is_login);
	}

	function _fnCrawler_rule_query_by_url(url, callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		_fnCrawler_rule_query_all(function(crawler_rules) {
			if (crawler_rules == null) {
				callback(null);
				return;
			};
			var rule_existed = false;
			$.each(crawler_rules, function(index, val) {
				/* iterate through array or object */
				if (val.url_regex == url) {
					rule_existed = true;
					callback(val);
					return;
				};
			});
			if (!rule_existed) {
				callback(null);	
			}
			
		}, is_login);
	}

	function _fnCrawler_rule_query_all(callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		if (is_login) {
			chrome.storage.sync.get(["crawler_rules"], function(items) {
				if (undefined == items.crawler_rules || items.crawler_rules.length == 0) {
					callback(null);
				} else {
					callback(items.crawler_rules);
				}
			});
		} else {
			chrome.storage.local.get(["crawler_rules"], function(items) {
				if (undefined == items.crawler_rules || items.crawler_rules.length == 0) {
					callback(null);
				} else {
					callback(items.crawler_rules);
				}

			});
		}
	}

	function _fnCrawler_rule_query_count(callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		if (is_login) {
			chrome.storage.sync.get(["crawler_rules"], function(items) {

				if (undefined == items.crawler_rules || items.crawler_rules.length == 0) {
					callback(0);
				} else {
					callback(items.crawler_rules.length);
				}
			});
		} else {
			chrome.storage.local.get(["crawler_rules"], function(items) {

				if (undefined == items.crawler_rules || items.crawler_rules.length == 0) {
					callback(0);
				} else {
					callback(items.crawler_rules.length);
				}

			});
		}
	}

	function _fnCrawler_rule_new(rule, callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		_fnCrawler_rule_query_all(function(crawler_rules) {

			if (crawler_rules == null) {
				crawler_rules = [];
			};
			crawler_rules.push(rule);

			if (is_login) {
				chrome.storage.sync.set({
					'crawler_rules': crawler_rules
				}, function() {
					callback(true);
				});

			} else {
				chrome.storage.local.set({
					'crawler_rules': crawler_rules
				}, function() {
					callback(true);
					// console.log('增加抓取规则失败');
					// callback(false);
				});

			}

		}, is_login);

	}

	function _fnCrawler_rule_update(rule, callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		_fnCrawler_rule_query_all(function(crawler_rules) {
			if (crawler_rules == null) {
				console.log('获取全部抓取规则为空');
				callback(false);
				return;
			};

			var uindex = -1;
			$.each(crawler_rules, function(index, val) {
				/* iterate through array or object */
				if (val.id == rule.id) {
					uindex = index;
				};
			});
			if (uindex == -1) {
				console.log('找不到要更新的抓取规则');
				callback(false);
				return;
			};
			crawler_rules[uindex] = rule;
			if (is_login) {
				chrome.storage.sync.set({
					'crawler_rules': crawler_rules
				}, function() {
					callback(true);
					// console.log('保存更新抓取规则失败');
					// callback(false);
				});

			} else {
				chrome.storage.local.set({
					'crawler_rules': crawler_rules
				}, function() {
					callback(true);
					// console.log('保存更新抓取规则失败');
					// callback(false);
				});
			}
		}, is_login);

	}

	function _fnCrawler_rule_delete(id, callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		_fnCrawler_rule_query_all(function(crawler_rules) {
			var uindex = -1;
			$.each(crawler_rules, function(index, val) {
				/* iterate through array or object */
				if (val.id == id) {
					uindex = index;
				};
			});
			if (uindex == -1) {
				console.log('找不到要删除的抓取规则');
				callback(false);
				return;
			};
			var item_delete = crawler_rules.splice(uindex, 1);
			console.log('要删除的抓取项为', item_delete);

			if (is_login) {
				chrome.storage.sync.set({
					'crawler_rules': crawler_rules
				}, function() {
					callback(true);
					// console.log('删除抓取规则失败');
					// callback(false);
				});

			} else {
				chrome.storage.local.set({
					'crawler_rules': crawler_rules
				}, function() {
					callback(true);
					// console.log('删除抓取规则失败');
					// callback(false);
				});
			}
		});


	}

	function _fnCrawler_rule_clear(callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		if (is_login) {
			chrome.storage.sync.remove('crawler_rules', function() {
				callback(true);
				// console.log("清空抓取规则失败");
				// callback(false);
			});

		} else {
			chrome.storage.local.remove('crawler_rules', function() {
				callback(true);
				// console.log("清空抓取规则失败");
				// callback(false);
			});

		}
	}

	function _fnTarget_rule_query(callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		if (is_login) {
			chrome.storage.sync.get("target_rule", function(items) {
				if (undefined == items.target_rule || items.target_rule.length == 0) {
					callback(null);
				} else {
					callback(items.target_rule);
				}
			});
		} else {
			chrome.storage.local.get("target_rule", function(items) {
				if (undefined == items.target_rule || items.target_rule.length == 0) {
					callback(null);
				} else {
					callback(items.target_rule);
				}
			});
		}
	}

	function _fnTarget_rule_new(rule, callback, is_login) {

		is_login = typeof is_login !== 'undefined' ? is_login : false;

		if (is_login) {
			chrome.storage.sync.set({
				'target_rule': rule
			}, function() {
				callback(true);
				// console.log("增加目标规则失败");
				// callback(false);
			});

		} else {
			chrome.storage.local.set({
				'target_rule': rule
			}, function() {
				callback(true);
				// console.log("增加目标规则失败");
				// callback(false);
			});
		}
	}
	var _Api = {
		"crawler_rule_query_by_id": _fnCrawler_rule_query_by_id,
		"crawler_rule_query_by_url": _fnCrawler_rule_query_by_url,
		"crawler_rule_query_all": _fnCrawler_rule_query_all,
		"crawler_rule_query_count": _fnCrawler_rule_query_count,
		"crawler_rule_new": _fnCrawler_rule_new,
		"crawler_rule_update": _fnCrawler_rule_update,
		"crawler_rule_delete": _fnCrawler_rule_delete,
		"crawler_rule_clear": _fnCrawler_rule_clear,
		"target_rule_query": _fnTarget_rule_query,
		"target_rule_new": _fnTarget_rule_new,
		"validate": _fnLibValidate
	};

	var _cAstConfig = {};
	_cAstConfig.api = _Api;
	window.cAstConfig = _cAstConfig;

}(window, document));