import {test} from 'supertape';
import {getCurrentValues} from '#compare/values';
import {compare} from '#compare';
import {parse} from '#parser';
import {print} from '#printer';
import montag from 'montag';

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

test('flatlint: compare: values: __expr', (t) => {
    const source = montag`
        const m = 2 + 3 / 5;
    `;
    
    const from = 'const __a = __expr';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    const {__expr} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__expr);
    const expected = `2 + 3 / 5`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __expr: (', (t) => {
    const source = montag`
        const m = (2 + 3) / 5;
    `;
    
    const from = 'const __a = __expr';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    
    const {__expr} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__expr);
    const expected = `(2 + 3) / 5`;
    
    t.equal(result, expected);
    t.end();
});
