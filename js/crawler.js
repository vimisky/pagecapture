// 通过background.js注入下面的变量，本地测试时可以打开注释
// var crawl_rule = {
// 	"title" : "div.detail_content div.detail_content_l div.detail_title table tr:eq(0) td:eq(0) span",
// 	"content" : "div.detail_content div.detail_content_l div#contentDiv1",
// 	"time" : "div.detail_content div.detail_content_l div.detail_title table tr:eq(1) td:eq(1)"
// }

console.log("[调试] 传递过来的采集模板规则", crawl_rule);
console.log("[调试] 抓取页已加载crawler.js")

// if (undefined) {
// 	console.log("[测试] undefined为真");
// } else {
// 	console.log("[测试] undefined为假");
// }

// if (null) {
// 	console.log("[测试] null为真");
// } else {
// 	console.log("[测试] null为假");
// }

// if (null != undefined) {
// 	console.log("[测试] null != undefined为真");
// } else {
// 	console.log("[测试] null != undefined为假");
// }

var crawler_capture_view_modal_html = '' +
	'<div class="modal fade" id="crawler_capture_view_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
	'<div class="modal-dialog modal-lg" role="document">' +
	'<div class="modal-content">' +
	'<div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'<h4 class="modal-title" id="myModalLabel">' + chrome.i18n.getMessage('extViewThisCapturePanelTitle') + '</h4>' +
	'</div>' +
	'<div class="modal-body">' +

	'</div>' +
	'<div class="modal-footer">' +
	// '<button type="button" class="btn btn-default" >'+ chrome.i18n.getMessage('btnSaveBtn') +'</button>'+
	'<button type="button" class="btn btn-default" data-dismiss="modal">' + chrome.i18n.getMessage('btnCloseBtn') + '</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>	' +
	'';

var crawler_rule_view_modal_html = '' +
	'<div class="modal fade" id="crawler_rule_view_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
	'<div class="modal-dialog" role="document">' +
	'<div class="modal-content">' +
	'<div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'<h4 class="modal-title" id="myModalLabel">' + chrome.i18n.getMessage('extViewThisCrawlerRulePanelTitle') + '</h4>' +
	'</div>' +
	'<div class="modal-body">' +

	'</div>' +
	'<div class="modal-footer">' +
	// '<button type="button" class="btn btn-default" >'+ chrome.i18n.getMessage('btnSaveBtn') +'</button>'+
	'<button type="button" class="btn btn-default" data-dismiss="modal">' + chrome.i18n.getMessage('btnCloseBtn') + '</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>	' +
	'';

var crawler_dialog_html = '' +
	'<div class="modal fade" id="crawler_config_single_rule_element_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
	'<div class="modal-dialog" role="document">' +
	'<div class="modal-content">' +
	'<div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'<h4 class="modal-title" id="myModalLabel">' + chrome.i18n.getMessage('infoCrawlerRuleSetPanelTitle') + '</h4>' +
	'</div>' +
	'<div class="modal-body">' +
	'<div class="form-horizontal">' +
	'<div class="form-group">' +
	'<label class="col-sm-2 control-label">' + chrome.i18n.getMessage('labelDomLabelTitle') + '</label>' +
	'<div class="col-sm-10">' +
	'<span id="css_element_selector_string" class="help-block"></span>' +
	'</div>' +
	'</div>	      	' +
	'<div id="option_article_urls" class="form-group">' +
	'<label for="crawler_site_article_url" class="col-sm-2 control-label">' + chrome.i18n.getMessage('labelArticleUrl') + '</label>' +
	'<div class="col-sm-10">' +
	'<select class="form-control" id="crawler_site_article_url" name="crawler_site_article_url">' +

	'</select>' +
	'<span id="crawler_site_article_url_helpBlock" class="help-block">' + chrome.i18n.getMessage('helpBlockRequire') + '</span>' +
	'</div>' +

	'</div>	' +
	'<div id="div_new_article_url_wrapper" style="overflow:hidden; ">' +
	'<div id="div_new_article_url" class="form-group" style="margin-top:-100%">' +
	'<label for="input_new_article_url" class="col-sm-2 control-label">' + chrome.i18n.getMessage('labelNewArticleUrl') + '</label>' +
	'<div class="col-sm-10">' +
	'<input class="form-control" id="input_new_article_url" name="new_article_url" />' +
	'<span id="helpBlock" class="help-block">' + chrome.i18n.getMessage('helpBlockRequire') + ',' + chrome.i18n.getMessage('helpBlockStarRegexp') + '</span>' +
	// '<button id="input_new_article_url_confirm" class="btn btn-default">保存</button><button id="input_new_article_url_cancel" class="btn btn-default">取消</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'<div class="form-group">' +

	'<label for="article_element" class="col-sm-2 control-label">应用于</label>' +
	'<div class="col-sm-10">' +

	'<select class="form-control" id="article_element" name="article_element">' +
	'<option value="title">' + chrome.i18n.getMessage('labelTitle') + '</option>' +
	'<option value="content">' + chrome.i18n.getMessage('labelContent') + '</option>' +
	'<option value="createtime">' + chrome.i18n.getMessage('labelAuthor') + '</option>' +
	'<option value="author">' + chrome.i18n.getMessage('labelDateTime') + '</option>' +
	'</select>' +
	'<span id="crawler_site_type_helpBlock" class="help-block">' + chrome.i18n.getMessage('helpBlockRequire') + '</span>' +
	'</div>' +
	'</div>	' +
	'<div class="form-group" id="history_tips" style="text-align:center;">' +
	'' +
	'</div>' +
	'</div>' +
	'</div>' +
	'<div class="modal-footer">' +
	'<button type="button" class="btn btn-default" data-dismiss="modal">' + chrome.i18n.getMessage('btnSaveBtn') + '</button>' +
	'<button type="button" class="btn btn-default" data-dismiss="modal">' + chrome.i18n.getMessage('btnCloseBtn') + '</button>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'</div>	';

var $crawler_rule_view_modal = $(crawler_rule_view_modal_html);
var $crawler_dialog = $(crawler_dialog_html);
var $crawler_capture_view_modal = $(crawler_capture_view_modal_html);
var span_flag = false;
var modal_loaded_flag = false;
var view_modal_loaded_flag = false;
var capture_view_modal_loaded_flag = false;
// $crawler_dialog.find('#crawler_config_single_rule_element_modal').click(function(event) {
// 	/* Act on the event */
// 	event.preventDefault();
// });

function display_dom_information(event) {
	// console.log(event.target,'划过划过');
	if (span_flag) {
		return;
	};
	event.target.classList.add('xhighlight');
	var span_element = document.createElement("span");
	span_element.classList.add("xtip");
	span_element.innerHTML = get_css_selector_of_element("", event.target);
	document.body.appendChild(span_element);
	// span_element.style.left = document.body.scrollLeft + "px";
	// span_element.style.top = document.body.scrollTop + "px";
	var viewport_element_rect = event.target.getClientRects();
	span_element.style.left = document.body.scrollLeft + viewport_element_rect[0].left + "px";
	span_element.style.top = document.body.scrollTop + viewport_element_rect[0].top + "px";
	// console.log("[调试] 各个元素的位置 ------ 开始");
	// console.log("event.target.offsetTop : ", event.target.offsetTop);
	// console.log("event.target.offsetLeft : ", event.target.offsetLeft);
	// none method
	// console.log("event.target.offsetBottom : ", event.target.offsetBottom);
	// console.log("event.target.offsetParent", event.target.offsetParent);
	// console.log("event.target.scrollTop : ", event.target.scrollTop);
	// console.log("event.target.scrollLeft : ", event.target.scrollLeft);
	// none method
	// console.log("event.target.scrollBottom : ", event.target.scrollBottom);
	// console.log("document.body.scrollTop : ", document.body.scrollTop);
	// console.log("document.body.scrollLeft : ", document.body.scrollLeft);
	// console.log("document.documentElement.scrollTop : ", document.documentElement.scrollTop);
	// console.log("document.body.scrollLeft : ", document.body.scrollLeft);
	// chrome is 0
	// console.log("event.target.clientTop : ", event.target.clientTop);
	// console.log("event.target.clientLeft : ", event.target.clientLeft);
	// console.log("event.target.clientBottom : ", event.target.clientBottom);
	// console.log("clientRects : ", event.target.getClientRects());
	// console.log("[调试] 各个元素的位置 ------ 结束");
	// console.log("[调试] nextSbiling ", event.target.nextSibling);
	// if (null != event.target.nextSibling) {
	// 	event.target.parentElement.insertBefore(span_element, event.target.nextSibling);
	// } else {
	// 	event.target.parentElement.appendChild(span_element);
	// }

	span_flag = true;
	event.stopPropagation();

	event.preventDefault();
}

function hidden_dom_information(event) {
	// console.log("[调试]" + event.target + " mouseover被触发, 隐藏Dom信息");
	if (span_flag) {
		event.target.classList.remove('xhighlight');
		var span_element = document.body.querySelector("span.xtip");
		document.body.removeChild(span_element);
		span_flag = false;
	};
	event.stopPropagation();

	event.preventDefault();
}

function stick_dom_display_status(event) {
	if (span_flag) {
		// console.log("[调试]" + event.target + " click被点击");
		disable_entity_dom_selector();
		enable_entity_click_quit_selector();
		event.stopPropagation();
		event.preventDefault();
	};


}

function enable_entity_click_quit_selector() {
	var dom_body = document.body;
	enable_click_quit_selector(dom_body);
}

function enable_click_quit_selector(domelement) {

	var schildren = domelement.children;
	for (var i = schildren.length - 1; i >= 0; i--) {
		if (schildren[i].id == "crawler_config_single_rule_element_modal") {
			continue;
		};
		enable_click_quit_selector(schildren[i]);
		schildren[i].addEventListener('click', quit_click_handler);
	};

}

function quit_click_handler(event) {
	var xhighlight_element = document.body.querySelector(".xhighlight");
	if (xhighlight_element) {
		xhighlight_element.classList.remove('xhighlight');
	};

	var span_element = document.body.querySelector("span.xtip");
	if (span_element) {
		document.body.removeChild(span_element);
	};

	span_flag = false;
	enable_entity_dom_selector();
	disable_entity_click_quit_selector();
	event.stopPropagation();
	event.preventDefault();
}

function disable_entity_click_quit_selector() {
	var dom_body = document.body;
	disable_click_quit_selector(dom_body);
}

function disable_click_quit_selector(domelement) {
	var schildren = domelement.children;
	for (var i = schildren.length - 1; i >= 0; i--) {
		if (schildren[i].id == "crawler_config_single_rule_element_modal") {
			continue;
		};
		disable_click_quit_selector(schildren[i]);
		schildren[i].removeEventListener('click', quit_click_handler);
	};
}

function enable_entity_dom_selector() {
	// console.log("[调试] 设置DOM Selector");
	var dom_body = document.body;
	enable_dom_selector(dom_body);
}

function disable_entity_dom_selector() {
	// console.log("[调试] 取消DOM Selector");
	var dom_body = document.body;
	disable_dom_selector(dom_body);
}


function enable_dom_selector(domelement) {

	var schildren = domelement.children;
	for (var i = schildren.length - 1; i >= 0; i--) {
		if (schildren[i].id == "crawler_config_single_rule_element_modal") {
			// console.log("[调试] 设置DOM Selector，发现modal，不需要，直接返回");
			continue;
		};
		enable_dom_selector(schildren[i]);

		schildren[i].addEventListener('mouseover', display_dom_information);
		schildren[i].addEventListener('click', stick_dom_display_status);
		schildren[i].addEventListener('mouseout', hidden_dom_information);
		// schildren[i].addEventListener('mousemove', display_dom_information);
		// schildren[i].addEventListener('mouseup', display_dom_information);
		// schildren[i].addEventListener('mousedown', display_dom_information);
	};

}


function disable_dom_selector(domelement) {

	var schildren = domelement.children;
	for (var i = schildren.length - 1; i >= 0; i--) {
		if (schildren[i].id == "crawler_config_single_rule_element_modal") {
			// console.log("[调试] 取消DOM Selector，发现modal，不需要，直接返回");
			continue;
		};
		disable_dom_selector(schildren[i]);
		schildren[i].removeEventListener('mouseover', display_dom_information);
		schildren[i].removeEventListener('click', stick_dom_display_status);
		schildren[i].removeEventListener('mouseout', hidden_dom_information);
		// schildren[i].removeEventListener('mousemove', display_dom_information);
		// schildren[i].removeEventListener('mouseup', display_dom_information);
		// schildren[i].removeEventListener('mousedown', display_dom_information);
	};
}
//
//算法，迭代
//CSS Selector使用>直接子元素表示方法，向上找，直到唯一，结束条件:#
//唯一的判定，相对于父元素，在子元素一级唯一即可
//顺序: nodeName, classList(是否需要各种组合,nn, chrome是直接.class1.class2.class3, 哈哈), position(previousSibling来判定)
function get_css_selector_of_element(surfix, element) {
	//有id，直接返回#id
	if (element.id) {
		return "#" + element.id + (surfix == "" ? "" : " > " + surfix);
	};

	var nodeName = element.nodeName.toLowerCase();
	if (nodeName == 'body') {
		return "body" + (surfix == "" ? "" : " > " + surfix);
	};

	// console.log("[调试] Node Name为", nodeName);
	var classList = element.classList;
	var classString = "";
	//有class, 则遍历class，看是否唯一，如果唯一
	if (classList) {
		for (var i = classList.length - 1; i >= 0; i--) {
			if (classList.item(i).toLowerCase() != 'xhighlight') {
				classString += "." + classList.item(i).toLowerCase();
			};
		};
	};

	if (classString != "") {
		var childNumber = element.parentElement.querySelectorAll(nodeName + classString);
		if (childNumber == 1) {
			surfix = nodeName + classString + (surfix == "" ? "" : " > " + surfix);
			return get_css_selector_of_element(surfix, element.parentElement);
		};
	};

	var childSeq = 0;
	var childElement = element;
	var childCount = element.parentElement.childElementCount;
	while (childElement = childElement.previousSibling) {
		childSeq++;
	}
	if (childSeq > 0 && childCount > 1) {
		surfix = nodeName + ":nth-child(" + childSeq + ") " + (surfix == "" ? "" : " > " + surfix);
	} else {
		surfix = nodeName + (surfix == "" ? "" : " > " + surfix);
	}

	return get_css_selector_of_element(surfix, element.parentElement);
}

//Open Rule Set Panel Event Handler
//selected_element, selected_element.baseURI,这个在刷新后值为null
function rule_set_panel_open_eventhandler(event) {
	var modal = event.target;
	var dompath_input_element = modal.querySelector('#css_element_selector_string');
	var selected_element = document.body.querySelector('.xhighlight');
	// console.log("[调试] selected element dom path is ", 
	// 	selected_element.nodeName, selected_element.parentElement, 
	// 	selected_element.parentNode, selected_element.textContent, selected_element.id);
	dompath_input_element.innerHTML = get_css_selector_of_element("", selected_element);
	console.log("[调试] 被选择的DOM对象路径为", dompath_input_element.innerHTML);

}
//Close Rule Set Panel Event Handler
function rule_set_panel_close_eventhandler(event) {

}

function testconsole() {
	console.log("[看门狗] 狗叫了");
}

function crawler_dialog_select_change_handler(event) {
	var select_element = event.target;
	console.log("[调试] 用户选择了", select_element.value);
	if (select_element.value == 'vNewURL') {

		// var wrapper = document.body.querySelector('#div_new_article_url_wrapper');
		// wrapper.classList.add('xfadein-wrapper');
		var new_input_div = document.body.querySelector("#div_new_article_url");
		new_input_div.classList.add('xfadein');
		new_input_div.querySelector('input').value = window.location.href;
	} else {
		var new_input_div = document.body.querySelector("#div_new_article_url");
		new_input_div.classList.remove('xfadein');
		new_input_div.querySelector('input').value = '';
	}
}

function article_dom_info_handler(event) {

	var select_element = event.target;
	var element_name = null;
	var element_dom_path = "";
	if (select_element.value == "title") {
		element_name = chrome.i18n.getMessage("labelTargetTitle");
	};
	if (select_element.value == "content") {
		element_name = chrome.i18n.getMessage("labelContent");
	};
	if (select_element.value == "datetime") {
		element_name = chrome.i18n.getMessage("labelDateTime");
	};
	if (select_element.value == "author") {
		element_name = chrome.i18n.getMessage("labelAuthor");
	};
	var history_tips_element = document.body.querySelector('#history_tips');
	history_tips_element.innerHTML = element_name + chrome.i18n.getMessage("infoElementCurrentPath") + element_dom_path;
}

function load_rule_set_panel() {
	if (modal_loaded_flag == true) {
		console.log("[调试] rule panel已载入，不必重复载入");
		return;
	};
	console.log("[调试] 载入rule panel");
	$crawler_dialog = $crawler_dialog.appendTo('body');
	var dialog_element = $crawler_dialog.get(0);

	var select_element = dialog_element.querySelector('#crawler_site_article_url');
	var option_please_select = document.createElement("option");
	option_please_select.value = "vSelect";
	option_please_select.text = "请选择..."
	var option_new_url_element = document.createElement("option");
	option_new_url_element.value = "vNewURL";
	option_new_url_element.text = "新建URL";
	select_element.add(option_please_select, null);
	select_element.add(option_new_url_element, null);

	select_element.addEventListener("change", crawler_dialog_select_change_handler);

	var article_dom_info_element = dialog_element.querySelector('#article_element');
	article_dom_info_element.addEventListener("change", article_dom_info_handler);

	var history_tips_element = dialog_element.querySelector('#history_tips');
	history_tips_element.innerHTML = "";

	// bootstrap modal 设置监听事件用js api不生效，原因待查
	// dialog_element.addEventListener("shown.bs.modal", rule_set_panel_open_eventhandler);
	// dialog_element.addEventListener("hidden.bs.modal", rule_set_panel_close_eventhandler);
	// dialog_element.addEventListener("mouseover", testconsole);
	$crawler_dialog.on('shown.bs.modal', rule_set_panel_open_eventhandler);
	$crawler_dialog.on('hidden.bs.modal', rule_set_panel_close_eventhandler);
	modal_loaded_flag = true;
}

function unload_rule_set_panel() {
	if (modal_loaded_flag == false) {
		console.log("[调试] rule panel已卸载，不必重复卸载");
		return;
	};
	var dialog_element = $crawler_dialog.get(0);
	// dialog_element.removeEventListener("shown.bs.modal", rule_set_panel_open_eventhandler);  
	// dialog_element.removeEventListener("hidden.bs.modal", rule_set_panel_close_eventhandler); 
	$crawler_dialog.off('shown.bs.modal', rule_set_panel_open_eventhandler);
	$crawler_dialog.off('hidden.bs.modal', rule_set_panel_close_eventhandler);
	dialog_element.remove();
	modal_loaded_flag = false;
}

function view_rule_panel_open_eventhandler(event) {
	console.log("[调试] " + event.target + "被打开");
	var modal_div = event.target;
	var modal_body = modal_div.querySelector('.modal-body');
	// modal_body.innerHTML = "";
	var ul_node = document.createElement("ul");
	ul_node.style.textAlign = "left";
	var crawl_rule_keys = Object.keys(crawl_rule);
	for (var i = crawl_rule_keys.length - 1; i >= 0; i--) {
		var li_node = document.createElement("li");
		var li_content = crawl_rule_keys[i];
		li_node.textContent = li_content + ":" + crawl_rule[crawl_rule_keys[i]];
		ul_node.appendChild(li_node);
	};
	modal_body.appendChild(ul_node);

}

function view_rule_panel_close_eventhandler(event) {
	console.log("[调试] " + event.target + "被关闭");
	var modal_div = event.target;
	var modal_body = modal_div.querySelector('.modal-body');
	modal_body.innerHTML = "";
}

function load_rule_view_modal_panel() {

	if (view_modal_loaded_flag == true) {
		console.log("[调试] view rule panel已载入，不必重复载入");
		return;
	};
	$crawler_rule_view_modal = $crawler_rule_view_modal.appendTo('body');
	$crawler_rule_view_modal.on('shown.bs.modal', view_rule_panel_open_eventhandler);
	$crawler_rule_view_modal.on('hidden.bs.modal', view_rule_panel_close_eventhandler);
	view_modal_loaded_flag = true;
}

load_rule_view_modal_panel();


function view_capture_panel_open_eventhandler(event) {
	var modal_div = event.target;
	var modal_body = modal_div.querySelector('.modal-body');
	var dataUrl = modal_div.snapshotDataUrl;
	// console.log("[调试] 需要显示的图片url为", dataUrl);
	var img_element = document.createElement("img");

	img_element.width = window.innerWidth / 2;
	console.log("[调试] 截图图片元素显示，window width", img_element.width);

	img_element.onload = function() {
		// window.URL.revokeObjectURL(this.src);
	};
	img_element.src = dataUrl; //window.URL.createObjectURL(dataUrl);
	modal_body.appendChild(img_element);
}

function view_capture_panel_close_eventhandler(event) {
	console.log("[调试] " + event.target + "被关闭");
	var modal_div = event.target;
	var modal_body = modal_div.querySelector('.modal-body');
	modal_body.innerHTML = "";
}

function load_capture_view_modal_panel() {

	if (capture_view_modal_loaded_flag == true) {
		console.log("[调试] view capture panel已载入，不必重复载入");
		return;
	};
	$crawler_capture_view_modal = $crawler_capture_view_modal.appendTo('body');
	$crawler_capture_view_modal.on('shown.bs.modal', view_capture_panel_open_eventhandler);
	$crawler_capture_view_modal.on('hidden.bs.modal', view_capture_panel_close_eventhandler);
	capture_view_modal_loaded_flag = true;
}

load_capture_view_modal_panel();


// function unload_rule_view_modal_panel() {
// 	if (view_modal_loaded_flag == false) {
// 		console.log("[调试] view rule panel已卸载，不必重复卸载");
// 		return;
// 	};
// 	var view_modal_element = $crawler_rule_view_modal.get(0);
// 	$crawler_rule_view_modal.off('shown.bs.modal', view_rule_panel_open_eventhandler);
// 	$crawler_rule_view_modal.off('hidden.bs.modal', view_rule_panel_close_eventhandler);
// 	view_modal_element.remove();
// 	view_modal_loaded_flag = false;
// }

function open_rule_set_panel() {
	$crawler_dialog.modal();
}

function open_rule_view_panel() {
	$crawler_rule_view_modal.modal();
}

function copyAreaInit() {
	var copyAreaElement = document.createElement("div");
	copyAreaElement.id = "copy_area";
	document.body.appendChild(copyAreaElement);
}

copyAreaInit();

function copyDomPathBtnClickHandler(element_css_selector) {

	var copyAreaElement = document.body.querySelector("#copy_area");
	copyAreaElement.textContent = element_css_selector;

	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNode(copyAreaElement);
	selection.removeAllRanges();
	selection.addRange(range);
	// if (selection) {
	// 	console.log("[调试] 选中了", selection.rangeCount, "个range");
	// 	console.log("[调试] 选中了", selection.toString());
	// };
	// window.prompt("是不是这样");
	window.confirm(selection.toString() + "\n" + "DOM路径已选择，请使用Ctrl+C复制");

}

function copyDomHTMLBtnClickHandler(selected_element) {
	var copyAreaElement = document.body.querySelector("#copy_area");

	copyAreaElement.textContent = selected_element.outerHTML;

	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNode(copyAreaElement);
	selection.removeAllRanges();
	selection.addRange(range);
	// if (selection) {
	// 	console.log("[调试] 选中了", selection.rangeCount, "个range");
	// 	console.log("[调试] 选中了", selection.toString());
	// };
	// window.prompt("是不是这样");
	window.confirm(selection.toString() + "\n" + "DOM路径已选择，请使用Ctrl+C复制");
}

function copyDomContentBtnClickHandler(selected_element) {
	var copyAreaElement = document.body.querySelector("#copy_area");

	copyAreaElement.textContent = selected_element.textContent;

	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNode(copyAreaElement);
	selection.removeAllRanges();
	selection.addRange(range);
	// if (selection) {
	// 	console.log("[调试] 选中了", selection.rangeCount, "个range");
	// 	console.log("[调试] 选中了", selection.toString());
	// };
	// window.prompt("是不是这样");
	window.confirm(selection.toString() + "\n" + "DOM路径已选择，请使用Ctrl+C复制");
}

function screenSnapShot(dataUrl) {
	$crawler_capture_view_modal.get(0).snapshotDataUrl = dataUrl;
	$crawler_capture_view_modal.modal();
}

function selectedContentSnapShot() {
	selection = window.getSelection();
	range = selection.getRangeAt(0);

	startNode = range.startContainer.parentElement;
	var content_string = "";
	console.log("[调试] 选择range 1 ", range, " start Node ", startNode.outerHTML);
	// selection.getRangeAt(index)	
	var html_string_start =
		'<svg xmlns="http://www.w3.org/2000/svg" style="max-width:100%">' +
		'<foreignObject width="100%" height="100%">' +
		'<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px">';
	var html_string_end =
		'</div>' +
		'</foreignObject>' +
		'</svg>';
	nextNode = startNode;
	while (undefined != nextNode) {
		content_string += nextNode.outerHTML;
		if (nextNode.outerHTML == range.endContainer.parentElement.outerHTML) {
			console.log("[调试] 节点到最后了呢");
			break;
		};
		nextNode = nextNode.nextElementSibling;
	}
	content_string = content_string.replace(/&nbsp;/gi, "");
	console.log("[调试] 选取的HTML String 为", content_string);
	var html_svg = new Blob([html_string_start, content_string, html_string_end], {
		type: 'image/svg+xml;charset=utf-8'
	});
	var html_svg_url = window.URL.createObjectURL(html_svg);
	// var img_dom = new Image();
	// img_dom.style.width = "100%";

	// img_dom.onload = function(){
	// 	var canvas_dom = document.createElement("canvas");
	// 	canvas_dom.width = this.width;
	// 	canvas_dom.height = this.height;
	// 	var canvas_ctx = canvas_dom.getContext("2d");		
	// 	canvas_ctx.drawImage(img_dom,0,0, canvas_dom.width, canvas_dom.height);
	// 	window.URL.revokeObjectURL(html_svg_url);
	// 	console.log("[调试] canvas_dom url, ", canvas_dom.toDataURL("image/png"));
	$crawler_capture_view_modal.get(0).snapshotDataUrl = html_svg_url; //canvas_dom.toDataURL("image/png");
	$crawler_capture_view_modal.modal();
	// 	document.body.appendChild(canvas_dom);
	// };
	// img_dom.src = html_svg_url;	
	// console.log("[调试] img dom ", img_dom);
	// document.body.appendChild(img_dom);
}

function pageSnapShot_html2canvas() {
	html2canvas(document.body.querySelector("" + crawl_rule.content + ""), {
		onrendered: function(canvas) {
			// document.body.appendChild(canvas);
			var dataUrl = canvas.toDataURL();
			screenSnapShot(dataUrl);
		}
	});
}

var snapshot_page = {
	numberic: 0,
	snapshoting: false,
	canvas: null,
	sHeight: 0,
	sWidth: 0,
	currentX: 0,
	currentY: 0,
	tHeight: 0,
	tWidth: 0,
	jitterHeight: 0,
	images: null,
	msg_snapshot_info: null,
	init: function() {

		this.numberic = 0;
		this.snapshoting = true;
		this.tHeight = document.body.scrollHeight;
		this.tWidth = document.body.scrollWidth;
		this.sHeight = window.innerHeight;
		this.sWidth = window.innerWidth;
		this.currentX = 0;
		this.currentY = 0;
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.tWidth;
		this.canvas.height = this.tHeight;
		this.images = [];
		this.msg_snapshot_info = null;
		console.log("[调试] snapshot detail ", this);
	}
};

// function pageSnapShot_scroll(){
// 	console.log("[调试] 窗口大小：高", window.innerHeight, "宽：", window.innerWidth);
// 	console.log("[调试] 文档大小：高", document.body.scrollHeight, "宽：", document.body.scrollWidth);
// 	snapshot_page.init();
// 	window.scrollTo(0,0);
// }

// window.onscroll = function(event) {
// 	console.log("[调试] window捕获到scroll事件", event);
// 	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
// 	console.log("[调试] window滚动距离", scrolltop);
// 	if (snapshot_page.snapshoting == true) {
// 		console.log("[调试] window滚动到", window.scrollY, "完成的时间", new Date().getTime());
// 		console.log("[调试]", "-s11-", "crawler向background发送下一屏", snapshot_page.currentY, "截屏消息", snapshot_page.msg_snapshot_info);
// 		sleepSomeTime(1500);
// 		chrome.runtime.sendMessage(snapshot_page.msg_snapshot_info, function(response) {
// 			console.log("[消息]", "-s12-", "target接收到确认消息", response);
// 		});
// 	};

// }

window.onscroll = function(event) {
	// console.log("[调试] window捕获到scroll事件", event);
	var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
	console.log("[调试] window滚动距离", scrolltop);
	console.log("[调试] window滚动到", window.scrollY, "完成的时间", new Date().getTime());
}

// document.documentElement.onscroll = function(event){
// 	console.log("[调试] html捕获到scroll事件", event);
// 	if (snapshot_page.snapshoting == true) {
// 		console.log("[调试] html滚动到", window.scrollY, "完成的时间", new Date().getTime());
// 		console.log("[调试]", "-s11-", "crawler向background发送下一屏", snapshot_page.currentY ,"截屏消息", snapshot_page.msg_snapshot_info);
// 		chrome.runtime.sendMessage( snapshot_page.msg_snapshot_info, function(response) {
// 			console.log("[消息]", "-s12-", "target接收到确认消息", response);

// 		});			
// 	};	
// }

// document.body.onscroll = function(event){
// 	// console.log("[调试] body捕获到scroll事件", event);
// 	if (snapshot_page.snapshoting == true) {
// 		console.log("[调试] body滚动到", window.scrollY, "完成的时间", new Date().getTime());
// 		// console.log("[调试]", "-s11-", "crawler向background发送下一屏", snapshot_page.currentY ,"截屏消息", snapshot_page.msg_snapshot_info);
// 		// chrome.runtime.sendMessage( snapshot_page.msg_snapshot_info, function(response) {
// 		// 	console.log("[消息]", "-s12-", "target接收到确认消息", response);

// 		// });			
// 	};	
// }

// function sleepSomeTime(millisecond) {
// 	var start = new Date().getTime();
// 	var end = new Date().getTime();
// 	do {

// 		end = new Date().getTime();
// 	} while ((end - start) < millisecond);

// }


// 下载所有图片

var image_download_button_html = '' +
	'<!-- Button trigger modal -->' +
	'<button id="image_download_status_btn" type="button" class="btn btn-primary btn-lg" style="display:none;" data-toggle="modal" data-target="#image_download_modal">' +
	'下载所有图片' +
	'</button>';

var image_download_modal_html = '' +
	'<div class="modal fade"  id="image_download_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
	'<div class="modal-dialog">' +
	'<div class="modal-content">' +
	'<div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'<h4 class="modal-title">' + chrome.i18n.getMessage("infoDownloadImagesPanelTitle") + '</h4>' +
	'</div>' +
	'<div class="modal-body">' +
	'<div>' +
	'<div style="text-align:right">' +
	'<button class="btn btn-primary btn-sm " id="modal_images_download_btn">' + chrome.i18n.getMessage("btnDownloadBtn") + '</button>&nbsp;' +
	'</div>' +
	'<ul><li class="divider"></li></ul>' +
	'<div id="progress_group"></div>' +
	'</div>' +
	'<div id="images_download_info_panel"><input id="img_select_all_or_not" type="checkbox">' + chrome.i18n.getMessage("infoSelectNotAll") + '</input></div>' +
	'</div>' +
	'<div class="modal-footer">' +
	'<button type="button" class="btn btn-default" data-dismiss="modal">' + chrome.i18n.getMessage("btnCloseBtn") + '</button>' +
	'</div>' +
	'</div><!-- /.modal-content -->' +
	'</div><!-- /.modal-dialog -->' +
	'</div><!-- /.modal -->';

function image_download_modal_init() {
	$('body').append(image_download_button_html);
	$('body').append(image_download_modal_html);
}
image_download_modal_init();

function get_image_list(dom_wrapper) {
	console.log("[调试] -----------------------------开始搜索图片-------------------------------");
	var img_src_array = [];
	$(dom_wrapper).find('img').each(function(index, el) {
		console.log(el.src);
		img_src_array.push(el.src);
	});
	return img_src_array;

	console.log("[调试] -----------------------------结束搜索图片-------------------------------");
}

function get_image_list_in_body() {
	console.log("[调试] -----------------------------开始搜索图片-------------------------------");
	var img_src_array = [];
	$('body').find('img').each(function(index, el) {
		// console.log(el.src);
		img_src_array.push(el.src);
	});
	return img_src_array;

	console.log("[调试] -----------------------------结束搜索图片-------------------------------");
}

function image_download_css_inject() {
	var file_upload_css =
		'<style type="text/css">' +
		'#images_download_info_panel ul {' +
		'padding-left: 0;' +
		'list-style: none;}' +
		'#images_download_info_panel li {' +
		'width: 25%;' +
		'font-size: 12px;' +
		// 'float: left;' +
		// 'width: 25%;' +
		'height: 135px;' +
		'padding: 10px;' +
		'display: inline-block;' +
		// 'font-size: 10px;' +
		'line-height: 1.4;' +
		'text-align: center;' +
		'background-color: #f9f9f9;' +
		'border: 1px solid #fff;}' +
		'#images_download_info_panel li div {' +
		'width:100%;height:90px;border:solid gray 1px;overflow:hidden; margin-bottom:5px;padding:2px;}' +
		'#images_download_info_panel li img' +
		'{width:100%;' +
		'' +
		'}' +
		'</style>';
	$('head').append(file_upload_css);
}
image_download_css_inject();

function clear_node_children(node) {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

var download_panel_load_images_flag = false;

function download_panel_load_images(image_list) {

	var dom_element_ul = document.createElement('ul');

	for (var i = image_list.length - 1; i >= 0; i--) {
		var dom_element_ul_li = document.createElement('li');
		var dom_element_ul_li_div = document.createElement('div');
		var dom_element_ul_li_div_img = document.createElement('img');
		var dom_element_ul_li_input = document.createElement('input');
		dom_element_ul_li_div_img.src = image_list[i];
		dom_element_ul_li_input.type = 'checkbox';
		// dom_element_ul_li_input.checked = true;
		dom_element_ul_li_input.className = 'single_checkbox';
		dom_element_ul_li_div.appendChild(dom_element_ul_li_div_img);
		dom_element_ul_li.appendChild(dom_element_ul_li_div);
		dom_element_ul_li.appendChild(dom_element_ul_li_input);
		dom_element_ul.appendChild(dom_element_ul_li);		
	};
	var container = document.body.querySelector("div#images_download_info_panel");
	container.appendChild(dom_element_ul);
	download_panel_load_images_flag = true;
}

function download_panel_handler_init(){
	var container = document.body.querySelector("div#images_download_info_panel");
	var select_all_btn = document.body.querySelector("#img_select_all_or_not");
	select_all_btn.addEventListener("click", function(event){
		var btn = event.target;
		// console.log("[调试] 复选框状态", btn.checked);
		
		var img_select_btns = container.querySelectorAll("input[type=checkbox]");	

		// var img_select_btns = container.querySelectorAll("input[type=checkbox]:checked");	
		// console.log("[调试] 图片复选框",img_select_btns);	
		for (var i = img_select_btns.length - 1; i >= 0; i--) {
			if (btn.checked) {
				img_select_btns[i].checked = true;
			}else{
				img_select_btns[i].checked = false;
			}
			
		};
	});

	var download_selected_image_btn = document.body.querySelector("#modal_images_download_btn");
	download_selected_image_btn.addEventListener("click", function(event){
		var img_select_btns = container.querySelectorAll("input[type=checkbox]:checked");
		var img_urls = [];
		for (var i = img_select_btns.length - 1; i >= 0; i--) {
			console.log("[调试] img_select_btns", img_select_btns[i].previousSibling.nodeName.toLowerCase());
			if( undefined != img_select_btns[i].previousSibling && 'div' == img_select_btns[i].previousSibling.nodeName.toLowerCase()){
				var img = img_select_btns[i].previousSibling.querySelector("img");
				img_urls.push(img.src);
			}
		};
		var msg_download_info = {};
		msg_download_info.type = "Download.images";
		msg_download_info.data = img_urls;
		chrome.runtime.sendMessage(msg_download_info, function(response) {
			console.log("[消息]", "-d2-", "crawler接收到确认消息", response);
		});

	});

}

download_panel_handler_init();

// 下载所有视频

//监听消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

	if (message.type == "Crawl.Req") {

		console.log("[消息]", "-7-", "crawler接收到抓取页面的请求消息", message.type);
		var crawl_info = {};
		crawl_info.title = $(crawl_rule.title).html();
		crawl_info.content = $(crawl_rule.content).html();
		crawl_info.source = window.location.href;
		crawl_info.sourceUrl = window.location.href;
		crawl_info.adate = $(crawl_rule.time).html();
		crawl_info.status = "ok";


		var msg_crawl_info = {};
		msg_crawl_info.type = "Crawl.Result";
		msg_crawl_info.data = crawl_info;

		sendResponse(msg_crawl_info);
		console.log("[消息]", "-8-", "crawler向runtime回复抓取信息", msg_crawl_info);
	}

	if (message.type == "Crawler.DomSelectorEnabled") {
		console.log("[消息]", "-z7-", "crawler接收到DomSelectorEnabled的请求消息", message.type);
		enable_entity_dom_selector();
		load_rule_set_panel();
	};

	if (message.type == "Crawler.DomSelectorDisabled") {
		console.log("[消息]", "-z7-", "crawler接收到DomSelectorDisabled的请求消息", message.type);
		disable_entity_dom_selector();
		unload_rule_set_panel();
	};

	if (message.type == "Crawler.RuleSetPanelOpen") {
		console.log("[消息]", "-z7-", "crawler接收到RuleSetPanelOpen的请求消息", message.type);
		open_rule_set_panel();
	};

	if (message.type == "Crawler.CopyDOMPathBtnClicked") {
		console.log("[消息]", "-z7-", "crawler接收到CopyDOMPathBtnClicked的请求消息", message.type);
		var selected_element = document.body.querySelector('.xhighlight');
		var element_css_selector = get_css_selector_of_element("", selected_element);
		copyDomPathBtnClickHandler(element_css_selector);
	};

	if (message.type == "Crawler.CopyElementBtnClicked") {
		console.log("[消息]", "-z7-", "crawler接收到CopyElementBtnClicked的请求消息", message.type);
		var selected_element = document.body.querySelector('.xhighlight');
		// var element_css_selector = get_css_selector_of_element("", selected_element);		
		copyDomHTMLBtnClickHandler(selected_element);
	};

	if (message.type == "Crawler.CopyTextBtnClicked") {
		console.log("[消息]", "-z7-", "crawler接收到CopyTextBtnClicked的请求消息", message.type);
		var selected_element = document.body.querySelector('.xhighlight');
		// var element_css_selector = get_css_selector_of_element("", selected_element);		
		copyDomContentBtnClickHandler(selected_element);
	};

	if (message.type == "Crawler.ViewThisCrawlerRule") {
		console.log("[消息]", "-z7-", "crawler接收到ViewThisCrawlerRule的请求消息", message.type);
		open_rule_view_panel();
	};
	if (message.type == "Crawler.DownloadAllImages") {
		console.log("[消息]", "-z7-", "crawler接收到DownloadAllImages的请求消息", message.type);
		if ( download_panel_load_images_flag == false ) {
			download_panel_load_images(get_image_list_in_body());
		};		

		var img_btn = document.body.querySelector("#image_download_status_btn");
		if (img_btn != undefined) {
			img_btn.click();
		};
	};
	if (message.type == "Crawler.DownloadAllVideos") {
		console.log("[消息]", "-z7-", "crawler接收到DownloadAllVideos的请求消息", message.type);

	};
	if (message.type == "Crawler.ProcessImage") {
		console.log("[消息]", "-z7-", "crawler接收到ProcessImage的请求消息", message.type);

	};
	if (message.type == "Crawler.ScreenSnapshot") {
		console.log("[消息]", "-z7-", "crawler接收到ScreenSnapshot的请求消息", message.type);
		screenSnapShot(message.data.dataUrl);
	};
	if (message.type == "Crawler.SelectedContentSnapshot") {
		console.log("[消息]", "-z7-", "crawler接收到SelectedContentSnapshot的请求消息", message.type);
		selectedContentSnapShot();

	};
	if (message.type == "Crawler.PageContentSnapshot") {
		console.log("[消息]", "-s2-", "crawler接收到PageContentSnapshot的请求消息", message.type);
		// pageSnapShot_html2canvas();
		// pageSnapShot_scroll();
		snapshot_page.init();
		// 确认了，scroll是异步的，-_-
		// console.log("[调试] scroll 前");
		window.scrollTo(0, 0);
		// console.log("[调试] scroll 后");
		var msg_snapshot_info = {};
		msg_snapshot_info.type = "Snapshot.next";
		msg_snapshot_info.data = {
			"currentY": snapshot_page.currentY
		};
		console.log("[调试]", "-s3-", "crawler向background回复PageContentSnapshot确认消息");
		sendResponse(msg_snapshot_info);
		console.log("[调试]", "-s5-", "crawler向background发送下一屏", snapshot_page.currentY, "截屏消息", msg_snapshot_info);
		chrome.runtime.sendMessage(msg_snapshot_info, function(response) {
			console.log("[消息]", "-s2-", "target接收到确认消息", response);
		});

	};
	// if (message.type == "Snapshot.inited") {
	// 	snapshot_page.init();
	// 	window.scrollTo(0,0);
	// 	var msg_snapshot_info = {};
	// 	msg_snapshot_info.type = "Snapshot.next";
	// 	msg_snapshot_info.data = null;

	// 	sendResponse(msg_snapshot_info);		

	// };
	if (message.type == "Snapshot.nexted") {
		console.log("[消息]", "-s8-", "crawler接收到Snapshot的nexted完成消息", message.type);
		console.log("[调试] canvas要写入currentY", message.data.currentY);
		console.log("[调试] window实际scroll的位置", window.scrollY);
		// snapshot_page.images.push(message.data.dataUrl);
		var image = new Image();
		image.onload = function(event) {
			var ctx = snapshot_page.canvas.getContext("2d");
			console.log("[调试] canvas绘制", snapshot_page.currentY, "的开始时间", new Date().getTime());
			ctx.drawImage(image, snapshot_page.currentX, snapshot_page.currentY);
			console.log("[调试] canvas绘制", snapshot_page.currentY, "的完成时间", new Date().getTime());

			var breakpoint = snapshot_page.currentY + 2 * snapshot_page.sHeight;
			if (snapshot_page.tHeight < breakpoint) {
				console.log("[调试] 超过临界了，该翻最后一页了", breakpoint);
				var tscrollY = snapshot_page.tHeight - snapshot_page.sHeight;
				console.log("[调试] window滚动到", tscrollY, "的开始时间", new Date().getTime());
				window.scrollTo(snapshot_page.currentX, tscrollY);
				console.log("[调试] window执行完scrollTo", tscrollY, "的完成时间", new Date().getTime());
				console.log("[调试] window执行完scrollTo后的window.scrollY", window.scrollY);

				snapshot_page.jitterHeight = snapshot_page.tHeight - snapshot_page.currentY - snapshot_page.sHeight;
				snapshot_page.currentY = tscrollY;

				var msg_snapshot_info = {};
				msg_snapshot_info.type = "Snapshot.last";
				// msg_snapshot_info.data = null;
			} else {
				var tscrollY = snapshot_page.currentY + snapshot_page.sHeight;
				console.log("[调试] window滚动到", tscrollY, "的开始时间", new Date().getTime());
				window.scrollTo(snapshot_page.currentX, tscrollY);
				console.log("[调试] window执行完scrollTo", tscrollY, "的完成时间", new Date().getTime());

				snapshot_page.currentY = tscrollY;

				var msg_snapshot_info = {};
				msg_snapshot_info.type = "Snapshot.next";
				// msg_snapshot_info.data = null;
			}
			msg_snapshot_info.data = {
				"currentY": snapshot_page.currentY
			};
			snapshot_page.msg_snapshot_info = msg_snapshot_info;
			console.log("[调试]", "-s9-", "crawler向background回复nexted确认消息");
			sendResponse(msg_snapshot_info);
			console.log("[调试]", "-s11-", "crawler向background发送下一屏", snapshot_page.currentY, "截屏消息", snapshot_page.msg_snapshot_info);
			// sleepSomeTime(1500);
			chrome.runtime.sendMessage(snapshot_page.msg_snapshot_info, function(response) {
				console.log("[消息]", "-s12-", "target接收到确认消息", response);
			});
		};
		image.src = message.data.dataUrl;
	};
	if (message.type == "Snapshot.finished") {
		snapshot_page.snapshoting = false;
		console.log("[消息]", "-s15-", "crawler接收到Snapshot的finished完成消息", message.type);
		var image = new Image();
		window.scrollTo(0, 0);
		image.onload = function(event) {
			var ctx = snapshot_page.canvas.getContext("2d");
			ctx.drawImage(image,
				snapshot_page.currentX, snapshot_page.tHeight - snapshot_page.jitterHeight, snapshot_page.sWidth, snapshot_page.sHeight,
				0, snapshot_page.sHeight - snapshot_page.jitterHeight, snapshot_page.sWidth, snapshot_page.jitterHeight);

			screenSnapShot(snapshot_page.canvas.toDataURL());

		};
		image.src = message.data.dataUrl;

		var msg_snapshot_info = {};
		msg_snapshot_info.type = "Snapshot.close";
		msg_snapshot_info.data = null;
		console.log("[调试]", "-s16-", "crawler向background发送结束截屏消息");
		sendResponse(msg_snapshot_info);
		// console.log("[调试] images ", snapshot_page.images);
	};



});