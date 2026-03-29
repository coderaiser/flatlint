import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-import-curly-brace', plugin],
    ],
});

test('flatlint: remove-useless-import-curly-brace: report: remove-useless-import-curly-braces', (t) => {
    t.report('remove-useless-import-curly-braces', 'Remove useless curly braces from ImportDeclaration');
    t.end();
});

test('flatlint: remove-useless-import-curly-brace: transform: remove-useless-import-curly-braces', (t) => {
    t.transform('remove-useless-import-curly-braces');
    t.end();
});
