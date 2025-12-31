import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-assign', plugin],
    ],
});

test('flatlint: remove-useless-assign: report', (t) => {
    t.report('remove-useless-assign', `Remove useless '='`);
    t.end();
});

test('flatlint: remove-useless-assign: transform', (t) => {
    t.transform('remove-useless-assign');
    t.end();
});
