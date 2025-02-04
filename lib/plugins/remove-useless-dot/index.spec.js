import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-dot', plugin],
    ],
});

test('flatlint: remove-useless-dot: report', (t) => {
    t.report('remove-useless-dot', `Remove useless '.'`);
    t.end();
});

test('flatlint: remove-useless-dot: transform', (t) => {
    t.transform('remove-useless-dot');
    t.end();
});
