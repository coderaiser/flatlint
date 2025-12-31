import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-if', plugin],
    ],
});

test('flatlint: add-missing-if: report', (t) => {
    t.report('add-missing-if', `Add missing 'if'`);
    t.end();
});

test('flatlint: add-missing-if: transform', (t) => {
    t.transform('add-missing-if');
    t.end();
});
