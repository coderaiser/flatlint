import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-decorator-private', plugin],
    ],
});

test('flatlint: apply-decorator-private: report', (t) => {
    t.report('apply-decorator-private', `Use '@decorator export' instead of 'export @decorator'`);
    t.end();
});

test('flatlint: apply-decorator-private: transform', (t) => {
    t.transform('apply-decorator-private');
    t.end();
});
