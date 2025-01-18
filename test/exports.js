import {test} from 'supertape';

test('flatlint: exports: /with-plugins', async (t) => {
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

test('flatlint: exports', async (t) => {
    const {lint} = await import('flatlint');
    const result = {
        lint,
    };
    
    const expected = await import('#flatlint');
    
    t.deepEqual(result, expected);
    t.end();
});
