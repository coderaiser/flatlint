import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wrap-assignment-in-parens', plugin],
    ],
});

test('tklint: wrap-assignment-in-parens: report', (t) => {
    t.report('wrap-assignment-in-parens', `Wrap the assignment in parentheses after '&&'`);
    t.end();
});

test('tklint: wrap-assignment-in-parens: transform', (t) => {
    t.transform('wrap-assignment-in-parens');
    t.end();
});
