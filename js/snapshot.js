$(document).ready(function() {
	var cropper_enabled_flag = false;

	function localizeHtmlPage() {
		//Localize by replacing __MSG_***__ meta tags
		var objects = document.getElementsByTagName('html');
		for (var j = 0; j < objects.length; j++) {
			var obj = objects[j];

			var valStrH = obj.innerHTML.toString();
			var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1) {
				return v1 ? chrome.i18n.getMessage(v1) : "";
			});

			if (valNewH != valStrH) {
				obj.innerHTML = valNewH;
			}
		}
	}

	localizeHtmlPage();
	function to_process_image_init() {
		var search_string = window.location.search;
		if ( null != search_string && '' != search_string) {
			var index = search_string.indexOf("img_url=");
			if ( undefined != index && index != 0 ) {
				
				document.body.querySelector("#image_to_process").src = search_string.substring(index+8);
			};
		};
	}
	
	to_process_image_init();

	function cropper_plugin_init() {

		if (false == cropper_enabled_flag) {
			$("#image_to_process").cropper({
				preview: '.cropper-preview',
				movable: true,
				crop: function(e) {
					// Output the result data for cropping image.
					$("div#snapshot_img_info input#cropper_select_x").val(e.x);
					$("div#snapshot_img_info input#cropper_select_y").val(e.y);
					$("div#snapshot_img_info input#cropper_select_width").val(e.width);
					$("div#snapshot_img_info input#cropper_select_height").val(e.height);
					$("div#snapshot_img_info input#cropper_select_rotate").val(e.rotate);
					$("div#snapshot_img_info input#cropper_select_scalex").val(e.scaleX);
					$("div#snapshot_img_info input#cropper_select_scaley").val(e.scaleY);
				}
			});
		}

	}

	cropper_plugin_init();

	function toolbar_init() {

		var enable_cropper_btn = document.body.querySelector("#enable_cropper_btn");
		enable_cropper_btn.addEventListener("click", cropper_plugin_init);

		var selector_ratio_btns = document.body.querySelectorAll("#cropper_selector_ratio_btns button");

		for (var i = selector_ratio_btns.length - 1; i >= 0; i--) {

			selector_ratio_btns[i].addEventListener("click", function(event) {
				var ratio = event.target.dataset.ratio;
				$("#image_to_process").cropper("setAspectRatio", ratio);
				console.log("[调试] ratio ", ratio);
			});
		};

		var action_btns = document.body.querySelectorAll("[data-cropper-method]");
		console.log("[调试] action_btns", action_btns);
		for (var i = action_btns.length - 1; i >= 0; i--) {
			// console.log("[调试] action_btns[i] dataset ", action_btns[i].dataset);
			var method = action_btns[i].dataset.cropperMethod;
			if (method != undefined && method != '') {
				action_btns[i].addEventListener("click", function(event) {
					var action_btn = event.currentTarget;
					var methodOption = action_btn.getAttribute("method-option");
					console.log("[调试] 第一个参数是", action_btn, methodOption);
					if (methodOption != undefined) {

						var methodSecondOption = action_btn.getAttribute("method-second-option");
						console.log("[调试] 第二个参数是", methodSecondOption);
						if (methodSecondOption != undefined) {

							$("#image_to_process").cropper(action_btn.dataset.cropperMethod, methodOption, methodSecondOption);
						} else {

							$("#image_to_process").cropper(action_btn.dataset.cropperMethod, methodOption);
							if (action_btn.dataset.cropperMethod == "scaleX" || action_btn.dataset.cropperMethod == "scaleY") {
								action_btn.setAttribute("method-option", -methodOption);
							};
						}

					} else {
						console.log("[调试] 系统命令，无参数");
						$("#image_to_process").cropper(action_btn.dataset.cropperMethod);
					}
					event.preventDefault();
				});
			};

		};

		var cropper_size_width_input = document.body.querySelector("#cropper_save_dialog #cropper_size_width");
		var cropper_size_height_input = document.body.querySelector("#cropper_save_dialog #cropper_size_height");
		cropper_size_width_input.addEventListener("change", function(event) {
			var width_input = event.target;
			var div_refer = width_input.parentElement;

			var tmp_element = div_refer.nextElementSibling;
			while (!tmp_element.classList.contains("checkbox")) {
				tmp_element = tmp_element.nextElementSibling;
			}
			var check_input_item = tmp_element.querySelector("#size_lock_ratio");
			console.log("[调试] width: checkbox status ", check_input_item.checked, check_input_item.value);
			if (check_input_item.checked) {
				var assistant_img_size_adjust = document.body.querySelector("#assistant_img_size_adjust");
				//html5居然也可以使用冒号:，擦
				var cropper_type = assistant_img_size_adjust.querySelector("input[name=cropper_type]:checked").value;
				if (cropper_type == "cropper_type_ratio") {
					cropper_size_height_input.value = width_input.value;
				};
				if (cropper_type == "cropper_type_pixel") {
					var origin_canvas = document.body.querySelector("#cropper_result_div").querySelector("canvas");
					var height = (width_input.value * origin_canvas.height) / origin_canvas.width;
					cropper_size_height_input.value = height;
				};

			};
		});

		cropper_size_height_input.addEventListener("change", function() {
			var height_input = event.target;
			var div_refer = height_input.parentElement;

			var tmp_element = div_refer.nextElementSibling;
			while (!tmp_element.classList.contains("checkbox")) {
				tmp_element = tmp_element.nextElementSibling;
			}
			var check_input_item = tmp_element.querySelector("#size_lock_ratio");
			console.log("[调试] height: checkbox status ", check_input_item.checked, check_input_item.value);
			if (check_input_item.checked) {
				var assistant_img_size_adjust = document.body.querySelector("#assistant_img_size_adjust");
				//html5居然也可以使用冒号:，擦
				var cropper_type = assistant_img_size_adjust.querySelector("input[name=cropper_type]:checked").value;
				if (cropper_type == "cropper_type_ratio") {
					cropper_size_width_input.value = height_input.value;
				};
				if (cropper_type == "cropper_type_pixel") {
					var origin_canvas = document.body.querySelector("#cropper_result_div").querySelector("canvas");
					var width = (height_input.value * origin_canvas.width) / origin_canvas.height;
					cropper_size_width_input.value = width;
				}
			};
		});
		var restore_image_size_btn = document.body.querySelector("#restore_img_size_btn");
		restore_image_size_btn.addEventListener("click", function(){
			var origin_img = document.body.querySelector("#cropper_result_div").querySelector("#origin_img");
			var target_img = document.body.querySelector("#cropper_result_div").querySelector("#target_img");

			var last_width = origin_img.dataset.lastWidth;
			var last_height = origin_img.dataset.lastHeight;
			var target_canvas = document.createElement("canvas");

			target_canvas.width = last_width;
			target_canvas.height = last_height;
			console.log("[调试] 恢复为 长", last_width, "高为 ", last_height);
			var target_ctx = target_canvas.getContext("2d");
			// console.log("[调试] 目标canvas的长为：", cropper_size_width, "高为：", cropper_size_height);
			if (undefined != origin_img) {
				// target_ctx.scale(cropper_size_width_ratio, cropper_size_height_ratio);
				target_ctx.drawImage(origin_img, 0, 0,last_width, last_height);
			};

			// $("#cropper_save_dialog").modal('show').find("#cropper_result_div").append($(target_canvas));
			target_img.src = target_canvas.toDataURL();
			target_img.width = target_canvas.width;
			target_img.height = target_canvas.height;
			origin_img.dataset.lastWidth = null;
			origin_img.dataset.lastHeight = null;
			restore_image_size_btn.disabled = true;

			$("#cropper_save_dialog").find("#cropper_download_btn").attr('href', target_canvas.toDataURL());			
		});
		var adjust_image_size_btn = document.body.querySelector("#adjust_img_size_btn");
		adjust_img_size_btn.addEventListener("click", function() {
			// var origin_canvas = document.body.querySelector("#cropper_result_div").querySelector("canvas");
			var origin_img = document.body.querySelector("#cropper_result_div").querySelector("#origin_img");
			var target_img = document.body.querySelector("#cropper_result_div").querySelector("#target_img");
			var assistant_img_size_adjust = document.body.querySelector("#assistant_img_size_adjust");
			//html5居然也可以使用冒号:，擦
			var cropper_type = assistant_img_size_adjust.querySelector("input[name=cropper_type]:checked").value;
			var cropper_size_width = 0; assistant_img_size_adjust.querySelector("#cropper_size_width").value;
			var cropper_size_height = 0; assistant_img_size_adjust.querySelector("#cropper_size_height").value;
			var cropper_size_width_ratio = 1;
			var cropper_size_height_ratio = 1;
			if (cropper_type == "cropper_type_ratio") {

				cropper_size_width_ratio = assistant_img_size_adjust.querySelector("#cropper_size_width").value;
				cropper_size_height_ratio = assistant_img_size_adjust.querySelector("#cropper_size_height").value;

				var origin_size_width = target_img.width;
				var origin_size_height = target_img.height;
				cropper_size_width = origin_size_width*cropper_size_width_ratio  ;
				cropper_size_height = origin_size_height*cropper_size_height_ratio  ;
			}
			
			var target_canvas = document.createElement("canvas");

			target_canvas.width = cropper_size_width;
			target_canvas.height = cropper_size_height;

			var target_ctx = target_canvas.getContext("2d");
			// console.log("[调试] 目标canvas的长为：", cropper_size_width, "高为：", cropper_size_height);
			if (undefined != target_img) {
				// target_ctx.scale(cropper_size_width_ratio, cropper_size_height_ratio);
				target_ctx.drawImage(target_img, 0, 0,cropper_size_width, cropper_size_height);
			};

			// $("#cropper_save_dialog").modal('show').find("#cropper_result_div").append($(target_canvas));
			target_img.src = target_canvas.toDataURL();
			origin_img.dataset.lastWidth = target_img.width;
			origin_img.dataset.lastHeight = target_img.height;			
			target_img.width = target_canvas.width;
			target_img.height = target_canvas.height;

			restore_image_size_btn.disabled = false;

			$("#cropper_save_dialog").find("#cropper_download_btn").attr('href', target_canvas.toDataURL());
		});

		var save_cropper_btn = document.body.querySelector("#save_cropper_btn");
		save_cropper_btn.addEventListener("click", function() {
			var result = $("#image_to_process").cropper("getCroppedCanvas");
			var img_element = document.createElement("img");
			img_element.width = result.width;
			img_element.height = result.height;
			img_element.id = "origin_img";

			img_element.src = result.toDataURL("image/jpeg");
			var clone_img_element = img_element.cloneNode(true);
			clone_img_element.id = "target_img";
			img_element.style.display = "none";
			$("#cropper_save_dialog").modal('show').find("#cropper_result_div").css("overflow", "scroll").html("").append($(img_element)).append($(clone_img_element));

			$("#cropper_save_dialog").find("#cropper_download_btn").attr('href', result.toDataURL());
		});

	}
	toolbar_init();
});