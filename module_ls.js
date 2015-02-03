/**
 * Created by lnelson on 2/3/15.
 */
/** @module filtered_ls */
/**
 * Created by lnelson on 2/2/15.
 */
var fs = require('fs');
var path = require('path');

/** Return file contents as a string (via async call
 * @param {string} path_to_file Full path name for file to process
 * @param {string} extension_filter File extensions to match
 * @param {function} callback Function to call with result
 */
function get_folder_list_async(path_to_file, extension_filter, callback) {
    fs.readdir(path_to_file, function (err, files) {
        if (err)
            return callback(err); // early return

        function Process(previousArray, currentValue) {
            // If currentValue matches the filter,
            // append currentValue to the array.
            var this_extension = path.extname(currentValue);
            var nextArray;
            if (this_extension && (this_extension == "." + extension_filter))
                nextArray = previousArray.concat(currentValue);
            else
                nextArray = previousArray;

            // If this is not the last call by the reduce method,
            // the returned array is previousArray on the next call.
            // If this is the last call by the reduce method, the
            // returned array is the return value of the reduce method.
            return nextArray;
        }


        var emptyArray = [];
        var resultArray = files.reduce(Process, emptyArray);
        callback(null, resultArray);
    });
}

module.exports = get_folder_list_async;

/*
function test_callback(err, data) {
    if (err)
        console.log(err.toString())
    data.map(function (file_name) {
        console.log(file_name);
    })
}
*/
/** Main action for this module: count newlines
 * @param {string[]} args An argument list
 */
/*
function action(args) {
    var path_to_folder = __dirname;
    var extension_filter = "js";
    if (args.length >= 3) {
        path_to_folder = args[2]
    }
    if (args.length >= 4) {
        extension_filter = args[3]
    }
    get_folder_list_async(path_to_folder, extension_filter, test_callback);
}

if (process.argv.length < 3)
    action(process.argv);
*/