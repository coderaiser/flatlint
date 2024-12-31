import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-const-to-export', plugin],
    ],
});

test('flatlint: add-const-to-export: report', (t) => {
    t.report('add-const-to-export', `Add 'const' to 'export'`);
    t.end();
});

test('flatlint: add-const-to-export: transform', (t) => {
    t.transform('add-const-to-export');
    t.end();
});

test('flatlint: add-const-to-export: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});
