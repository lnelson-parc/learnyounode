/**
 * Created by lnelson on 2/6/15.
 */
/** @module time_server */

var http = require('http');
var process = require('process');
var fs = require('fs');
var testing = true;

function listen(port, path) {
    var server = http.createServer(function (request, response) {
        var file_stream = fs.createReadStream(path);
        file_stream.pipe(response);
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
    var file_path = get_argument_or_default(args, 3, "/Users/lnelson/WebstormProjects/learnyounode/seven_lines.txt");
    listen(on_the_port, file_path);
    //setTimeout(function () {process.exit();}, 5000);
}


action(process.argv);

