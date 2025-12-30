import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-colon-to-as', plugin],
    ],
});

test('flatlint: convert-colon-to-as: report', (t) => {
    t.report('convert-colon-to-as', `Use 'as' instead of ':'`);
    t.end();
});

test('flatlint: convert-colon-to-as: transform', (t) => {
    t.transform('convert-colon-to-as');
    t.end();
});
