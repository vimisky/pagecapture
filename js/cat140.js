var initString = "";

for(var j = 0; j < 18; j++){
	initString += "这是一篇8准备测试稿件";
}

function cat140( string ){
	var counter = 0;
	console.log("[debug] 编码", string.charCodeAt(i));	
	for (var i = 0, completeFlag = false; i <= string.length - 1; i++) {
		schar = string.charCodeAt(i).valueOf();
		switch(true){
			case 0 <= schar && schar <=0x7F && counter <= 279:
				console.log("[debug] 英文", string.charAt(i), Number.parseInt(string.charCodeAt(i),10).toString(16), 0x7F,counter);
				counter ++;	
				break;
			case 0x4E00 <= schar && schar <= 0x9FA5 && counter <= 278:
				console.log("[debug] 中文", string.charAt(i), Number.parseInt(string.charCodeAt(i),10).toString(16), counter);			
				counter += 2;
				break;	
			case 0xF900 <= schar && schar <= 0xFAFF && counter <=278:
				console.log("[debug] 中文", string.charAt(i), Number.parseInt(string.charCodeAt(i),10).toString(16), counter);			
				counter += 2;		
				break;
			case 0xFE30 <= schar && schar <= 0xFE4F && counter <=278:
				console.log("[debug] 中文", string.charAt(i), Number.parseInt(string.charCodeAt(i),10).toString(16), counter);			
				counter += 2;	
				break;
			default:
				console.log("[debug] 已完成截断或者出现非英文和非中文字符");
				completeFlag = true;
				break;							
		}
		if ( completeFlag ) {
			break;
		};

	};

	if ( counter == 279 || counter == 280 ) {
		console.log("[debug] 完成截断");
		console.log("[debug]", string.substring(0, i));
	}else{
		console.log("[debug] 出现非英文和非中文字符");
	}
	
}

cat140(initString);