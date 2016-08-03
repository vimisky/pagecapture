/*
    可以实现：
    1. 选择区域截图
    2. 可视区域截图
    3. 整张网页截图

*/

var screenshot = {
    tab: 0,
    canvas: document.createElement("canvas"),
    startX: 0,
    startY: 0,
    scrollX: 0,
    scrollY: 0,
    docHeight: 0,
    docWidth: 0,
    visibleWidth: 0,
    visibleHeight: 0,
    scrollXCount: 0,
    scrollYCount: 0,
    scrollBarX: 17,
    scrollBarY: 17,
    captureStatus: true,
    addMessageListener: function() {
        chrome.extension.onRequest.addListener(function(c, b, a) {
            var d = c;
            switch (d.msg) {
            case "capture_selected":
                screenshot.captureSelected();
                break;
            case "capture_window":
                screenshot.captureWindow();
                break;
            case "capture_area":
                screenshot.showSelectionArea();
                break;
            case "capture_webpage":
                screenshot.captureWebpage();
                break
            }
        })
    },
    sendMessage: function(a, b) {
        chrome.tabs.getSelected(null, function(c) {
            chrome.tabs.sendRequest(c.id, a, b)
        })
    },
    captureWindow: function() {
        screenshot.sendMessage({
            msg: "capture_window"
        }, screenshot.onResponseVisibleSize)
    },
    captureWebpage: function() {
        screenshot.sendMessage({
            msg: "scroll_init"
        }, screenshot.onResponseVisibleSize)
    },
    showSelectionArea: function() {
        screenshot.sendMessage({
            msg: "show_selection_area"
        }, null)
    },
    captureSelected: function() {
        screenshot.sendMessage({
            msg: "capture_selected"
        }, screenshot.onResponseVisibleSize)
    },
    captureVisible: function(c, b, d) {
        var a = localStorage.screenshootQuality || "png";
        chrome.tabs.captureVisibleTab(null, {
            format: a,
            quality: 50
        }, function(e) {
            var f = new Image();
            f.onload = function() {
                var i = f.height < b ? f.width - 17 : f.width;
                var g = f.width < c ? f.height - 17 : f.height;
                screenshot.canvas.width = i;
                screenshot.canvas.height = g;
                var h = screenshot.canvas.getContext("2d");
                h.drawImage(f, 0, 0, i, g, 0, 0, i, g);
                screenshot.postImage(d)
            };
            f.src = e
        })
    },
    captureAndScroll: function(b) {
        var a = localStorage.screenshootQuality || "png";
        chrome.tabs.captureVisibleTab(null, {
            format: a,
            quality: 50
        }, function(c) {
            var d = new Image();
            d.onload = function() {
                var g = screenshot.canvas.getContext("2d");
                var f = 0;
                var m = 0;
                screenshot.scrollBarY = screenshot.visibleHeight < screenshot.docHeight ? 17 : 0;
                screenshot.scrollBarX = screenshot.visibleWidth < screenshot.docWidth ? 17 : 0;
                var j = (d.width - screenshot.scrollBarY < screenshot.canvas.width ? d.width - screenshot.scrollBarY : screenshot.canvas.width);
                var i = (d.height - screenshot.scrollBarX < screenshot.canvas.height ? d.height - screenshot.scrollBarX : screenshot.canvas.height);
                var n = screenshot.zoom;
                var h = screenshot.startX - Math.round(screenshot.scrollX * n);
                var e = 0;
                var l = screenshot.startY - Math.round(screenshot.scrollY * n);
                var k = 0;
                if ((screenshot.scrollYCount + 1) * j > screenshot.canvas.width) {
                    f = screenshot.canvas.width % j;
                    h = (screenshot.scrollYCount + 1) * j - screenshot.canvas.width + screenshot.startX - screenshot.scrollX
                } else {
                    f = j
                }
                if ((screenshot.scrollXCount + 1) * i > screenshot.canvas.height) {
                    m = screenshot.canvas.height % i;
                    if ((screenshot.scrollXCount + 1) * i + screenshot.scrollY < screenshot.docHeight) {
                        l = 0
                    } else {
                        l = (screenshot.scrollXCount + 1) * i + screenshot.scrollY - screenshot.docHeight
                    }
                } else {
                    m = i
                }
                e = screenshot.scrollYCount * j;
                k = screenshot.scrollXCount * i;
                g.drawImage(d, h, l, f, m, e, k, f, m);
                screenshot.sendMessage({
                    msg: "scroll_next",
                    visibleWidth: j,
                    visibleHeight: i
                }, screenshot.onResponseVisibleSize)
            };
            d.src = c
        })
    },
    captureAndScrollDone: function(a) {
        screenshot.postImage(a)
    },
    postImage: function(a) {
        chrome.tabs.getSelected(null, function(b) {
            screenshot.tab = b;
            screenshot.page_info = a
        });
        chrome.tabs.create({
            url: "showimage.html"
        })
    },
    onResponseVisibleSize: function(a) {
        switch (a.msg) {
        case "capture_window":
            screenshot.captureVisible(a.docWidth, a.docHeight, a.page_info);
            break;
        case "scroll_init_done":
            screenshot.startX = a.startX, screenshot.startY = a.startY, screenshot.scrollX = a.scrollX, screenshot.scrollY = a.scrollY, screenshot.canvas.width = a.canvasWidth;
            screenshot.canvas.height = a.canvasHeight;
            screenshot.visibleHeight = a.visibleHeight, screenshot.visibleWidth = a.visibleWidth, screenshot.scrollXCount = a.scrollXCount;
            screenshot.scrollYCount = a.scrollYCount;
            screenshot.docWidth = a.docWidth;
            screenshot.docHeight = a.docHeight;
            screenshot.zoom = a.zoom;
            setTimeout(function() {
                screenshot.captureAndScroll(a.page_info)
            }, 100);
            break;
        case "scroll_next_done":
            screenshot.scrollXCount = a.scrollXCount;
            screenshot.scrollYCount = a.scrollYCount;
            setTimeout(function() {
                screenshot.captureAndScroll(a.page_info)
            }, 100);
            break;
        case "scroll_finished":
            screenshot.captureAndScrollDone(a.page_info);
            break
        }
    },
    executeScriptsInExistingTabs: function() {
        chrome.windows.getAll(null, function(b) {
            for (var a = 0; a < b.length; ++a) {
                chrome.tabs.getAllInWindow(b[a].id, function(d) {
                    for (var c = 0; c < d.length; ++c) {
                        try {
                            chrome.tabs.executeScript(d[c].id, {
                                file: "js/page.js"
                            })
                        } catch (f) {}
                    }
                })
            }
        })
    },
    init: function() {
        localStorage.screenshootQuality = localStorage.screenshootQuality || "png";
        screenshot.executeScriptsInExistingTabs();
        screenshot.addMessageListener()
    }
};
screenshot.init();