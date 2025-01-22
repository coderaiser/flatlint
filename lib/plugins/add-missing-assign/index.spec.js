import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-assign', plugin],
    ],
});

test('flatlint: add-missing-assign: report', (t) => {
    t.report('add-missing-assign', `Add missing assign`);
    t.end();
});

test('flatlint: add-missing-assign: transform', (t) => {
    t.transform('add-missing-assign');
    t.end();
});

test('flatlint: add-missing-assign: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('flatlint: add-missing-assign: no report: or', (t) => {
    t.noReport('or');
    t.end();
});

test('flatlint: add-missing-assign: transform: member', (t) => {
    t.transform('member');
    t.end();
});
