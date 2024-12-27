import {test} from 'supertape';
import {lint} from './tklint.js';
import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens/index.js';

test('tklint: places: no', (t) => {
    const {places} = lint('a && b = c');
    
    t.deepEqual(places, []);
    t.end();
});

test('tklint: plugins', (t) => {
    const {places} = lint('a && b = c', {
        fix: false,
        plugins: [
            ['wrap-assignment-in-parens', wrapAssignmentInParens],
        ],
    });
    
    const expected = [{
        column: 1,
        line: 1,
        message: `Wrap the assignment in parentheses after '&&'`,
        rule: 'wrap-assignment-in-parens',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('tklint: fix: true', (t) => {
    const {code} = lint('a && b = c', {
        plugins: [
            ['wrap-assignment-in-parens', wrapAssignmentInParens],
        ],
    });
    
    const expected = 'a && (b = c)';
    
    t.equal(code, expected);
    t.end();
});
