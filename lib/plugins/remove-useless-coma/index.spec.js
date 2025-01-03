import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-coma', plugin],
    ],
});

test('flatlint: remove-useless-coma: report', (t) => {
    t.report('remove-useless-coma', 'Remove useless coma');
    t.end();
});

test('flatlint: remove-useless-coma: transform', (t) => {
    t.transform('remove-useless-coma');
    t.end();
});

test('flatlint: remove-useless-coma: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('flatlint: remove-useless-coma: no report: array', (t) => {
    t.noReport('array');
    t.end();
});
