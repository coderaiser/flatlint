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

test('flatlint: convert-semicolon-to-comma: no report: interface', (t) => {
    t.noReport('interface');
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

test('flatlint: convert-semicolon-to-comma: no transform: const', (t) => {
    t.noTransform('const');
    t.end();
});
