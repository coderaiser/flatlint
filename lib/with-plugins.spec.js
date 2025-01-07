import {test} from 'supertape';
import montag from 'montag';
import {lint, plugins} from './with-plugins.js';

test('flatlint: with-plugins: add-missing-round-braces', (t) => {
    const source = montag`
        if a > 3 {
            alert();
        }
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        if (a > 3) {
            alert();
        }
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: convert-comma-to-semicolon', (t) => {
    const source = 'const a = 5,';
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = 'const a = 5;';
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: remove-useless-round-brace', (t) => {
    const source = 'const a = 5);';
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = 'const a = 5;';
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-quote', (t) => {
    const source = 'const a = "hello;';
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = `const a = 'hello';`;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-squire-brace', (t) => {
    const source = 'const a = ["hello", "world";';
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = `const a = ['hello', 'world'];`;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: add-const-to-export', (t) => {
    const source = 'export a = ["hello", "world";';
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = `export const a = ['hello', 'world'];`;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: convert-from-to-require', (t) => {
    const source = montag`
        const a = from 'a';
        const {b, c} = from 'c';
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        const a = require('a');
        const {b, c} = require('c');
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-semicolon', (t) => {
    const source = `a('hello')`;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = `a('hello');`;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-quote: round brace, comma', (t) => {
    const source = montag`
        const x = {
            m: a('hello),
        };
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        const x = {
            m: a('hello'),
        };
    `;
    
    t.equal(code, expected);
    t.end();
});
