import {test} from 'supertape';
import {lint} from '#flatlint';
import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens/index.js';

test('flatlint: places: no', (t) => {
    const [, places] = lint('a && b = c');
    
    t.deepEqual(places, []);
    t.end();
});

test('flatlint: plugins', (t) => {
    const [, places] = lint('a && b = c', {
        fix: false,
        plugins: [
            ['wrap-assignment-in-parens', wrapAssignmentInParens],
        ],
    });
    
    const expected = [{
        position: {
            column: 10,
            line: 1,
        },
        message: `Wrap the assignment in parentheses after '&&'`,
        rule: 'wrap-assignment-in-parens',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('flatlint: fix: true', (t) => {
    const [code] = lint('a && b = c', {
        plugins: [
            ['wrap-assignment-in-parens', wrapAssignmentInParens],
        ],
    });
    
    const expected = 'a && (b = c)';
    
    t.equal(code, expected);
    t.end();
});

test('flatlint: fix: nothing found', (t) => {
    const [, places] = lint('a && (b = c)', {
        plugins: [
            ['wrap-assignment-in-parens', wrapAssignmentInParens],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});
