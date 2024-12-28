import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-comma-to-semicolon', plugin],
    ],
});

test('tklint: convert-comma-to-semicolon: report', (t) => {
    t.report('convert-comma-to-semicolon', `Use semicolon instead of trailing comma`);
    t.end();
});

test('tklint: convert-comma-to-semicolon: transform', (t) => {
    t.transform('convert-comma-to-semicolon');
    t.end();
});
