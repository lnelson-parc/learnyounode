/**
 * Created by lnelson on 2/3/15.
 */
/** @module http_collect_by_args */
/**
 * Created by lnelson on 2/2/15.
 */
var http = require('http');
var process = require('process');
var bl = require('bl');


function action(args) {
    var collection = ["","",""];
    var collected = 0;

    function is_collected() {
        if (collected++ > 1) {
            collection.map(function (data) {console.log(data.toString().replace(/\r?\n|\r/g,""))});
        }
    }
    http.get(args[2], function (res) {
        res.pipe(bl(function (err, data) {
            // `data` is a complete Buffer object containing the full data
            collection[0] = data.toString();
        }));
        res.on('end', is_collected);
    });
    http.get(args[3], function(res) {
        res.pipe(bl(function (err, data) {
            // `data` is a complete Buffer object containing the full data
            collection[1] = data.toString();
        }));
        res.on('end',is_collected);
    });
    http.get(args[4], function(res) {
        res.pipe(bl(function (err, data) {
            // `data` is a complete Buffer object containing the full data
            collection[2] = data.toString();
        }));
        res.on('end',is_collected);
    });
    /*
    args.slice(2,args.length).map(function (the_url) {
        http.get(the_url, function(res) {
            res.pipe(bl(function (err, data) {
                // `data` is a complete Buffer object containing the full data
                collection[i++] = data.toString();
            }));
            res.on('end',is_collected);
        });
    });
    */
}
action(process.argv);
