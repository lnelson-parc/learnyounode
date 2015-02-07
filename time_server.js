/**
 * Created by lnelson on 2/6/15.
 */
/** @module time_server */

var net = require('net');
var process = require('process');
var strftime = require('strftime');
var testing = false;

function listen(port) {
    var server = net.createServer();
    server.listen(port);
    server.on('connection', function(socket) {
        socket.end(strftime("%Y-%m-%d %H:%M\n", new Date()));
    });
    return server;
}

function value(argument) {
    return isNaN(+argument) ? argument : +argument
}

function test_client(port, serving) {
    var HOST = '127.0.0.1';

    var test_connection = new net.Socket();
    test_connection.connect(port, HOST, function() {

        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
        //test_connection.write('Chuck Norris is Lone Woof');

    });
    test_connection.on('data', function(data) {
        // Close the client socket completely
        console.log(data.toString());
        test_connection.destroy();

    });

    test_connection.on('close', function() {
        serving.close();
    });
}


function get_argument_or_default(args, argument_index, a_default) {
    return args.length > argument_index ? args[argument_index] : a_default;
}

function action(args) {
    var on_the_port = value(get_argument_or_default(args, 2, 8910));
    var serving = listen(on_the_port);

    if (testing)
        test_client(on_the_port, serving)
}


action(process.argv);
