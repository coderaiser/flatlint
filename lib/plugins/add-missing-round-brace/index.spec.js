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

test('flatlint: add-missing-round-brace: no report: exists', (t) => {
    t.noReport('exists');
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
