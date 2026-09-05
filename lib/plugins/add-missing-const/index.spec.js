import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-const', plugin],
    ],
});

test('flatlint: add-missing-const: report', (t) => {
    t.report('add-missing-const', `Add missing 'const'`);
    t.end();
});

test('flatlint: add-missing-const: transform', (t) => {
    t.transform('add-missing-const');
    t.end();
});
