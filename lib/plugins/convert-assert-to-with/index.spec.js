import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-assert-to-with', plugin],
    ],
});

test('flatlint: convert-assert-to-with: report', (t) => {
    t.report('convert-assert-to-with', `Use 'with' instead of 'assert'`);
    t.end();
});

test('flatlint: convert-assert-to-with: transform', (t) => {
    t.transform('convert-assert-to-with');
    t.end();
});
