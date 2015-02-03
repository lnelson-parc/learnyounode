/**
 * Created by lnelson on 2/3/15.
 */
/** @module call_module_ls */
/**
 * Created by lnelson on 2/2/15.
 */
var module_ls = require('./module_ls');

function test_callback(err, data) {
    if (err)
        console.log(err.toString());
    data.map(function (file_name) {
        console.log(file_name);
    })
}

function action(args) {
    var path_to_folder = __dirname;
    var extension_filter = "js";
    if (args.length >= 3) {
        path_to_folder = args[2]
    }
    if (args.length >= 4) {
        extension_filter = args[3]
    }
    module_ls(path_to_folder, extension_filter, test_callback);
}

action(process.argv);
