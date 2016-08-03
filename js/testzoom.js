$(document).ready(function() {

	document.body.querySelector("#html2canvasBtn").addEventListener("click", function(event){
		html2canvas( document.body.querySelector("#to_paint_html") , {
			onrendered : function(canvas){
				document.body.querySelector("#canvas_dom_div").appendChild(canvas);
				var image = new Image();
				image.onload = function(){
					
				}
				image.src = canvas.toDataURL();
				document.body.querySelector("#img_dom_div").appendChild(image);
			}
		} );
	});

});