$(document).ready(function() {
	$("button#options_btn").click(function(event) {
		/* Act on the event */
chrome.runtime.openOptionsPage();
		// if (chrome.runtime.openOptionsPage) {
		// 	// New way to open options pages, if supported (Chrome 42+).
		// 	chrome.runtime.openOptionsPage();
		// } else {
		// 	// Reasonable fallback.
		// 	window.open(chrome.runtime.getURL('options.html'));
		// }


	});
});