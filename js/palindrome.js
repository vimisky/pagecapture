var initString = "额中国人国中下面的例子涉及subject FOO，已经被指定sid为1. 如果要取消订阅FOO"+
"PING和PONG实现了client和server之间的简单keep-alive机制。一旦client连接上NATS server"+
"-ERR消息是server用来告诉client出现了协议、认证或者其它运行时连接错误。大多数的错误会导致server关闭该连接";

console.log("[debug] 给定字符串", initString);
console.log("[debug] 寻找所有回文，字符串长度为", initString.length);

// 奇数情况下：
// 算法描述： 遍历所有字符，以每个字符为中心，回文长度为1，往两边扩散，如果两边相等，则+2，同时记录回文字符串；
function oddAlg(str){
	var p = []; // 数组，与字符串的每个字符对应，表示以该字符为中心的回文长度
	var substr = [];// 数组，与字符串的每个字符对应，表示以该字符为中心的回文
	// var midChar;
	// console.log("字符串长度为", str.length);
	for(var i = 0; i < str.length; i++){
		// console.log("开始", str[i]);
		// midChar = str[i];
		p[i] = 1;
		var cc = [str[i]];

		for(var j = 1; i-j >= 0 && i+j <= str.length-1 ; j++){
			if (str[i-j] != str[i+j]) {
				// console.log("不匹配");
				break; 
			}else{
				// console.log("匹配");
				p[i] += 2;
				cc.unshift(str[i-j]);
				cc.push(str[i+j]);
			}	
		}
		substr[i] = cc;
	}
	for(var i = 1; i < str.length; i++){
		if (p[i]>1) {
			console.log(substr[i]);
		};
	}
}

// 偶数情况下：
// 算法描述： 遍历所有字符，寻找相邻两个字符相等的情况为中心，回文长度为2，往两边扩散，如果两边相等，则+2，同时记录回文字符串；
function evenAlg(str){

	var p = [];// 数组，与字符串的每个字符对应，表示以该字符和右边字符为中心的回文长度
	var substr = [];// 数组，与字符串的每个字符对应，表示以该字符和右边字符为中心的回文
	// var midChars = [];
	// console.log("字符串长度为", str.length);
	for(var i = 0; i < str.length; i++){
		p[i] = 0;
		var cc = [];
		if (str[i] == str[i+1]) {
			p[i] = 2;
			cc.push(str[i]);
			cc.push(str[i+1]);
			for(var j = 1; i-j >= 0 && i+1+j <= str.length -1; j++){
				if (str[i-j] != str[i+1+j]) {
					// console.log("不匹配");					
					break;
				}else{
					// console.log("匹配");
					p[i] += 2;
					cc.unshift(str[i-j]);
					cc.push(str[i+1+j]);
				}
			}			
		};

		substr[i] = cc;
	}
	for(var i = 1; i < str.length; i++){
		if (p[i]>1) {
			console.log(substr[i]);
		};
	}	

}

oddAlg(initString);
evenAlg(initString);