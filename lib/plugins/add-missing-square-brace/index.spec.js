import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-squire-brace', plugin],
    ],
});

test('flatlint: add-missing-squire-brace: report', (t) => {
    t.report('add-missing-squire-brace', `Add missing squire brace`);
    t.end();
});

test('flatlint: add-missing-squire-brace: transform', (t) => {
    t.transform('add-missing-squire-brace');
    t.end();
});

test('flatlint: add-missing-squire-brace: transform: one', (t) => {
    t.transform('one');
    t.end();
});
