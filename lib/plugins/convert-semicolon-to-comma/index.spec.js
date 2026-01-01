import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-semicolon-to-comma', plugin],
    ],
});

test('flatlint: convert-semicolon-to-comma: report', (t) => {
    t.report('convert-semicolon-to-comma', `Use ',' instead of ';'`);
    t.end();
});

test('flatlint: convert-semicolon-to-comma: transform', (t) => {
    t.transform('convert-semicolon-to-comma');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: interface', (t) => {
    t.noTransform('interface');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: static', (t) => {
    t.noTransform('static');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: transform: array-nested', (t) => {
    t.transform('array-nested');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: const', (t) => {
    t.noTransform('const');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: class', (t) => {
    t.noTransform('class');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no report: type', (t) => {
    t.noReport('type');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: arrow', (t) => {
    t.noTransform('arrow');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: transform: method', (t) => {
    t.transform('method');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: throw', (t) => {
    t.noTransform('throw');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: continue', (t) => {
    t.noTransform('continue');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: call', (t) => {
    t.noTransform('call');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no transform: object-inside-array', (t) => {
    t.noTransform('object-inside-array');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: transform: function-inside-object', (t) => {
    t.transform('function-inside-object');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: no report: object', (t) => {
    t.noReport('object');
    t.end();
});

test('flatlint: convert-semicolon-to-comma: transform: string', (t) => {
    t.transform('string');
    t.end();
});
