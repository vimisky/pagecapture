console.log("[debug] chat.weixin.crawler.js 注入完成");

var chat_list = document.body.querySelector("#J_NavChatScrollBody");

// console.log("[debug] chat list", chat_list);

var chat_contact_list = chat_list.querySelectorAll('div[ng-repeat~="chatContact"]');

// console.log("[debug] chat contact list", chat_contact_list, chat_contact_list.length, typeof(chat_contact_list));

var intervalId = 0;

chat_list.addEventListener("load", function(event){
	console.log("[debug] chat_list load");
});

function getLogDate(){
	return new Date().toString();
}

function sleepSomeTime(millisecond) {
	var start = new Date().getTime();
	var end = new Date().getTime();
	do {

		end = new Date().getTime();
	} while ((end - start) < millisecond);

}

var click_queue = [];

function message_crawl(){
	var messages = document.body.querySelectorAll('#chatArea div.scroll-wrapper' +
	' div.scroll-content ' +
	' div[mm-repeat~="message"] div[ng-repeat~="message"]');

	var contact_name = document.body.querySelector('#chatArea > div.box_hd > div.title_wrap > div > a');
	if (contact_name != null) {
		console.log("[debug]", getLogDate() ," crawling messages of ", contact_name.innerText ,", messages number:", messages, messages.length);
	}else{
		console.log("[debug]", getLogDate() ," crawling messages (find not contact name ), messages number:", messages, messages.length);		
	}

	for (var i = messages.length - 1; i >= 0; i--) {
		var message_entry = messages[i].querySelector("div.message");
		if (message_entry) {
			// console.log("[debug] message_entry");
			var avatar = message_entry.querySelector("img.avatar");
			if (avatar) {
				// console.log("[debug] message_entry");
			};
			var text_content = message_entry.querySelector('div.content div[ng-if*="MSGTYPE_TEXT"]');
			if (text_content) {
				// console.log("[debug] text_content");
				var text_content_element = text_content.querySelector("div.plain pre");
				if (text_content_element) {
					// console.log("[debug] text_content_element");
					console.log("[debug]", avatar.innerText, "说", text_content_element.innerText);				
				};
			};			
		};



	};	
}

function manual_click_trigger(){
	var current_item = click_queue.pop();
	if (current_item) {
		var eventInstance = new Event("click", {"bubbles":true, "cancelable":false});
		current_item.dispatchEvent(eventInstance);			
	};

	setTimeout(message_crawl, 500);

}

function traversal_new_chat_list(){
	console.log("[debug]", getLogDate()," time trigger: traversal new chat list!");
	var chat_contact_list = chat_list.querySelectorAll('div[ng-repeat~="chatContact"]');
	// console.log("[debug] chat contact list", chat_contact_list, chat_contact_list.length, typeof(chat_contact_list));	
	for (var i = chat_contact_list.length - 1; i >= 0; i--) {
				var bling = chat_contact_list[i].querySelector("div.chat_item div.avatar i");
				var name_span = chat_contact_list[i].querySelector("div.chat_item div.info h3 span");

				// if (name_span.innerText == "胡扬帆") {
				// 	var current_item = chat_contact_list[i].querySelector("div.chat_item");
				// 	if (null != current_item) {
				// 		if( current_item.hasAttributes() ){
				// 			var ng_class = current_item.attributes.getNamedItem("class");
				// 			if(ng_class.value.match("active")){
				// 				console.log("[debug] 当前聊天已打开", name_span.innerText);
				// 			}else{
				// 				console.log("[debug] 打开有新消息的聊天", name_span.innerText);
				// 				// sleepSomeTime(1000);
				// 				click_queue.push(current_item);
				// 				setTimeout(manual_click_trigger, 1000);
							
				// 			}
				// 		}
				// 	};

				// };
				// if (name_span.innerText == "小熊") {
				// 	var current_item = chat_contact_list[i].querySelector("div.chat_item");
				// 	if (null != current_item) {
				// 		if( current_item.hasAttributes() ){
				// 			var ng_class = current_item.attributes.getNamedItem("class");
				// 			if(ng_class.value.match("active")){
				// 				console.log("[debug] 当前聊天已打开", name_span.innerText);
				// 			}else{
				// 				console.log("[debug] 打开有新消息的聊天", name_span.innerText);
				// 				click_queue.push(current_item);
				// 				setTimeout(manual_click_trigger, 5000);						
				// 			}
				// 		}
				// 	};

				// };				
				// if (name_span.innerText == "文件传输助手") {
				// 	var current_item = chat_contact_list[i].querySelector("div.chat_item");
				// 	if (null != current_item) {
				// 		if( current_item.hasAttributes() ){
				// 			var ng_class = current_item.attributes.getNamedItem("class");
				// 			if(ng_class.value.match("active")){
				// 				console.log("[debug] 当前聊天已打开", name_span.innerText);
				// 			}else{
				// 				console.log("[debug] 打开有新消息的聊天", name_span.innerText);
				// 				click_queue.push(current_item);
				// 				setTimeout(manual_click_trigger, 9000);							
				// 			}
				// 		}
				// 	};

				// };

				

				// if ( null != bling && '' != bling.innerText) {
				if ( null != bling ) {

					console.log("[debug] ", name_span.innerText, "has new messages!", bling.innerText);	
					var current_item = chat_contact_list[i].querySelector("div.chat_item");
					if (null != current_item) {
						if( current_item.hasAttributes() ){
							var ng_class = current_item.attributes.getNamedItem("class");
							if(ng_class.value.match("active")){
								console.log("[debug] ", getLogDate() , "当前聊天已打开", name_span.innerText);
							}else{
								console.log("[debug] ", getLogDate() , "打开有新消息的聊天", name_span.innerText);
								click_queue.push(current_item);
								setTimeout(manual_click_trigger, 1000);							
							}
						}
					};

				};
				
	};		
};

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

	if (message.type == "Weixin.ChatCrawler.Once") {
		console.log("[消息]", "-wx2-", "微信网页版页面接收到抓取一次聊天记录请求的消息", message);
		// intervalId = setInterval(traversal_new_chat_list, 13000);
		message_crawl();
		var responseMessage = {};
		responseMessage.type = "Weixin.ChatCrawler.Once.StatusResponse";
		responseMessage.data = {"status":0};
		sendResponse(responseMessage);
	}

	if (message.type == "Weixin.ChatCrawler.Switcher.Open") {
		console.log("[消息]", "-wx2-", "微信网页版页面接收到定时抓取聊天记录请求的消息", message);
		if (message.data) {
			var interval_level = message.data.interval_level;
			var interval_value = 0;
			switch(interval_level){
				case 1:
					interval_value = 15*1000;
					break;
				case 2:
					interval_value = 60*1000;
					break;
				case 3:
					interval_value = 900*1000;
					break;
				default:
					console.log("[debug] 不支持该定时level");
					break;
			}
			if (interval_value != 0) {
				console.log("[debug] 定时抓取开始，定时时间为", interval_value);				
				clearInterval(intervalId);
				intervalId = setInterval(traversal_new_chat_list, interval_value);				
			}else{
				console.log("[debug] 获取不到定时抓取的时间");
			}

		};
		
		// message_crawl();
	}
	if (message.type == "Weixin.ChatCrawler.Switcher.Close") {
		console.log("[消息]", "-wx2-", "微信网页版页面接收到取消定时抓取聊天记录请求的消息", message);
		clearInterval(intervalId);
	}	
});