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

test('flatlint: add-missing-comma: no report: await', (t) => {
    t.noReport('await');
    t.end();
});

test('flatlint: add-missing-comma: no report: as', (t) => {
    t.noReport('as');
    t.end();
});

test('flatlint: add-missing-comma: no report: for-of', (t) => {
    t.noReport('for-of');
    t.end();
});

test('flatlint: add-missing-comma: no report: template', (t) => {
    t.noReport('template');
    t.end();
});

test('flatlint: add-missing-comma: no report: typeof', (t) => {
    t.noReport('typeof');
    t.end();
});
