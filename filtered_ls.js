/** @module filtered_ls */
/**
 * Created by lnelson on 2/2/15.
 */
var fs = require('fs');
var path = require('path');

/** Return file contents as a string (via async call
 * @param {string} path_to_file Full path name for file to process
 * @param {string} extension_filter File extensions to match
 */
function get_folder_list_async(path_to_file, extension_filter) {
    fs.readdir(path_to_file, function (err, files) {
        if (!err) {
            files.map(function (file_name) {
                var this_extension = path.extname(file_name);
                if (this_extension && (this_extension == "." + extension_filter))
                {
                    console.log(file_name);
                }
            })
        }
    });
}

/** Main action for this module: count newlines
 * @param {string[]} args An argument list
 */
function action(args) {
    var path_to_folder = __dirname;
    var extension_filter = "js";
    if (args.length >= 3) {
        path_to_folder = args[2]
    }
    if (args.length >= 4) {
        extension_filter = args[3]
    }
    get_folder_list_async(path_to_folder, extension_filter);
}

action(process.argv);
