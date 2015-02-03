/** Addition as a function
 * @param {string} a First operand
 * @param {string} b Second operand
 * @return {number} Numeric summation of operands
 */ 
function add(a, b) {
    return parseInt(a) + parseInt(b);
}

/** Main action for this module: sum command line arguments
 * @param {string[]} args An argument list
 * @return {number} Numeric summation of an argument list
 */
function action(args) {
    if (args.length < 2) {
       return 0;
    } else {
       return args.slice(2,args.length).reduce(add,0);
    }
}

console.log(action(process.argv));
