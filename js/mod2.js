// mod2
define(function(require){
	// function printObj(obj){
	// 	console.log("[debug] print obj", obj);
	// }
	var ddd = {
		"withcallback" : function (callback){
			console.log("[debug] with callback", this);
			callback();
		},
		"jcallback":function(){
			//这里, this并没有引用外面的
			console.log("[debug] callback", this);
		}
	};
	
	(function(){
		var array_obj = ["a","b","c","d","e","f"];
		for (var i = array_obj.length - 1; i >= 0; i--) {
			console.log("[debug] ddd.withcallback", ddd.withcallback);
			console.log("[debug] ddd.jcallback", ddd.jcallback);
			ddd.withcallback(ddd.jcallback);
			ddd.jcallback();
		};
	})();

});