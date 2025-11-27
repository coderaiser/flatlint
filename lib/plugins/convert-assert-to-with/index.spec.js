import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-colon-to-comma', plugin],
    ],
});

test('flatlint: convert-colon-to-comma: report', (t) => {
    t.report('convert-colon-to-comma', `Use ',' instead of ':'`);
    t.end();
});

test('flatlint: convert-colon-to-comma: transform', (t) => {
    t.transform('convert-colon-to-comma');
    t.end();
});
