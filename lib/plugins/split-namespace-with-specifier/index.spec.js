import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-namespace-with-specifier', plugin],
    ],
});

test('flatlint: split-namespace-with-specifier: report', (t) => {
    t.report('split-namespace-with-specifier', `Split 'namespace' with 'specifier'`);
    t.end();
});

test('flatlint: split-namespace-with-specifier: transform', (t) => {
    t.transform('split-namespace-with-specifier');
    t.end();
});
