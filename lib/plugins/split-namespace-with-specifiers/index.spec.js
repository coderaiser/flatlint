import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-namespace-with-specifiers', plugin],
    ],
});

test('flatlint: split-namespace-with-specifiers: report', (t) => {
    t.report('split-namespace-with-specifiers', `Split 'namespace' with 'specifiers'`);
    t.end();
});

test('flatlint: split-namespace-with-specifiers: transform', (t) => {
    t.transform('split-namespace-with-specifiers');
    t.end();
});

test('flatlint: split-namespace-with-specifiers: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

