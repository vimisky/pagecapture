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
	// ¦Ì?D¨ª¦Ì?¨º?D??¨¬3D
	// SuperType.call(this, args);
};

// ?-D¨ª¨¢¡ä?¨¬3D¡ê? ¨®?Object.create()¨¤¡äD??¡§???¨®¡ê?2?¨°a¨®?new Object(), Object()¨º???¨°y¨®?(wrapper)¡ê?2?¨º?D??¡§?¡ê
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

// ¡Á?o?2?¨°a¨®?set¡¤?¡¤¡§??¨º?D??3?¦Ì?¡ê¨°¨°?athis???¨°¦Ì?¨º?¦Ì¡À?¡ã???¨®¡ê??¨´¨°?¦Ì¡À¨®D?¨¬3D¦Ì?¨º?D?¨º¡À¡ê??3?¦Ì¨º¡ÀD???¨º?D?¡ê???2?¨º????¨¬3D¦Ì?¨º?D??3?¦Ì?¡ê
// SubType.prototype.setSubProperty = function(string){
// 	this.subProperty = string;
// }

// ?-?¡¤¡À¨¦¨¤¨²¡ä¨°¨®?prototype¨¤???¦Ì?¡¤?¡¤¡§
/*
console.log("[debug]");
for(var method in SubType.prototype){
	console.log(method);
}
console.log("[/debug]");
*/

var subObject = new SubType();
var subObject_2 = new SubType();

var SuperTypeEq = SuperType;

var subObject2 = {
	subProperty:'sub'
};


// D¡ä¡¤??¨º¡ê??¨¢?¨´¡Á¨®¨¤¨¤?DD???
// subObject.superProperty = "changed";
// ?¨´¨°?¡ê?¨¦??¡ãD¡ä2¨´¡Á¡Â¨º¡À¡ê?¨º1¨®?__proto__¡¤??¨º?¨¬3D¡Á???¨¤¨¤¦Ì?¨º?D??¡ê
// subObject.__proto__.superProperty = "changed";
// ???¨¢¡¤??¨º¡ê?¡¤¦Ì??¦Ì?¨º???¨¤¨¤¦Ì?¨º?D?
// subObject.superArray.push('horse');
// subObject.superArray = ['hi'];

// var aaa = new ppp();

subObject2.ppp = function(){
	console.log("[debug] ppp function() called");
};

// console.log("[debug] subObject2.ppp", subObject2.ppp);

// ¨¤¨¤¡Á¨¦o?¡ê?prototype¡ä¨°¨®?¦Ì¡Â¨º?
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
// 	// ???¨¹¡ä¨°¨®?3?¨º?D?
// 	console.log("[debug]", submethod, "submethod value", subObject[submethod]);
// }
// for(submethod in subObject.__proto__){
// 	// ¨º2?¡ä¨°2¡ä¨°¨®?2?3?¨¤¡ä
// 	console.log("[debug]", submethod, "submethod value", subObject[submethod]);
// }

var chineseCharacters = "";
for(var i = 0; i < 1; i++ ){
	chineseCharacters += "aÎÒ°®Äã";
}

console.log("[debug - 140ºº×Ö280×ÖÄ¸ \njavascript\n", chineseCharacters.length, 
	"\nÎ¢²©ÕýÎÄ\n", chineseCharacters ,
	"\nURLencode±àÂëºó\n", encodeURI(chineseCharacters),
	"\nURLencode±àÂëºó³¤¶È\n", encodeURI((chineseCharacters)).length, 
	"\n[/debug - 140ºº×Ö280×ÖÄ¸]");
	
console.log("[debug unicode - ascii]", "\u4E25");

