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

test('flatlint: remove-useless-round-brace: no report: arrow', (t) => {
    t.noReport('arrow');
    t.end();
});

test('flatlint: remove-useless-round-brace: no report: call', (t) => {
    t.noReport('call');
    t.end();
});

test('flatlint: remove-useless-round-brace: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('flatlint: remove-useless-round-brace: no transform: getter', (t) => {
    t.noTransform('getter');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: for-of', (t) => {
    t.transform('for-of');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: array', (t) => {
    t.transform('array');
    t.end();
});
