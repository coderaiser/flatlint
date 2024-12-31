import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-round-brace', plugin],
    ],
});

test('flatlint: remove-useless-round-brace: report', (t) => {
    t.report('remove-useless-round-brace', 'Remove useless round brace');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform', (t) => {
    t.transform('remove-useless-round-brace');
    t.end();
});

test('flatlint: remove-useless-round-brace: transform: import', (t) => {
    t.transform('import');
    t.end();
});
