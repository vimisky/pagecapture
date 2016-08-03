// window.onload = function() {

//     //event delegate
//     var fnClick = function(event) {
//         console.log("[debug] click ", event.target.id, event.currentTarget);
//         if (event.target && event.target.tagName == "div") {
//             console.log("[debug] click ", div);
//         };

//         if (event.target && event.target.tagName == "ul") {
//             console.log("[debug] click ", ul);
//         };
//         if (event.target && event.target.tagName == "li") {
//             console.log("[debug] click ", li);
//         };
//     };
//     var ul = document.body.querySelector("#parent-list");
//     ul.addEventListener("click", fnClick, false);

//     // nth-child, nth-of-type
//     var li = ul.querySelector("li:nth-child(5)");
//     console.log("[debug] select nth-child(5) is ", li);

//     var div = document.body.querySelector("#div-parent-list");
//     var pp = div.querySelector(":nth-child(2)");
//     console.log("[debug] select >nth-child(2) is ", pp);
//     // hositing, function prior to param
//     // 声明其实没有多大意义，只要初始化或者赋值，那么都会改变
//     // 注意函数表达式和函数声明的区别，下面的例子是函数声明。
//     (function() {

//         function foo() {}
//         console.log(typeof foo); //function

//         var foo;

//         // foo = "foo";
//         console.log(typeof foo); //string
//     })();

//     // object/class





//     // jitter函数节流


//     // apply/bind/call
//     //log 封装
//     function log() {
//         var args = Array.prototype.slice.call(arguments);
//         args.unshift('(app)');

//         console.log.apply(console, args);
//     };

//     // JS写个代理
//     function delegate(client, clientMethod){
//     	return function(){
//     		return clientMethod.call(client, arguments);	
//     	}
//     }



// }

// var interval = setInterval(function(){

//     	console.log("[debug] print", new Date().getTime() );

// }, 1024);

    
// var interval = setInterval(function cprint(){
// 	var num = 5;
// 	return function(){
//     	console.log("[debug] print", new Date().getTime() );
//     	if (--num == 0) {
//     		clearInterval(interval);
//     	};;	
// 	}
	

// }(), 1024);
    
function adder(p){
    sum = 0;
    return function(){
        return sum+=p;
    }
}

var v = adder(3);
console.log("after added, value is",v());

console.log("after added, value is",v());