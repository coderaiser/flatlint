import {test} from 'supertape';
import montag from 'montag';
import {parse} from '#parser';
import {compare} from '#compare';
import {getCurrentValues} from '#compare/values';
import {print} from '#printer';

test('flatlint: compare: values: __args', (t) => {
    const from = '__a(__args)';
    const tokens = parse('fn()');
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    t.deepEqual(__args, []);
    t.end();
});

test('flatlint: compare: values: __args: semicolon', (t) => {
    const from = '__a(__args';
    const tokens = parse('assign(oldPath, currentPath;');
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    const expected = 'oldPath, currentPath';
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: array: semicolon', (t) => {
    const from = '__a(__args';
    const tokens = parse('assign([];');
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    const expected = '[]';
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: before identifier', (t) => {
    const from = `__a(__args`;
    const tokens = parse(montag`
        test('cloudcmd: client: storage: remove', async (t) => {
            t.calledWith(removeItem, ['hello'], 'should call removeItem');
            t.end();
        });
        
        test('cloudcmd: client: storage: clear', async (t) => {
        });
    `);
    
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    
    const expected = montag`
        'cloudcmd: client: storage: remove', async (t) => {
            t.calledWith(removeItem, ['hello'], 'should call removeItem');
            t.end();
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: no', (t) => {
    const from = '__a(__args;';
    const tokens = parse('Identifier(;');
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    t.deepEqual(__args, []);
    t.end();
});

test('flatlint: compare: values: __args: not empty', (t) => {
    const from = '__a(__args)';
    const tokens = parse('fn("hello")');
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    const expected = `'hello'`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: comma', (t) => {
    const from = '__a(__args),';
    const tokens = parse('__a(1),');
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    const expected = `1`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: empty: comma', (t) => {
    const from = '__a(__args),';
    const tokens = parse('__a(),');
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const expected = [];
    
    t.deepEqual(__args, expected);
    t.end();
});

test('flatlint: compare: values: __args: no round brace', (t) => {
    const source = montag`
        const m = {
            z: z('hello'
        };
    `;
    
    const from = '__a(__args';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    const expected = `'hello'`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: object', (t) => {
    const from = '__a(__args)';
    const source = montag`
        maybeCall(visitors.Identifier, {
            ...token,
            index,
        }),
    `;
    
    const tokens = parse(source);
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    
    const expected = montag`
        visitors.Identifier, {
            ...token,
            index,
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: curly', (t) => {
    const from = '__a(__args';
    const source = montag`
        const m = {
            z: z('hello'
        }
    `;
    
    const tokens = parse(source);
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    const expected = `'hello'`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: ', (t) => {
    const from = '__a(__args';
    const source = montag`
        const node = new Proxy(rawNode, {
            get(target, prop) {
                if (files) {
                    return node;
                }
                
                return readNode(filename, filesystem);
            },
        });
    `;
    
    const tokens = parse(source);
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    
    const expected = montag`
        rawNode, {
            get(target, prop) {
                if (files) {
                    return node;
                }
                
                return readNode(filename, filesystem);
            },
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __args: delta', (t) => {
    const from = '(__args) {';
    const source = montag`
        export const fromSimple = (simple) => {
            for (const line of list)) {
            }
        }
        
        function createDirectory(filename) {
            return {
                filename,
                type: 'directory',
                files: [],
            }
        }
    `;
    
    const tokens = parse(source);
    const [, start, end] = compare(tokens, from);
    
    const {__args} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__args);
    
    const expected = montag`
        filename
    `;
    
    t.equal(result, expected);
    t.end();
});
