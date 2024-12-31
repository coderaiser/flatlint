import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-from-to-require', plugin],
    ],
});

test('flatlint: convert-from-to-require: report', (t) => {
    t.report('convert-from-to-require', `Use 'require' instead of 'from'`);
    t.end();
});

test('flatlint: convert-from-to-require: transform', (t) => {
    t.transform('convert-from-to-require');
    t.end();
});

test('flatlint: convert-from-to-require: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});
