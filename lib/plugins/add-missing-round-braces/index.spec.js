import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-round-braces', plugin],
    ],
});

test('flatlint: add-missing-round-braces: report', (t) => {
    t.report('add-missing-round-braces', `Add missing round braces`);
    t.end();
});

test('flatlint: add-missing-round-braces: transform', (t) => {
    t.transform('add-missing-round-braces');
    t.end();
});
