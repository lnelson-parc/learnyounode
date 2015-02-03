/** @module firstio */
/**
 * Created by lnelson on 2/2/15.
 */

/** Return file contents as a string
 * @param {string} path_to_file Full path name for file to process
 * @return {string} Numeric file contents as a string
 */
function get_file_content(path_to_file) {
    var fs = require('fs');
    return fs.readFileSync(path_to_file).toString();
}


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

/** Main action for this module: count newlines
 * @param {string[]} args An argument list
 * @return {number} Numeric summation of an argument list
 */
function action(args) {
    if (args.length < 3) {
        var content = get_file_content(__dirname + "/seven_lines.txt");
         return count_lines(content);
    } else {
        return count_lines(get_file_content(args[2]));
    }
}

console.log(action(process.argv));
