import {test} from 'supertape';
import montag from 'montag';
import {getCurrentValues} from '#compare/values';
import {compare} from '#compare';
import {parse} from '#parser';
import {print} from '#printer';

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

test('flatlint: compare: values: __expr: empty', (t) => {
    const source = montag`
        const m = \n\n
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
    const expected = '\n';
    
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

test('flatlint: compare: values: __expr: {', (t) => {
    const source = `import {getFirstPassOptions} from './plugins.js',`;
    const from = 'import __expr from "__b",';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    
    const {__expr} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__expr);
    const expected = `{getFirstPassOptions} from './plugins.js'`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __expr: }', (t) => {
    const source = `const a = 5},`;
    const from = 'const a = __expr}';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    
    const {__expr} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__expr);
    const expected = '5';
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __a', (t) => {
    const source = `const a = 5`;
    const from = 'const __a = __b';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    
    const {__b} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const expected = '5';
    
    t.equal(__b.value, expected);
    t.end();
});

test('flatlint: compare: values: __expr: function', (t) => {
    const source = montag`
        module.exports.validateRules = (options) => {
            check(options);
            
            const {pluginNames = [], rules = {}} = options;
            const items = parsePluginNames(pluginNames);
            
            validateRules({
                rules,
                items,
            });
        },
    `;
    
    const from = '__a.__b.__c = __expr,';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    const {__expr} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__expr);
    
    const expected = montag`
        (options) => {
            check(options);
            
            const {pluginNames = [], rules = {}} = options;
            const items = parsePluginNames(pluginNames);
            
            validateRules({
                rules,
                items,
            });
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __expr: literal', (t) => {
    const source = montag`
        const a = 'x',
    `;
    
    const from = 'const __a = __expr,';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    const {__expr} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__expr);
    const expected = `'x'`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __expr: object', (t) => {
    const source = montag`
        const a = {
            b: 'hello',
        }
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
    
    const expected = montag`
        {
            b: 'hello',
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __expr: method', (t) => {
    const source = montag`
        export const traverse = ({push}) => ({
            ObjectProperty(path) {
            },
        }),
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
    
    const expected = montag`
        ({push}) => ({
            ObjectProperty(path) {
            },
        })
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: __expr: assign', (t) => {
    const source = montag`
        {m} = await a.b();
    `;
    
    const from = '{__a} = __expr;';
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    const {__expr} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__expr);
    const expected = `await a.b()`;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: compare: values: string without start quote', (t) => {
    const source = montag`
        const a = hello';
    `;
    
    const from = `const __a = '__b'`;
    const tokens = parse(source);
    
    const [ok] = compare(tokens, from);
    
    t.notOk(ok);
    t.end();
});
