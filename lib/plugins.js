import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens/index.js';
import * as addMissingRoundBraces from './plugins/add-missing-round-braces/index.js';
import * as convertCommaToSemicolon from './plugins/convert-comma-to-semicolon/index.js';

export const plugins = [
    ['wrap-assignment-in-parens', wrapAssignmentInParens],
    ['add-missing-round-braces', addMissingRoundBraces],
    ['convert-comma-to-semicolon', convertCommaToSemicolon],
];
