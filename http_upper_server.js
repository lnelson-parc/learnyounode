/**
 * Created by lnelson on 2/6/15.
 */
/** @module http_upper_server */

var http = require('http');
var process = require('process');
var fs = require('fs');
var testing = true;
var map = require('through2-map');

function listen(port) {
    var server = http.createServer(function (request, response) {
        if (request.method == 'POST') {
            request.pipe(map(function (chunk) {
                return chunk.toString().toUpperCase();
            })).pipe(response)
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
    setTimeout(function () {process.exit();}, 5000);
}

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


action(process.argv);

