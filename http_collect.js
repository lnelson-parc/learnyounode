/**
 * Created by lnelson on 2/3/15.
 */
/** @module http_collect */
/**
 * Created by lnelson on 2/2/15.
 */
var http = require('http');
var process = require('process');
var bl = require('bl');

function action(args) {
    var the_url = 'http://lesternelson.com';
    if (args.length >= 3) {
        the_url = args[2]
    }
    http.get(the_url, function(res) {
        /*res.setEncoding('utf-8');*/
        res.pipe(bl(function (err, data) {
            // `data` is a complete Buffer object containing the full data
            console.log(data.toString().length);
            console.log(data.toString());
        }));
    });
}


action(process.argv);
