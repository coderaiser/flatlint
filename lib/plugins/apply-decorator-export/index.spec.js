import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-decorator-export', plugin],
    ],
});

test('flatlint: apply-decorator-export: report', (t) => {
    t.report('apply-decorator-export', `Use '@decorator export' instead of 'export @decorator'`);
    t.end();
});

test('flatlint: apply-decorator-export: transform', (t) => {
    t.transform('apply-decorator-export');
    t.end();
});
