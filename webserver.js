var http = require("http");
var server = http.createServer();
server.on("request", function(request, response){
	if (request.url == "/testcon") {
		var body = "First Server Response!!";
		var headers = {
			"Content-Length":body.length,
			"Content-Type":"text/plain"
		};
		response.writeHead("200", "ok", headers);
		response.write(body);
		response.end();
	};
}).listen(8081);

console.log("[debug] server start");