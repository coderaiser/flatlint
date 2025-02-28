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

test('flatlint: add-missing-semicolon: transform: function-declaration', (t) => {
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

test('flatlint: add-missing-semicolon: no report: comma', (t) => {
    t.noReport('comma');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: brace', (t) => {
    t.noReport('brace');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: chain', (t) => {
    t.noReport('chain');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: ternary', (t) => {
    t.noReport('ternary');
    t.end();
});

test('flatlint: add-missing-semicolon: no transform: const-comma', (t) => {
    t.noTransform('const-comma');
    t.end();
});

test('flatlint: add-missing-semicolon: no transform: template', (t) => {
    t.noTransform('template');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: destructuring', (t) => {
    t.noReport('destructuring');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: call-result-of-call', (t) => {
    t.noReport('call-result-of-call');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: logical', (t) => {
    t.noReport('logical');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: method', (t) => {
    t.transform('method');
    t.end();
});

test('flatlint: add-missing-semicolon: transform: new-lines', (t) => {
    t.transform('new-lines');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: if', (t) => {
    t.noReport('if');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: close-round-brace', (t) => {
    t.noReport('close-round-brace');
    t.end();
});

test('flatlint: add-missing-semicolon: no report: call-without-closing-brace', (t) => {
    t.noReport('call-without-closing-brace');
    t.end();
});
