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
	// ��?D����?��?D??��3D
	// SuperType.call(this, args);
};

// ?-D������?��3D��? ��?Object.create()����D??��???����?2?��a��?new Object(), Object()��???��y��?(wrapper)��?2?��?D??��?��
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

// ��?o?2?��a��?set��?����??��?D??3?��?�ꨰ��?athis???����?��?�̡�?��???����??����?�̡���D?��3D��?��?D?������??3?�̨���D???��?D?��???2?��????��3D��?��?D??3?��?��
// SubType.prototype.setSubProperty = function(string){
// 	this.subProperty = string;
// }

// ?-?�����������䨰��?prototype��???��?��?����
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


// D�䡤??����??��?����������?DD???
// subObject.superProperty = "changed";
// ?����?��?��??��D��2�����¨�����?��1��?__proto__��??��?��3D��???������?��?D??��
// subObject.__proto__.superProperty = "changed";
// ???����??����?����??��?��???������?��?D?
// subObject.superArray.push('horse');
// subObject.superArray = ['hi'];

// var aaa = new ppp();

subObject2.ppp = function(){
	console.log("[debug] ppp function() called");
};

// console.log("[debug] subObject2.ppp", subObject2.ppp);

// ��������o?��?prototype�䨰��?�̡¨�?
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
// 	// ???���䨰��?3?��?D?
// 	console.log("[debug]", submethod, "submethod value", subObject[submethod]);
// }
// for(submethod in subObject.__proto__){
// 	// ��2?�䨰2�䨰��?2?3?����
// 	console.log("[debug]", submethod, "submethod value", subObject[submethod]);
// }

var chineseCharacters = "";
for(var i = 0; i < 1; i++ ){
	chineseCharacters += "a�Ұ���";
}

console.log("[debug - 140����280��ĸ \njavascript\n", chineseCharacters.length, 
	"\n΢������\n", chineseCharacters ,
	"\nURLencode�����\n", encodeURI(chineseCharacters),
	"\nURLencode����󳤶�\n", encodeURI((chineseCharacters)).length, 
	"\n[/debug - 140����280��ĸ]");
	
console.log("[debug unicode - ascii]", "\u4E25");

