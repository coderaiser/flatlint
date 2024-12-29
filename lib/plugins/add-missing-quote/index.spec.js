import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-quote', plugin],
    ],
});

test('flatlint: add-missing-quote: report', (t) => {
    t.report('add-missing-quote', `Add missing quote`);
    t.end();
});

test('flatlint: add-missing-quote: transform', (t) => {
    t.transform('add-missing-quote');
    t.end();
});

test('flatlint: add-missing-quote: transform: semicolon', (t) => {
    t.transform('semicolon');
    t.end();
});

test('flatlint: add-missing-quote: transform: call', (t) => {
    t.transform('call');
    t.end();
});
