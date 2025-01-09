import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-comma', plugin],
    ],
});

test('flatlint: remove-useless-comma: report', (t) => {
    t.report('remove-useless-comma', 'Remove useless coma');
    t.end();
});

test('flatlint: remove-useless-comma: transform', (t) => {
    t.transform('remove-useless-comma');
    t.end();
});

test('flatlint: remove-useless-comma: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('flatlint: remove-useless-comma: no report: array', (t) => {
    t.noReport('array');
    t.end();
});

test('flatlint: remove-useless-comma: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('flatlint: remove-useless-comma: transform: curly', (t) => {
    t.transform('curly');
    t.end();
});
