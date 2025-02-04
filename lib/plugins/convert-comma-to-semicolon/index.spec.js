import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-comma-to-semicolon', plugin],
    ],
});

test('flatlint: convert-comma-to-semicolon: report', (t) => {
    t.report('convert-comma-to-semicolon', `Use semicolon instead of trailing comma`);
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform', (t) => {
    t.transform('convert-comma-to-semicolon');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: call', (t) => {
    t.transform('call');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: return', (t) => {
    t.transform('return');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: var', (t) => {
    t.transform('var');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: import', (t) => {
    t.transform('import');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: report: import', (t) => {
    t.report('import', ['Use semicolon instead of trailing comma']);
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: continue', (t) => {
    t.transform('continue');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no report: property', (t) => {
    t.noReport('property');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no report: chain', (t) => {
    t.noReport('chain');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no transform: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: module', (t) => {
    t.transform('module');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: export', (t) => {
    t.transform('export');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: for', (t) => {
    t.transform('for');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: while', (t) => {
    t.transform('while');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: if', (t) => {
    t.transform('if');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no report: assign-member', (t) => {
    t.noReport('assign-member');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no transform: arrow', (t) => {
    t.noTransform('arrow');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: transform: strict-mode', (t) => {
    t.transform('strict-mode');
    t.end();
});

