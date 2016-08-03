//chrome和火狐中有效，IE无效
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj; 
}

var Shape = function( x, y ){
	this.x = x;
	this.y = y;
}

Shape.prototype.getX = function(){
	return this.x;
}
Shape.prototype.getY = function(){
	return this.y;
}

var Rect = function( x, y, width, height ){
	this.width = width;
	this.height = height;
	Shape.call( this, x, y);
}

Rect.prototype = Object.create(Shape.prototype);
Rect.prototype.constructor = Rect;

Rect.prototype.getWidth = function(){
	return this.width;
}

Rect.prototype.getHeight = function(){
	return this.height;
}

var RectAngle = function( x, y, angle ){
	this.angle = angle;
	Shape.call( this, x, y);
}

RectAngle.prototype = Object.create(Shape.prototype);
RectAngle.prototype.constructor = RectAngle;

RectAngle.prototype.getAngle = function(){
	return this.angle;
}

var Printer = function(color){
	this.color = color;
}
Printer.dodododo = function(){};

Printer.prototype.tmpu = "try it out ";
Printer.prototype.getColor = function(){
	return this.color;
}
Printer.prototype.print = function(string){
	console.log("[Printer] print ", this.color, "string", string);
}

var RectPrinter = function( x, y, width, height, color, option){
	this.option = option;
	Rect.call(this, x, y, width, height);
	Printer.call(this, color);
}

RectPrinter.prototype = Object.create(Rect.prototype);
RectPrinter.prototype.constructor = RectPrinter;
//append chain
var DOG = RectPrinter.prototype;
while(  ( Object.getPrototypeOf( DOG ) != Object.prototype )&& (Object.getPrototypeOf( DOG ) != Function.prototype) ){
	console.log("[traversal]", DOG);
	DOG = Object.getPrototypeOf( DOG );
}
	console.log("[--traversal]", DOG);

Object.setPrototypeOf(DOG, Object.create(Printer.prototype));

var rectPrinter = new RectPrinter(5, 6, 10, 12, "red", "oooo");

var shape = new Shape( 2, 3 );
var rect01 = new Rect( 2, 3, 4, 5 );
var rect02 = new Rect( 20, 30, 40, 50 );
var printer01 = new Printer("black");
var printer02 = new Printer("blue");

console.log("[debug 查看一下各个function和object]");
console.log("Shape", Shape, shape);
console.log("Rect", Rect, rect01, rect02);
console.log("Printer", Printer, Printer.prototype, printer01, printer02);
console.log("RectPrinter", RectPrinter, RectPrinter.prototype, rectPrinter);
console.log("[/debug 查看一下各个function和object]");

console.log("[debug] 打印Printer的属性");
console.log(rectPrinter.getX());
console.log(rectPrinter.getY());
console.log(rectPrinter.getColor());
console.log("[/debug] 打印Printer的属性");

rectPrinter.print("我静静的看你抽烟");
