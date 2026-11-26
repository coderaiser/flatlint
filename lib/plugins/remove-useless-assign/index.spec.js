import {createTest} from '#test';
import * as plugin from '#plugin-remove-useless-assign';

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

test('flatlint: remove-useless-assign: transform: function', (t) => {
    t.transform('function');
    t.end();
});

test('flatlint: remove-useless-assign: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('flatlint: remove-useless-assign: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('flatlint: remove-useless-assign: transform: const-array', (t) => {
    t.transform('const-array');
    t.end();
});

test('flatlint: remove-useless-assign: transform: let-object', (t) => {
    t.transform('let-object');
    t.end();
});

test('flatlint: remove-useless-assign: transform: var-object', (t) => {
    t.transform('var-object');
    t.end();
});

test('flatlint: remove-useless-assign: transform: var-array', (t) => {
    t.transform('var-array');
    t.end();
});
