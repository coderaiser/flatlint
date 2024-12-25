import {lint} from '../lib/tklint.js';
import {parse} from '../lib/tokenizer/index.js';
// Example source code
// Example plugin array (can include multiple plugins)
import * as wrapAssignmentInParens from '../lib/plugins/wrap-assignment-in-parens.js';

// Example source code
// Example plugin array (can include multiple plugins)
const sourceCode = 'a && b = c;';

const tokens = parse(sourceCode);
const [lintedCode, issues] = lint(tokens, {
    fix: true,
    plugins: [wrapAssignmentInParens], // Add your plugins here
});

console.log('Linted Code:', lintedCode); // Output: "a && b === c"
console.log('Issues:', issues); // Output: issues with messages about the equality operator
// Output: issues with messages about the equality operator
