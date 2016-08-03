// define和require这两个定义模块、调用模块的方法，合称为AMD模式。它的模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系。
// AMD模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。
// RequireJS模块最通用的写法
define(function(require){
	var mod2 = require("js/mod2");
	
	return {
		
	};
});