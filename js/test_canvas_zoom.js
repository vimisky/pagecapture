$(document).ready(function() {

	var sourceImg = document.body.querySelector("#source_img");
	
	sourceImg.onload = function() {
			var target_width = 200;
			var target_height = 200;
			var target_canvas = document.createElement("canvas");
			target_canvas.width = target_width;
			target_canvas.height = target_height;
			var target_ctx = target_canvas.getContext("2d");

			target_ctx.drawImage(sourceImg, 0, 0, target_width, target_height);

			document.body.querySelector("#resized_div").appendChild(target_canvas);
		}
		// sourceImg.width;
		// sourceImg.height;

	// document.body.querySelector("#resized_div").style.width = target_width + 1;
	// document.body.querySelector("#resized_div").style.height = target_height + 1;

	var html_string =
				'<svg xmlns="http://www.w3.org/2000/svg" style="max-width:100%">'+ 
				'<foreignObject width="100%" height="100%">'+
				'<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:16px">'+
				'<p>　在讲单向的多对多的映射关系的案例时,我们假设我们有两张表,一张角色表Role,一张权限表Function,我们知道一个角色或者说一个用户,可能有多个操作权限,而一种操作权限同时'+
				'被多个用户所拥有,假如我们我们的需求是能通过角色获取到其所拥有的操作权限,这就构成了单项的多对多的映射关系,为了管理这个关系,已经不能再通过添加外键列,必须在建立一张关系表,'+
				'专门负责角色和权限之间的关系映射,如下:</p>'+
				'<p>这里假设有两个用户一个是管理员admin,一个是普通用户user,管理员拥有全部四个权限,而普通用户只拥有用户管理和资料管理的权限,这种关系在hibernate中应该这样配置:</p>'+
				'</div>'+
				'</foreignObject>'+
				'</svg>';
	var html_svg = new Blob([html_string], {type:'image/svg+xml;charset=utf-8'});
	var html_svg_url = window.URL.createObjectURL(html_svg);	
	var img_dom = new Image();
	img_dom.style.width = "100%";
	var canvas_dom = document.createElement("canvas");
	var canvas_ctx = canvas_dom.getContext("2d");
	img_dom.onload = function(){
		canvas_ctx.drawImage(img_dom,0,0);
		window.URL.revokeObjectURL(html_svg_url);
	};
	img_dom.src = html_svg_url;


	

	document.body.querySelector("#img_dom_div").appendChild(img_dom);
	document.body.querySelector("#canvas_dom_div").appendChild(canvas_dom);

});