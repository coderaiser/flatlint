import * as addMissingArrow from './plugins/add-missing-arrow/index.js';
import * as addMissingAssign from './plugins/add-missing-assign/index.js';
import * as addMissingCurlyBrace from './plugins/add-missing-curly-brace/index.js';
import * as addMissingRoundBrace from './plugins/add-missing-round-brace/index.js';
import * as addMissingSquireBrace from './plugins/add-missing-square-brace/index.js';
import * as addMissingQuote from './plugins/add-missing-quote/index.js';
import * as addMissingSemicolon from './plugins/add-missing-semicolon/index.js';
import * as addMissingComma from './plugins/add-missing-comma/index.js';
import * as addConstToExport from './plugins/add-const-to-export/index.js';
import * as applyImportOrder from './plugins/apply-import-order/index.js';
import * as convertCommaToSemicolon from './plugins/convert-comma-to-semicolon/index.js';
import * as convertFromToRequire from './plugins/convert-from-to-require/index.js';
import * as removeUselessComma from './plugins/remove-useless-comma/index.js';
import * as removeUselessDot from './plugins/remove-useless-dot/index.js';
import * as removeInvalidCharacter from './plugins/remove-invalid-character/index.js';
import * as removeUselessRoundBrace from './plugins/remove-useless-round-brace/index.js';
import * as convertSemicolonToComma from './plugins/convert-semicolon-to-comma/index.js';
import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens/index.js';

export const plugins = [
    ['add-missing-semicolon', addMissingSemicolon],
    ['add-missing-arrow', addMissingArrow],
    ['add-missing-assign', addMissingAssign],
    ['add-missing-curly-brace', addMissingCurlyBrace],
    ['add-missing-round-brace', addMissingRoundBrace],
    ['add-missing-squire-brace', addMissingSquireBrace],
    ['add-missing-comma', addMissingComma],
    ['add-missing-quote', addMissingQuote],
    ['add-const-to-export', addConstToExport],
    ['apply-import-order', applyImportOrder],
    ['convert-comma-to-semicolon', convertCommaToSemicolon],
    ['convert-semicolon-to-comma', convertSemicolonToComma],
    ['convert-from-to-require', convertFromToRequire],
    ['remove-useless-comma', removeUselessComma],
    ['remove-useless-round-brace', removeUselessRoundBrace],
    ['remove-useless-dot', removeUselessDot],
    ['remove-invalid-character', removeInvalidCharacter],
    ['wrap-assignment-in-parens', wrapAssignmentInParens],
];
