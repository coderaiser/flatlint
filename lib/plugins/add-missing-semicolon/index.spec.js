import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-semicolon', plugin],
    ],
});

test('flatlint: add-missing-semicolon: report', (t) => {
    t.report('add-missing-semicolon', `Add missing semicolon`);
    t.end();
});

test('flatlint: add-missing-semicolon: transform', (t) => {
    t.transform('add-missing-semicolon');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: semicolon', (t) => {
    t.noReport('semicolon');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: function-declaration', (t) => {
    t.transform('function-declaration');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: comma', (t) => {
    t.noReport('comma');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: brace', (t) => {
    t.noReport('brace');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: const-comma', (t) => {
    t.noReport('const-comma');
    t.end();
});
