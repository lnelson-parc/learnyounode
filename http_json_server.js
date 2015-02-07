/**
 * Created by lnelson on 2/6/15.
 */
/** @module http_json_server */

var http = require('http');
var process = require('process');
var fs = require('fs');
var url = require('url');

function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}

function listen(port) {
    var server = http.createServer(function (request, response) {
        if (request.method == 'GET') {
            console.log(request.url);
            var this_query = url.parse(request.url, true).query;
            console.log(this_query);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            var new_date = new Date(Date.parse(this_query.iso));
            if (startsWith(request.url,'/api/parsetime?')) {
                var json_date = JSON.stringify({
                    hour: new_date.getHours(),
                    minute: new_date.getMinutes(),
                    second: new_date.getSeconds()
                });
                response.end(json_date);
            } else if (startsWith(request.url,'/api/unixtime?')) {
                 json_date = JSON.stringify({
                    unixtime: new_date.getTime()
                });
                response.end(json_date);
            }
        }
    });
    server.listen(port);
    //return server;
}

function value(argument) {
    return isNaN(+argument) ? argument : +argument
}


function get_argument_or_default(args, argument_index, a_default) {
    return args.length > argument_index ? args[argument_index] : a_default;
}

function action(args) {
    var on_the_port = value(get_argument_or_default(args, 2, 8910));
    listen(on_the_port);
    setTimeout(function () {process.exit();}, 10000);
}

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


action(process.argv);

