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
