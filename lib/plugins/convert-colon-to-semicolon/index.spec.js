import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-colon-to-semicolon', plugin],
    ],
});

test('flatlint: convert-colon-to-semicolon: report', (t) => {
    t.report('convert-colon-to-semicolon', `Use ';' instead of ':'`);
    t.end();
});

test('flatlint: convert-colon-to-semicolon: transform', (t) => {
    t.transform('convert-colon-to-semicolon');
    t.end();
});
