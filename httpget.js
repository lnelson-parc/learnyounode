/**
 * Created by lnelson on 2/3/15.
 */
/** @module httpget */
/**
 * Created by lnelson on 2/2/15.
 */
var http = require('http');
var process = require('process');

function action(args) {
    var the_url = 'http://lesternelson.com';
    if (args.length >= 3) {
        the_url = args[2]
    }
    http.get(the_url, function(res) {
        res.setEncoding('utf-8');
        res.on('data', function (chunk) {
            console.log(chunk);
        });
    });
}


action(process.argv);
