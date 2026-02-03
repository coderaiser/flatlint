import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-import-from', plugin],
    ],
});

test('flatlint: apply-import-from: report', (t) => {
    t.report('apply-import-from', `Use 'import from' instead of 'import form'`);
    t.end();
});

test('flatlint: apply-import-from: transform', (t) => {
    t.transform('apply-import-from');
    t.end();
});

test('flatlint: apply-import-from: transform: namespace', (t) => {
    t.transform('namespace');
    t.end();
});
