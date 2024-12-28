import {test} from 'supertape';

test('tklint: exports', async (t) => {
    const {lint, plugins} = await import('flatlint/with-plugins');
    const result = {
        lint,
        plugins,
    };
    
    const expected = {
        ...await import('#flatlint'),
        ...await import('../lib/plugins.js'),
    };
    
    t.deepEqual(result, expected);
    t.end();
});
