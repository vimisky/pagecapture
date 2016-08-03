////typeof exercise

// var a = null;
// var b = undefined;

// var c = 0;
// var d = '0';
// var e = 1 + '0';

// var f = ['cat', 'dog', 'pig'];
// console.log("[debug] typeof a", typeof(a), "typeof b", typeof(b));
// console.log("[debug], c, d, e, f typeof Type:", typeof(c), typeof(d), typeof(e), typeof(f));

// var ppp = function(){
// 	console.log("[debug] ppp function() called");
// }

function nullfunction(){};

function SuperType(){

	this.superProperty = 'super';
	this.superArray = ['dog', 'cat', 'pig'];

};
SuperType.prototype.getSuperProperty = function(){
	return this.superProperty;
}

// SuperType.prototype.setSuperProperty = function(string){
// 	this.superProperty = string;
// }


var superObject = new SuperType();

function SubType(){
	this.subProperty = 'sub';
	// var args = arguments;
	// 典型的属性继承
	// SuperType.call(this, args);
};

// 原型链继承， 用Object.create()来新建对象，不要用new Object(), Object()是个引用(wrapper)，不是新建。
/*
function w_extends(w_superType, w_subType){
	var x_prototype = Object.create(w_superType.prototype);
	// var x_prototype = Object.create(w_superType.prototype);
	console.log("[debug] x_prototype === w_superType.prototype", x_prototype === w_superType.prototype);
	x_prototype.constructor = w_subType;
	// console.log("[debug] _prototype === w_superType.prototype", x_prototype);
	w_subType.prototype = x_prototype;
}
w_extends(SuperType, SubType);
*/

SubType.prototype.getSubProperty = function(){
	return this.subProperty;
}

// 最好不要用set方法给属性赋值。因为this指向的是当前对象，所以当有继承的属性时，赋值时新增属性，而不是给继承的属性赋值。
// SubType.prototype.setSubProperty = function(string){
// 	this.subProperty = string;
// }

// 循环遍历打印prototype里面的方法
/*
console.log("[debug]");
for(var method in SubType.prototype){
	console.log(method);
}
console.log("[/debug]");
*/

// 类组合，prototype打印调试
/*
console.log("[debug]\n", " SuperType", SuperType, "\n SuperType.prototype", SuperType.prototype , "\n superObject",superObject,"\n superObject.prototype", superObject.prototype,
 "\n superObject.__proto__",superObject.__proto__, "\n superObject.__proto__.getSuperProperty", superObject.__proto__.getSuperProperty,
 "\n[/debug]");

console.log("[debug]", 
 "\n SubType", SubType, "\n SubType.prototype", SubType.prototype , 
 "\n subObject",subObject, "\n subObject.__proto__",subObject.__proto__, 
 "\n subObject_2",subObject_2, "\n subObject_2.__proto__",subObject_2.__proto__,  
 "\n[/debug]");

console.log("[debug]", subObject.superArray, subObject_2.superArray,"\n subObject instanceof superType", subObject instanceof SuperType);

console.log("[debug] SuperType constructor", SuperType.constructor, "SuperType.prototype.constructor", SuperType.prototype.constructor);
console.log("[debug] SubType constructor", SubType.constructor, "SubType.prototype.constructor", SubType.prototype.constructor);
*/

// console.log("[debug] superObject constructor\n", superObject.constructor);

// console.log("[debug] SuperType typeof Type:",  typeof(SuperType), "superObject typeof Type:", typeof(superObject), "SuperTypeEq typeof Type:", typeof(SuperTypeEq));

// console.log("[debug] SuperType Object", SuperType, "\n",superObject,"\n", superObject.prototype,
//  "\n",superObject.__proto__, "\n", superObject.__proto__.getSuperProperty);

// if (SuperType.constructor == SubType.constructor) {
// 	console.log("[debug] SuperType == SubType");
// };

// if (SuperType.constructor == superObject.constructor) {
// 	console.log("[debug] SuperType == superObject");
// };


// console.log("[debug] SubType : ", SubType, "\n subperObject :", superObject, "\n subObject :", subObject);

// console.log("[debug] ",
//  "\n subObject __proto__", subObject.__proto__, "\n SubType __proto__", SubType.__proto__,
//  "\n nullfunction __proto__", nullfunction.__proto__);

// for(submethod in subObject){
// 	// 只能打印出属性
// 	console.log("[debug]", submethod, "submethod value", subObject[submethod]);
// }
// for(submethod in subObject.__proto__){
// 	// 什么也打印不出来
// 	console.log("[debug]", submethod, "submethod value", subObject[submethod]);
// }

// var chineseCharacters = "";
// for(var i = 0; i < 2; i++ ){
// 	chineseCharacters += "a魏海涛";
// }

// console.log("[debug - 140汉字280字母测试] ",
// 	"\njavascript长度\n", chineseCharacters.length, 
// 	"\n微博内容\n", chineseCharacters ,
// 	"\nURL编码后\n", encodeURI(chineseCharacters),
// 	"\n微博长度URLencode\n", encodeURI((chineseCharacters)).length, 
// 	"\n[/debug - 140汉字280字母测试]");


// var schar = chineseCharacters.charCodeAt(1);
// console.log("[debug - 字符串字符编码测试] ",
// 	"\n第一个字符为\n", schar.valueOf().toString(16), 
// 	"\n[/debug - 字符串字符编码测试]");

// var scharObject = new Object(schar);
// console.log("[debug - 字符封装Object测试] ",
// 	"\n字符对象为\n", scharObject, 
// 	"\n[/debug - 字符封装Object测试]");


// ----------------function/object数据结构
// console.log("print Object.constructor", Object.constructor);
// console.log("print Object.prototype", Object.prototype);
console.log("print Function.constructor", Function.constructor);
console.log("print Function.prototype", Function.prototype);
// console.log("[debug Object property]");
// for(var property in Object){
// 	console.log(property);
// }
// console.log("[/debug Object property]");

// console.log("[debug Function property]");
// for(var property in Function){
// 	console.log(property);
// }
// console.log("[/debug Function property]");

// console.log("[debug Function]");

// console.log(Function.prototype.call.__proto__);
// console.log(Function.__proto__);
// console.log("[debug Function]");

///------------------end function/object数据结构------------------

var sFunction = function(){
	this.sFunctionProperty = "hehe";
	null;
};
// sFunction.dog = "hehe";
sFunction.getHoll = function(){
	null;
};
sFunction.prototype.getWoll = function(){
	null;
};

console.log("[debug - sFunction Object测试] ",
	"\nprint sFunction", sFunction,
	"\nprint typeof(sFunction)为", typeof(sFunction), 
	"\nprint sFunction.prototype", sFunction.prototype, 
	"\nprint sFunction.__proto__", sFunction.__proto__, 
	"\nprint sFunction.constructor", sFunction.constructor,	
	"\nprint sFunction.prototype.constructor", sFunction.prototype.constructor,		
	"\n[/debug - sFunction Object测试]");

console.log("[debug] sFunction display");
console.log("print sFunction.sFunctionProperty", sFunction.sFunctionProperty);
console.log("print sFunction.getWoll", sFunction.getWoll);
console.log("print sFunction.hasOwnProperty", sFunction.hasOwnProperty("call"));
console.log("[/debug sFunction display]");

console.log("[debug sFunction property traversal]");
for(var property in sFunction){
	console.log(property);
}
console.log("[/debug sFunction property traversal]");

console.log("[debug sFunction.prototype property traversal]");
for(var method in sFunction.prototype){
	console.log(method);
}
console.log("[/debug sFunction.prototype property traversal]");

console.log("[debug sFunction.__proto__ property traversal]");
for(var method in sFunction.__proto__){
	console.log(method);
}
console.log("[/debug sFunction.__proto__ property traversal]");


// new 出来后
console.log("\n\n-----------------new sFunction()-----------------");

var osFunction = function(){};
// sFunctionProperty存放在__proto__中，
//当没有ownproperty时，get该属性没有问题；如果实例通过.sFunctionProperty对该属性进行改变时，会在实例中新建一个该属性。
//这样，就会有两个这个属性。
osFunction.prototype = new sFunction();

// 模拟new 操作符
// var osFunction = new Object();
// osFunction.__proto__ = sFunction.prototype;
// if( null != (oo = sFunction.call(osFunction))){
// 	console.log("[debug] sFunction() return not null");
// 	osFunction = oo;
// }

osFunction.dog = "ofofo";
osFunction.pfunction = function(){
	null;
};

console.log("\f[debug - osFunction Object测试] ",
	"\nprint osFunction", osFunction,
	"\nprint typeof(osFunction)为", typeof(osFunction), 
	"\nprint osFunction.prototype", osFunction.prototype, 
	"\nprint osFunction.__proto__", osFunction.__proto__, 
	"\nprint osFunction.constructor", osFunction.constructor,
	"\nprint osFunction.__proto__.constructor", osFunction.__proto__.constructor,
	"\n[/debug - osFunction Object测试]");

console.log("[debug osFunction property traversal]");
for(var property in osFunction){
	console.log(property);
}
console.log("[/debug osFunction property traversal]");

console.log("[debug osFunction.prototype property traversal]");
for(var method in osFunction.prototype){
	console.log(method);
}
console.log("[/debug osFunction.prototype property traversal]");

console.log("[debug osFunction.__proto__ property traversal]");
for(var method in osFunction.__proto__){
	console.log(method);
}
console.log("[/debug osFunction.__proto__ property traversal]");

console.log("[debug] osFunction property display");
console.log("print osFunction.dog", osFunction.dog);
console.log("print osFunction.getWoll", osFunction.getWoll);
console.log("print osFunction.hasOwnProperty", osFunction.hasOwnProperty("getWoll"));
console.log("print Object.getOwnPropertyNames", Object.getOwnPropertyNames(osFunction));
console.log("print Object.getOwnPropertyNames", Object.getOwnPropertyNames("osFunction"));
console.log("print Object.keys", Object.keys(osFunction));
console.log("[/debug osFunction property display]");

console.log(osFunction.constructor == sFunction);
console.log(typeof(osFunction.constructor));

// osFunction.constructor = new Function();

var oosFunction = new osFunction();

console.log("[debug] oosFunction", oosFunction, oosFunction.sFunctionProperty);

var oosFunction2 = new osFunction();

console.log("[debug] oosFunction2", oosFunction2, oosFunction2.sFunctionProperty);

oosFunction.sFunctionProperty = "dogodogo";
console.log("[debug] oosFunction", oosFunction, oosFunction.sFunctionProperty);

console.log("[debug] oosFunction2", oosFunction2, oosFunction2.sFunctionProperty);




