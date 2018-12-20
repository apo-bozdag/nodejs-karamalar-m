const http = require('http');

const server = http.createServer((request, response) => {
    console.log("bir istekte bulunuldu.");
    console.log(request.url);

    response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    response.write("<b>merhaba</b> dünya");
    response.end();
});

server.listen(3000);
console.log("http://localhost:3000");