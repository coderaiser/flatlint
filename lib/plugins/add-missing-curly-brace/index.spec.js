import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-curly-brace', plugin],
    ],
});

test('flatlint: add-missing-curly-brace: report', (t) => {
    t.report('add-missing-curly-brace', `Add missing curly brace`);
    t.end();
});

test('flatlint: add-missing-curly-brace: transform', (t) => {
    t.transform('add-missing-curly-brace');
    t.end();
});

test('flatlint: add-missing-curly-brace: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('flatlint: add-missing-curly-brace: no report: logical', (t) => {
    t.noReport('logical');
    t.end();
});

test('flatlint: add-missing-curly-brace: no report: default-value', (t) => {
    t.noReport('default-value');
    t.end();
});
