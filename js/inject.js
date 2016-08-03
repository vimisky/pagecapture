console.log("[调试] 目标页已加载inject.js");
console.log("[调试] 传递过来的目标模板规则", tgt_rule);

var file_upload_button_html = '' +
	'<!-- Button trigger modal -->' +
	'<button id="file_upload_status_btn" type="button" class="btn btn-primary btn-lg" style="display:none;" data-toggle="modal" data-target="#myModal">' +
	'Launch demo modal' +
	'</button>';

var file_upload_modal_html = '' +
	'<div class="modal fade"  id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
	'<div class="modal-dialog">' +
	'<div class="modal-content">' +
	'<div class="modal-header">' +
	'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
	'<h4 class="modal-title">'+chrome.i18n.getMessage("infoUploadImagesPanelTitle")+'</h4>' +
	'</div>' +
	'<div class="modal-body">' +
	'<div><div style="text-align:right"><button class="btn btn-primary btn-sm images_upload_btn">'+chrome.i18n.getMessage("btnUploadBtn")+'</button>&nbsp;' +
	'<button class="btn btn-warning btn-sm images_replace_local_btn">'+chrome.i18n.getMessage("btnReplaceBtn")+'</button></div>' +
	'<ul><li class="divider"></li></ul>' +
	'<div id="progress_group"></div>' +
	// '<div>' +
	// '<span>图片上传进度</span>' +
	// '<div class="progress">' +
	// '<div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width:20%">' +
	// '20% </div>' +
	// '</div>' +
	// '</div>' +
	'</div>' +
	'<div id="upload_debug_info"><input id="img_select_all_or_not" type="checkbox">'+chrome.i18n.getMessage("infoSelectNotAll")+'</input></div>' +
	'</div>' +
	'<div class="modal-footer">' +
	'<button type="button" class="btn btn-default" data-dismiss="modal">'+chrome.i18n.getMessage("btnCloseBtn")+'</button>' +
	'</div>' +
	'</div><!-- /.modal-content -->' +
	'</div><!-- /.modal-dialog -->' +
	'</div><!-- /.modal -->';

// var file_upload_css = 
// '<style type="text/css">#lean_overlay {' +
//     'position: fixed;' +
//     'z-index:15100;' +
//     'top: 0px;' +
//     'left: 0px;' +
//     'height:100%;' +
//     'width:100%;' +
//     'background: #000;' +
//     'display: none}</style>';

// var file_upload_button_html = '<a id="upload_status_modal_btn" ref="leanModal" href="#heheh">查看</a>';
// var file_upload_modal_html = '<div id="heheh" style="display:none ; background:#FFF; "><p>我靠，模态框来一个</p></div>';
// $('head').append(file_upload_css);
$('body').append(file_upload_button_html);
$('body').append(file_upload_modal_html);

var upload_image_panel_status = false;

$('#myModal').on('show.bs.modal', function(e) {
	upload_image_panel_status = true;
});
$('#myModal').on('hide.bs.modal', function(e) {
	upload_image_panel_status = false;
});

//即使其它的input的还没加载完，也可以对其起作用
$('input#img_select_all_or_not').change(function(event) {
	/* Act on the event */
	console.log(this.checked);
	if (this.checked) {

		var checkbox_list = document.querySelectorAll('input.single_checkbox');
		// console.log("dog", checkbox_list);
		for (var i = checkbox_list.length - 1; i >= 0; i--) {
			checkbox_list[i].checked = true;
		};

	} else {
		var checkbox_list = document.querySelectorAll('input.single_checkbox');
		for (var i = checkbox_list.length - 1; i >= 0; i--) {
			checkbox_list[i].checked = false;
		};
	}
});

function send_image_req_msg(image_src_array) {

	var crawler_msg_req = {};
	crawler_msg_req.type = "Crawl.ImagesReq";
	crawler_msg_req.data = image_src_array;
	console.log("[消息]", "-x1-", "target发出抓取图片请求");
	chrome.runtime.sendMessage(crawler_msg_req, function(response) {
		console.log("[消息]", "-x4-", "target接收到确认消息", response);

	});

}

$('button.images_upload_btn').click(function(event) {
	/* Act on the event */
	// var checkbox_list = document.querySelectorAll('input.single_checkbox[checked = true]');
	var $checked_list = $('input.single_checkbox:checked').siblings('div').find('img');
	console.log("[调试] 共选择以下图片需要转存本地", $checked_list.toArray());
	var image_src_array = [];
	$checked_list.each(function(index, el) {
		image_src_array.push(el.src);
	});

	send_image_req_msg(image_src_array);
});


function convertURLToRegExp(normal_url) {
	return normal_url.replace(/\./g, "\\.");
}

$('button.images_replace_local_btn').click(function(event) {
	/* Act on the event */
	console.log("[调试] 替换为本网站的图片地址");
	var hehe = get_current_content();
	console.log("[调试] 替换前", hehe);
	$('div#myModal img').each(function(index, el) {
		if ($(el).data('imgstatus') == "remote") {
			var local_url = $(el).data('local_url');
			var remote_url = $(el).data('origin_url');
			if (local_url != null) {
				$(el).attr('src', local_url);
				$(el).data('imgstatus', "local");
				var regexp_exp = convertURLToRegExp(remote_url);
				console.log("[调试] img src正则表达式转义后的exp为", regexp_exp);
				var regexp = new RegExp(regexp_exp, "g");
				hehe = hehe.replace(regexp, local_url);

				console.log("[调试] 正文中匹配img src的字符串为", hehe.match(regexp));
			};

		}
	});

	set_content(hehe);

});

function get_image_list(content) {
	console.log("[调试] -----------------------------开始搜索图片-------------------------------");
	var img_src_array = [];
	$(content).find('img').each(function(index, el) {
		console.log(el.src);
		img_src_array.push(el.src);
	});
	return img_src_array;

	console.log("[调试] -----------------------------结束搜索图片-------------------------------");
}

function display_image_list(image_list) {

	var file_upload_css =
		'<style type="text/css">' +
		'#upload_debug_info ul {' +
		'padding-left: 0;' +
		'list-style: none;}' +
		'#upload_debug_info li {' +
		'width: 25%;' +
		'font-size: 12px;' +
		'float: left;' +
		// 'width: 25%;' +
		'height: 115px;' +
		'padding: 10px;' +
		// 'font-size: 10px;' +
		'line-height: 1.4;' +
		'text-align: center;' +
		'background-color: #f9f9f9;' +
		'border: 1px solid #fff;}' +
		'#upload_debug_info li div {' +
		'width:100%;height:90px;border:solid gray 1px;overflow:hidden; margin-bottom:5px;padding:2px;}' +
		'#upload_debug_info li img' +
		'{width:100%;' +
		'' +
		'}' +
		'</style>';
	$('head').append(file_upload_css);
	var dom_element_ul = document.createElement('ul');

	$.each(image_list, function(index, val) {
		/* iterate through array or object */
		var dom_element_ul_li = document.createElement('li');
		var dom_element_ul_li_div = document.createElement('div');
		var dom_element_ul_li_div_img = document.createElement('img');
		var dom_element_ul_li_input = document.createElement('input');
		dom_element_ul_li_div_img.src = val;
		dom_element_ul_li_input.type = 'checkbox';
		dom_element_ul_li_input.className = 'single_checkbox';
		dom_element_ul_li_div.appendChild(dom_element_ul_li_div_img);
		dom_element_ul_li.appendChild(dom_element_ul_li_div);
		dom_element_ul_li.appendChild(dom_element_ul_li_input);
		dom_element_ul.appendChild(dom_element_ul_li);
	});
	$('div#upload_debug_info').append(dom_element_ul);
	// $('div#upload_debug_info').append("<br/>");



}

function testdoc() {
	console.log($(document));
}

testdoc();

function get_wpnonce() {
	console.log("[调试] -----------------------------开始搜索脚本，查找_wpnonce-----------------------------");
	var _wpnonce_ = null;
	$('script').each(function(index, el) {
		// console.log(el.innerHTML);
		// var Regex = new Regexp("_wpnonce":"7b3ca6d0b8");
		//处理这里的时候，全是字符串处理，去掉双引号
		var matched_string_obj = el.innerHTML.match(/"_wpnonce":"\S+?"/);
		if (null != matched_string_obj) {
			var matched_string = matched_string_obj[0];
			var matched_string_split_array = matched_string.split(':', 2);
			_wpnonce_ = matched_string_split_array[1].replace(/\"/g, '');
			console.log("[调试] 已发现_wpnonce", _wpnonce_);
		};
	});
	console.log("-----------------------------结束搜索脚本，查找_wpnonce-----------------------------");
	return _wpnonce_;

}

var _wpnonce_searched = get_wpnonce();

function get_post_id() {
	console.log("[调试] -----------------------------开始搜索脚本，查找_post_id-----------------------------");
	var _post_id_ = null;
	$('script').each(function(index, el) {
		// console.log(el.innerHTML);
		// var Regex = new Regexp("_wpnonce":"7b3ca6d0b8");
		//处理这里的时候，全是字符串处理，去掉双引号
		var to_search_string = el.innerHTML;
		var regrex = /_wpMediaViewsL10n.*?"post".*?"id":(\d+?),.*?};/;
		var result = regrex.exec(to_search_string);
		if (null != result) {
			_post_id_ = result[1];
			console.log("[调试] 已发现_post_id", _post_id_);
		};

	});
	console.log("-----------------------------结束搜索脚本，查找_post_id-----------------------------");
	return _post_id_;

}

var _post_id = get_post_id();



// get_img_file('http://dev.cloudxinhua.com:8022/wordpress/wp-content/uploads/2016/01/icon19x19.png');

function monitor_upload_process(event) {
	if (event.lengthComputable) {
		console.log("[XHR监测] " + event.target.xoriginurl + "/" + event.target.xtag + "上传了", event.loaded, "/", event.total);
		var progress_value = 100 * event.loaded / event.total;
		$('div#' + event.target.xtag + '').find('div.progress-bar').attr('aria-valuenow', '' + progress_value + '').css('width', progress_value + '%').html(progress_value + '%');

	} else {
		console.log("[XHR调试] 无法获取源文件大小");
	}

}

function transfer_complete(event) {
	console.log("[XHR调试] 上传完成");
	if (JSON.parse(event.target.response).success) {
		var url_to_hidden = event.target.xoriginurl;
		// $('input.single_checkbox:checked').siblings('div').find('img')
		$img_node = $('div#myModal img[src="' + url_to_hidden + '"]').data('origin_url', url_to_hidden).data('local_url', JSON.parse(event.target.response).data.url).data('imgstatus', 'remote');
		$img_div = $img_node.parent('div');
		$img_div.siblings('input').remove();
		$img_div.after('<span class="upload_tips">'+chrome.i18n.getMessage("infoUploadComplete")+'</span>');

	};

}

function transfer_error(event) {
	console.log("[XHR调试] 上传失败");
	var url_to_hidden = event.target.xoriginurl;
	// $('input.single_checkbox:checked').siblings('div').find('img')
	$img_node = $('img[src="' + url_to_hidden + '"]');
	$img_div = $img_node.parent('div');
	$img_div.siblings('input').after('<span class="upload_tips">'+chrome.i18n.getMessage("infoUploadFailure")+'</span>');
}

function transfer_abort(event) {
	console.log("[XHR调试] 上传被用户中止");
}

function dataurl_to_Blob(data) {
	console.log("imagedata 长度为", data.imagedata.length);
	var byteString = atob(data.imagedata);
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	console.log("ia 长度为", ia.size, ia);
	var blob = new Blob([ia], {
		type: data.imagetype
	});
	return blob;
}

function dataURLtoBlob(dataURL) {
	var byteString = atob(dataURL.split(',')[1]),
		mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	var blob = new Blob([ia], {
		type: mimeString
	});
	return blob;
}


function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

function get_upload_img_url(url_new_post) {
	console.log("[debug] heh ", url_new_post);
	var now_url = url_new_post;
	var url_matched = now_url.match(/.+\//g);
	// console.log("[调试] 匹配的字符串为", url_matched);
	return url_matched + "async-upload.php";
}

function upload_file(data) {

	console.log("[调试] 要上传的文件为", data);

	var file = dataurl_to_Blob(data);

	console.log("[调试] 转换为Blob为", file);

	var formdata = new FormData();
	var name = '',
		action = 'upload-attachment',
		post_id = _post_id,
		_wpnonce = _wpnonce_searched;
	if (_wpnonce == null) {
		console.log("[调试] 未获得授权，找不到_wpnonce");
		return;
	};
	var filename = uuid();
	var filename_complete = filename + "." + data.imagetype.split("/")[1];
	formdata.append('name', name);
	formdata.append('action', action);
	formdata.append('post_id', post_id);
	formdata.append('_wpnonce', _wpnonce);
	formdata.append('async-upload', file, filename_complete);
	// formdata.append('async-upload', file);

	var txhr = new XMLHttpRequest(),
		method = 'POST',
		url = get_upload_img_url(window.location.href),
		is_async = true,
		username = '',
		password = '';

	txhr.open(method, url, is_async);
	//设置http request header
	//void setRequestHeader(DOMString header, DOMString value);
	// txhr.responseType = '';
	//  "" <--> DOMString, "blob" <--> Blob, "arraybuffer" <--> ArrayBuffer, "json" <--> JavaScript Object, "text" <--> DOMString
	txhr.onreadystatechange = function(event) {
		//readyState
		//UNSENT, OPENED, HEADERS_RECEIVED, LOADING, DONE
		if (txhr.readyState == XMLHttpRequest.DONE) {
			//status
			// $('div#upload_debug_info').append("xhr状态：" + txhr.status + "<br/>");
			// $('div#upload_debug_info').append("xhr状态：" + eval("'" + txhr.responseText + "'") + "<br/>");
			var resJson = JSON.parse(txhr.responseText);
			if (false == resJson.success) {
				console.log("[调试] " + resJson.data.filename + "上传失败：", resJson.data.message);
				var url_to_hidden = event.target.xoriginurl;
				// $('input.single_checkbox:checked').siblings('div').find('img')
				$img_node = $('img[src="' + url_to_hidden + '"]');
				$img_div = $img_node.parent('div');
				var dom_d = '<a  class="upload_tips" href="javascript:void(0)" role="button" data-toggle="popover" ' +
					'title="'+chrome.i18n.getMessage("infoUploadFailure")+'" data-content="' +
					'' + resJson.data.message + '">' +
					chrome.i18n.getMessage("infoUploadFailure")+'</a>';
				$img_div.siblings('.upload_tips').remove();
				$img_div.siblings('input').after(dom_d);
				$('[data-toggle="popover"]').popover();
			};

		};
	};
	txhr.addEventListener("progress", monitor_upload_process);
	txhr.addEventListener("load", transfer_complete);
	txhr.addEventListener("error", transfer_error);
	txhr.addEventListener("abort", transfer_abort);
	txhr.xtag = filename;
	txhr.xoriginurl = data.imageoriginurl;

	var progress_div = '' +
		'<div ' + 'id="' + filename + '"' + '>' +
		'<span>' + filename_complete + chrome.i18n.getMessage("infoUploadProgress") +'</span>' +
		'<div class="progress">' +
		'<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width:0%">' +
		'0% </div>' +
		'</div>' +
		'</div>';
	$('div#progress_group').append(progress_div);
	txhr.send(formdata);
}

function set_title(otitle) {
	$(tgt_rule.title).val(otitle);
	$(tgt_rule.title).change();
	$(tgt_rule.title).click();
	$(tgt_rule.label).click();
}

function set_content(ocontent) {
	// console.log("[调试] 正文文本内容为",ocontent);
	$(tgt_rule.content).html(ocontent);
	$(tgt_rule.content).focus();
	$(tgt_rule.content).change();
	$(tgt_rule.content).click();
	// console.log($("iframe#content_ifr").get(0).contentDocument.getElementById("tinymce"));
	// if ( $("div#wp-content-editor-container iframe#content_ifr").get(0).contentDocument ) {
	// 	$("div#wp-content-editor-container iframe#content_ifr").get(0).contentDocument.getElementById("tinymce").innerHTML = ocontent;
	// };
	// jQuery对象有值
	console.log($("div.mce-container"));
	if ($("div.mce-container").length > 0) {
		$("div#wp-content-editor-container iframe#content_ifr").get(0).contentDocument.getElementById("tinymce").innerHTML = ocontent;
	};
}

function get_current_content() {
	var current_content = null;
	if ($("div.mce-container").length > 0) {
		current_content = $("iframe#content_ifr").get(0).contentDocument.getElementById("tinymce").innerHTML;
	};
	if (null == current_content) {
		current_content = $(tgt_rule.content).val();
	};
	return current_content;
}

//监听消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

	if (message.type == "Crawl.Result") {
		console.log("[消息]", "-11-", "target接收到注入请求的消息", message);
		set_title(message.data.title);
		set_content(message.data.content);

		var img_list = get_image_list(message.data.content);
		// console.log($(document).get(0));
		display_image_list(img_list);
		$('button#file_upload_status_btn').click();
	}
	if (message.type == "Crawl.ImagesResult") {
		console.log("[消息]", "-x11-", "接收到图片下载完成的消息", message);
		upload_file(message.data);
	};

	if (message.type == "Target.ImagesPanelOpen") {
		console.log("[消息]", "-x11-", "接收到查看图片上传状态面板的消息", message);
		if (upload_image_panel_status == false) {
			$('button#file_upload_status_btn').click();
		};
	};

	var msg_confirm = {};
	msg_confirm.type = "Msg.Confirm";
	sendResponse(msg_confirm);
	console.log("[消息]", "-12-", "target回复确认消息", msg_confirm);

});
var crawler_msg_req = {};
crawler_msg_req.type = "Crawl.Req";
console.log("[消息]", "-1-", "target发出抓取请求");
chrome.runtime.sendMessage(crawler_msg_req, function(response) {
	console.log("[消息]", "-4-", "target接收到确认消息", response);
});