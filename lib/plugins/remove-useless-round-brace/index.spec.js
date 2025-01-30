import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-round-brace', plugin],
    ],
});

test('flatlint: remove-useless-round-brace: report', (t) => {
    t.report('remove-useless-round-brace', 'Remove useless round brace');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform', (t) => {
    t.transform('remove-useless-round-brace');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: import', (t) => {
    t.transform('import');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: specifier', (t) => {
    t.transform('specifier');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: binary', (t) => {
    t.transform('binary');
    t.end();
});

test('flatlint: remove-useless-round-brace: no-report: arrow', (t) => {
    t.noReport('arrow');
    t.end();
});

test('flatlint: remove-useless-round-brace: no-report: call', (t) => {
    t.noReport('call');
    t.end();
});

test('flatlint: remove-useless-round-brace: no-report: const', (t) => {
    t.transform('const');
    t.end();
});

