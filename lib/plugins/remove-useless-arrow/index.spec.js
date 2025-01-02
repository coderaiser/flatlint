import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-arrow', plugin],
    ],
});

test('flatlint: remove-useless-arrow: report', (t) => {
    t.report('remove-useless-arrow', 'Remove useless arrow');
    t.end();
});

test('flatlint: remove-useless-arrow: transform', (t) => {
    t.transform('remove-useless-arrow');
    t.end();
});
