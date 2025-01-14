import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-arrow', plugin],
    ],
});

test('flatlint: add-missing-arrow: report', (t) => {
    t.report('add-missing-arrow', `Add missing '=>'`);
    t.end();
});

test('flatlint: add-missing-arrow: transform', (t) => {
    t.transform('add-missing-arrow');
    t.end();
});

test('flatlint: add-missing-arrow: no report', (t) => {
    t.noReport('method');
    t.end();
});

test('flatlint: add-missing-arrow: transform: property', (t) => {
    t.transform('property');
    t.end();
});