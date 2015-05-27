/**
 * Created by Daniel on 2015/5/26.
 */


/*var http = require('http');

http.createServer(function(req,res){

    /*
    // 在页面上显示Hello World!
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello World!');
    */

    /*
    // 规范化url，去掉查询字符串、可选的反斜杠，并把它变成小写
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
        case  '':
            res.writeHead(200,{ 'Content-Type': 'text/plain' });
            res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200,{ 'Content-Type': 'text/plain' });
            res.end('About');
            break;
        default:
            res.writeHead(404,{ 'Content-Type': 'text/plain' });
            res.end('Not Found');
            break;
    }

}).listen(3000);*/

// 静态资源服务
var http = require('http'), fs = require('fs');

function serveStaticFile(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if(err){
            res.writeHead(500, { 'Conten-Type':'text/plain' });
            res.end('500 - Internal Error');
        }else{
            res.writeHead(responseCode,{ 'Content-Type': contentType });
            res.end(data);
        }
    });
}
http.createServer(function(req,res){
    // 规范化url，去掉查询字符串、可选的反斜杠，并把它变成小写
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path){
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/img/logo':
            serveStaticFile(res, '/public/img/logo.png', 'image/jpeg');
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html',404);
            break;
    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate......');