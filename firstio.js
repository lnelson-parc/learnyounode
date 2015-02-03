/** @module firstio */
/**
 * Created by lnelson on 2/2/15.
 */
var async = true;
var fs = require('fs');

/** Return number of newlines in a string
 * @param {string} content File content as a string
 * @return {int} Number of newlines in string
 */
function count_lines(content) {
    if (!content) {
        return 0;
    } else {
        var newlines = content.split('\n').length;
        if (content.slice(-1) != '\n') {
            newlines--;
        }
        return newlines;
    }
}

/** Callback for async file access to return contents as a string
 * @param {boolean} err Full path name for file to process
 * @param {Buffer} data Value of returned content
 * @return {string} Contents as a string
 */
function read_file_callback (err, data) {
    var counter = 0;
    if (!err) {
        counter = count_lines(data.toString());
    }
    console.log(counter);
}

/** Return file contents as a string
 * @param {string} path_to_file Full path name for file to process
 * @return {string} Numeric file contents as a string
 */
function get_file_content(path_to_file) {
    return fs.readFileSync(path_to_file).toString();
}

/** Return file contents as a string (via async call
 * @param {string} path_to_file Full path name for file to process
 * @return {string} Numeric file contents as a string
 */
function get_file_content_async(path_to_file) {
    fs.readFile(path_to_file, read_file_callback);
}

/** Main action for this module: count newlines
 * @param {string[]} args An argument list
 * @param {boolean} is_async Is this tutorial 3 or 4?
 * @return {number} Numeric summation of an argument list
 */
function action(args,is_async) {
    var path_to_file = __dirname + "/seven_lines.txt";
    if (args.length >= 3) {
        path_to_file = args[2]
    }
    if (is_async) {
        get_file_content_async(path_to_file);
    } else {
        console.log(count_lines(get_file_content(path_to_file)));
    }
}

action(process.argv,async);
