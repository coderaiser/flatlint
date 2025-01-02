import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-semicolon', plugin],
    ],
});

test('flatlint: remove-useless-semicolon: report', (t) => {
    t.report('remove-useless-semicolon', 'Remove useless semicolon');
    t.end();
});

test('flatlint: remove-useless-semicolon: transform', (t) => {
    t.transform('remove-useless-semicolon');
    t.end();
});

test('flatlint: remove-useless-semicolon: no report: interface', (t) => {
    t.noReport('interface');
    t.end();
});
