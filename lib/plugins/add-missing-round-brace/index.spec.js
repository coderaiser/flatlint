import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-round-brace', plugin],
    ],
});

test('flatlint: add-missing-round-brace: report', (t) => {
    t.report('add-missing-round-brace', `Add missing round brace`);
    t.end();
});

test('flatlint: add-missing-round-brace: transform', (t) => {
    t.transform('add-missing-round-brace');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: no-close', (t) => {
    t.transform('no-close');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: property', (t) => {
    t.transform('property');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: if-member', (t) => {
    t.transform('if-member');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('flatlint: add-missing-round-brace: no report: exists', (t) => {
    t.noReport('exists');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('flatlint: add-missing-round-brace: no report: call-array', (t) => {
    t.noReport('call-array');
    t.end();
});

test('flatlint: add-missing-round-brace: no report: call-no-args', (t) => {
    t.noReport('call-no-args');
    t.end();
});

test('flatlint: add-missing-round-brace: no transform: method', (t) => {
    t.noTransform('method');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: arg', (t) => {
    t.transform('arg');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: break', (t) => {
    t.transform('break');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: assign-no-semicolon', (t) => {
    t.transform('assign-no-semicolon');
    t.end();
});

test('flatlint: add-missing-round-brace: no report: const', (t) => {
    t.noReport('const');
    t.end();
});

test('flatlint: add-missing-round-brace: no transform: interface', (t) => {
    t.noTransform('interface');
    t.end();
});

test('flatlint: add-missing-round-brace: no report: json', (t) => {
    t.noReport('json');
    t.end();
});

test('flatlint: add-missing-round-brace: transform: call-nested', (t) => {
    t.transform('call-nested');
    t.end();
});

test('flatlint: add-missing-round-brace: no transform: object', (t) => {
    t.noTransform('object');
    t.end();
});

test('flatlint: add-missing-round-brace: no transform: getter', (t) => {
    t.noTransform('getter');
    t.end();
});

test('flatlint: add-missing-round-brace: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});

test('flatlint: add-missing-round-brace: no transform: arrow', (t) => {
    t.noTransform('arrow');
    t.end();
});

test('flatlint: add-missing-round-brace: no report: debugger', (t) => {
    t.noReport('debugger');
    t.end();
});

