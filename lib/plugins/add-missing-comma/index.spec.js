import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-comma', plugin],
    ],
});

test('flatlint: add-missing-comma: report', (t) => {
    t.report('add-missing-comma', `Add missing comma`);
    t.end();
});

test('flatlint: add-missing-comma: transform', (t) => {
    t.transform('add-missing-comma');
    t.end();
});

test('flatlint: add-missing-comma: transform: call', (t) => {
    t.transform('call');
    t.end();
});
