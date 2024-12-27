import {createTest} from '@putout/test';
import * as plugin from './index.js';
import {lint} from '../../tklint.js';

const test = createTest(import.meta.url, {
    lint,
    plugins: [
        ['wrap-assignment-in-parens', plugin],
    ],
});

test.only('tklint: wrap-assignment-in-parens', (t) => {
    debugger;
    
    t.report('wrap-assignment-in-parens', `Wrap the assignment in parentheses after '&&'`);
    t.end();
});

test.only('tklint: wrap-assignment-in-parens', (t) => {
    t.transform('wrap-assignment-in-parens');
    t.end();
});
