var Stack = function() {}

Stack.prototype = {
    Init: function() {
        this.STACKMAX = 100;
        this.stack = new Array(this.STACKMACK);
        this.top = -1;
        return this.stack;
    },
    Empty: function() {
        if (this.top == -1) {
            return true;
        } else {
            return false;
        }
    },
    Push: function(elem) {
        if (this.top == this.STACKMAX - 1) {
            return "栈满";
        } else {
            this.top++;
            this.stack[this.top] = elem;
        }
    },
    Pop: function() {
        if (this.top == -1) {
            return "空栈,无法删除栈顶元素！";
        } else {
            var x = this.stack[this.top];
            this.top--;
            return x;
        }
    },
    Top: function() {
        if (this.top != -1) {
            return this.stack[this.top];
        } else {
            return "空栈，顶元素无返回值！";
        }
    },
    Clear: function() {
        this.top = -1;
    },
    Length: function() {
        return this.top + 1;
    }
}

var JSONPRequest = window.JSONPRequest || {};

JSONPRequest.importScript = (function(container){

        function scriptLoadError (error){
            throw new URIError("[错误] javascript脚本"+error.target.src+"载入错误");
        }

        return function(srcUrl, callback){
            var jscript = document.createElement("script");
            jscript.type = "text/javascript";
            jscript.onerror = scriptLoadError;
            if (callback) {jscript.onload = callback;}
            container.appendChild(jscript);
            jscript.src = srcUrl;
        };
    })(document.body);

JSONPRequest.send = function(url, callback){
    console.log("[调试] jsonp this ", this);
    var uniqueID = "weibo_"+ Math.floor(Math.random() * 1000) + new Date().getTime().toString();
    var jsonp_url = url+"&callback="+uniqueID;
    window[uniqueID] = callback;
    this.importScript(jsonp_url, function(event){
        console.log("[调试] javascript脚本"+event.target.src+"载入完成");
        window[uniqueID] = null;
    });
};

window.JSONPRequest = JSONPRequest;