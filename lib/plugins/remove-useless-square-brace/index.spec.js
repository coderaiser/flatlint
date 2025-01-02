import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-square-brace', plugin],
    ],
});

test('flatlint: remove-useless-square-brace: report', (t) => {
    t.report('remove-useless-square-brace', 'Remove useless square brace');
    t.end();
});

test('flatlint: remove-useless-square-brace: transform', (t) => {
    t.transform('remove-useless-square-brace');
    t.end();
});
