import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-square-brace', plugin],
    ],
});

test('flatlint: add-missing-square-brace: report', (t) => {
    t.report('add-missing-square-brace', `Add missing square brace`);
    t.end();
});

test('flatlint: add-missing-square-brace: transform', (t) => {
    t.transform('add-missing-square-brace');
    t.end();
});

test('flatlint: add-missing-square-brace: transform: one', (t) => {
    t.transform('one');
    t.end();
});

test('flatlint: add-missing-square-brace: transform: empty', (t) => {
    t.transform('empty');
    t.end();
});

test('flatlint: add-missing-square-brace: transform: number', (t) => {
    t.transform('number');
    t.end();
});

test('flatlint: add-missing-square-brace: transform: member', (t) => {
    t.transform('member');
    t.end();
});
