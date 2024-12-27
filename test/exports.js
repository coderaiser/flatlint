import {test} from 'supertape';

test('tklint: exports', async (t) => {
    const {lint, plugins} = await import('tklint/with-plugins');
    const result = {
        lint,
        plugins,
    };
    
    const expected = {
        ...await import('../lib/tklint.js'),
        ...await import('../lib/plugins.js'),
    };
    
    t.deepEqual(result, expected);
    t.end();
});

