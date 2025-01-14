import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-invalid-character', plugin],
    ],
});

test('flatlint: remove-invalid-character: report', (t) => {
    t.report('remove-invalid-character', 'Remove invalid character');
    t.end();
});

test('flatlint: remove-invalid-character: transform', (t) => {
    t.transform('remove-invalid-character');
    t.end();
});

test('flatlint: remove-invalid-character: transform: space', (t) => {
    t.transform('space');
    t.end();
});
