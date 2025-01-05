import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens/index.js';
import * as addMissingRoundBraces from './plugins/add-missing-round-braces/index.js';
import * as addMissingSquireBrace from './plugins/add-missing-square-brace/index.js';
import * as addMissingQuote from './plugins/add-missing-quote/index.js';
import * as convertCommaToSemicolon from './plugins/convert-comma-to-semicolon/index.js';
import * as convertFromToRequire from './plugins/convert-from-to-require/index.js';
import * as removeUselessRoundBrace from './plugins/remove-useless-round-brace/index.js';
import * as addConstToExport from './plugins/add-const-to-export/index.js';
import * as addMissingSemicolon from './plugins/add-missing-semicolon/index.js';

export const plugins = [
    ['wrap-assignment-in-parens', wrapAssignmentInParens],
    ['add-missing-round-braces', addMissingRoundBraces],
    ['add-missing-squire-brace', addMissingSquireBrace],
    ['add-missing-quote', addMissingQuote],
    ['add-missing-semicolon', addMissingSemicolon],
    ['add-const-to-export', addConstToExport],
    ['convert-comma-to-semicolon', convertCommaToSemicolon],
    ['convert-from-to-require', convertFromToRequire],
    ['remove-useless-round-brace', removeUselessRoundBrace],
];
