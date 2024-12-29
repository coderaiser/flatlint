import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens/index.js';
import * as addMissingRoundBraces from './plugins/add-missing-round-braces/index.js';
import * as addMissingQuote from './plugins/add-missing-quote/index.js';
import * as convertCommaToSemicolon from './plugins/convert-comma-to-semicolon/index.js';
import * as removeUselessRoundBrace from './plugins/remove-useless-round-brace/index.js';

export const plugins = [
    ['wrap-assignment-in-parens', wrapAssignmentInParens],
    ['add-missing-round-braces', addMissingRoundBraces],
    ['add-missing-quote', addMissingQuote],
    ['convert-comma-to-semicolon', convertCommaToSemicolon],
    ['remove-useless-round-brace', removeUselessRoundBrace],
];
