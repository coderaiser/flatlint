import {createTest} from '#test';
import * as plugin from './index.js';
import * as convertCommaToSemicolon from '../convert-comma-to-semicolon/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-comma', plugin],
    ],
});

test('flatlint: remove-useless-comma: report', (t) => {
    t.report('remove-useless-comma', `Remove useless ','`);
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

test('flatlint: remove-useless-comma: transform: new-lines', (t) => {
    t.transform('new-lines');
    t.end();
});

test('flatlint: remove-useless-comma: transform: function', (t) => {
    t.transform('function');
    t.end();
});

test('flatlint: remove-useless-comma: no report: property', (t) => {
    t.noReport('property');
    t.end();
});

test('flatlint: remove-useless-comma: no report: property-call', (t) => {
    t.noReport('property-call');
    t.end();
});

test('flatlint: remove-useless-comma: no report: object', (t) => {
    t.noReport('object');
    t.end();
});

test('flatlint: remove-useless-comma: no report: spread', (t) => {
    t.noReport('spread');
    t.end();
});

test('flatlint: remove-useless-comma: no report: property-array', (t) => {
    t.noReport('property-array');
    t.end();
});

test('flatlint: remove-useless-comma: no report: const', (t) => {
    t.noReport('const');
    t.end();
});

test('flatlint: remove-useless-comma: transform: double', (t) => {
    t.transform('double');
    t.end();
});

test('flatlint: remove-useless-comma: report: convert-comma-to-semicolon', (t) => {
    t.report('convert-comma-to-semicolon', [`Use ';' instead of ','`], {
        convertCommaToSemicolon,
    });
    t.end();
});

