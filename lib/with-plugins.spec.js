import {test} from 'supertape';
import montag from 'montag';
import {lint, plugins} from './with-plugins.js';

test('flatlint: with-plugins: add-missing-round-brace', (t) => {
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

test('flatlint: with-plugins: add-missing-comma', (t) => {
    const source = montag`
        const {
            isJSXChildrenStr
            isBodyStr,
        } = require('./is');
    `;
    
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        const {
            isJSXChildrenStr,
            isBodyStr,
        } = require('./is');
    `;
    
    t.equal(result, expected);
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

test('flatlint: with-plugins: add-missing-semicolon: call', (t) => {
    const source = montag`
         function x() {
             fn(),
         }
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
         function x() {
             fn();
         }
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-if', (t) => {
    const source = montag`
        if (a < 0)
            console.log('hello');
        else (a > 3)
            console.log('world');
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        if (a < 0)
            console.log('hello');
        else if (a > 3)
            console.log('world');
    `;
    
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

test('flatlint: with-plugins: remove-useless-comma: last', (t) => {
    const source = montag`
        export const traverse = ({push}) => ({
            ObjectProperty(path) {
            },
        }),\n\n
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        export const traverse = ({push}) => ({
            ObjectProperty(path) {
            },
        });\n\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: remove-useless-comma', (t) => {
    const source = montag`
        return code
            .replaceAll(',}', '}')
            .replaceAll(',]', ']')
            .replaceAll(';}', '}');
    `;
    
    const [, places] = lint(source, {
        fix: false,
        plugins,
    });
    
    t.notOk(places.length);
    t.end();
});

test('flatlint: with-plugins: remove-invalid-character', (t) => {
    const source = montag`
        const {
            isJSXChildrenStr,¬
            isBodyStr,¬
        } = require('./is');¬
    `;
    
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        const {
            isJSXChildrenStr,
            isBodyStr,
        } = require('./is');
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: with-plugins: do not convert semicolon', (t) => {
    const source = montag`
        const {quote = \`'\`} = options;
        transform(ast, source, getFirstPassOptions(options));
    `;
    
    const [, places] = lint(source, {
        plugins,
    });
    
    t.notOk(places.length);
    t.end();
});

test('flatlint: with-plugins: add-missing-arrow', (t) => {
    const source = 'const a = (b, c) {};';
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = 'const a = (b, c) => {};';
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: convert-comma-to-semicolon: no report', (t) => {
    const source = montag`
        export const createPath = ({tokens, start, end}) => ({
            isNextIdentifier: createIsNextIdentifier({
                tokens,
                end,
            }),
            getAllPrev: createGetAllPrev({
                tokens,
                start,
            }),
        });
    `;
    
    const [, places] = lint(source, {
        fix: false,
        plugins,
    });
    
    t.deepEqual(places, []);
    t.end();
});

test('flatlint: with-plugins: add-missing-assign', (t) => {
    const source = 'const a 5';
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = 'const a = 5;';
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: with-plugins: convert-semicolon-to-comma', (t) => {
    const source = montag`
        const a = {
            b: 'hello';
        }
    `;
    
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        const a = {
            b: 'hello',
        };
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-curly-brace', (t) => {
    const source = montag`
        function a({b, c) {}
    `;
    
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        function a({b, c}) {}
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: with-plugins: no end', (t) => {
    const source = montag`
        const a = \n
    `;
    
    const [, places] = lint(source, {
        fix: false,
        plugins,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('flatlint: with-plugins: jsx', (t) => {
    const source = montag`
        const a = 5,
        const b = <div>a</div>;
    `;
    
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        const a = 5;
        const b = <div>a</div>;
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: with-plugins: if: braces', (t) => {
    const source = montag`
        if (a()
            break;
    `;
    
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        if (a())
            break;
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-round-braces: assign', (t) => {
    const source = montag`
        {first} = __expr;
    `;
    
    const [result] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        ({first} = __expr);
    `;
    
    t.equal(result, expected);
    t.end();
});

test('flatlint: with-plugins: add-missing-round-braces: const', (t) => {
    const source = montag`
        const {mergeOptions} = require('./merge-options');
    `;
    
    const [, places] = lint(source, {
        fix: false,
        plugins,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('flatlint: with-plugins: remove-useless-dot', (t) => {
    const source = montag`
        fn([].);
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        fn([]);
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: apply-import-order', (t) => {
    const source = montag`
        import {readFile}, fs from 'node:fs';
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        import fs, {readFile} from 'node:fs';
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: convert-colon-to-comma', (t) => {
    const source = montag`
        export const rules = [
            ['apply-nesting': applyNesting],
        ];
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        export const rules = [
            ['apply-nesting', applyNesting],
        ];
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: convert-assert-to-with', (t) => {
    const source = montag`
        import a from 'a' assert {type: 'json'}
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        import a from 'a' with {type: 'json'}
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: apply-import-from', (t) => {
    const source = montag`
        import a form 'a'; 
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        import a from 'a'; 
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: convert-colon-to-as', (t) => {
    const source = montag`
        import {simpleImport: _simpleImport} from './simple-import.js';
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        import {simpleImport as _simpleImport} from './simple-import.js';
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: remove-useless-arrow', (t) => {
    const source = montag`
        function parse(source) => {
            return 5;
        }
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        function parse(source) {
            return 5;
        }
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: remove-useless-assign', (t) => {
    const source = montag`
        import {readFile, readdir} = from 'node:fs/promises';
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        import {readFile, readdir} from 'node:fs/promises';
    `;
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: with-plugins: convert-module-to-namespace', (t) => {
    const source = montag`
        module A {
            var foo: string
        }
    `;
    
    const [code] = lint(source, {
        plugins,
    });
    
    const expected = montag`
        namespace A {
            var foo: string
        }
    `;
    
    t.equal(code, expected);
    t.end();
});
