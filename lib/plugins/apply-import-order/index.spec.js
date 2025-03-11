import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-import-order', plugin],
    ],
});

test('flatlint: apply-import-order: report', (t) => {
    t.report('apply-import-order', `Apply import order`);
    t.end();
});

test('flatlint: apply-import-order: transform', (t) => {
    t.transform('apply-import-order');
    t.end();
});
