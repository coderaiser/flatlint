import {test} from 'supertape';
import {lint} from './tklint.js';
import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens.js';

test('tklint: places: no', (t) => {
    const [, places] = lint('a && b = c');
    
    t.deepEqual(places, []);
    t.end();
});

test('tklint: plugins', (t) => {
    const [, places] = lint('a && b = c', {
        fix: false,
        plugins: [wrapAssignmentInParens],
    });
    
    const expected = [{
        column: 1,
        line: 1,
        message: `Wrap the assignment in parentheses after '&&'.`,
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
