import {test} from 'supertape';
import {lint} from '#flatlint';
import montag from 'montag';
import * as wrapAssignmentInParens from './plugins/wrap-assignment-in-parens/index.js';
import * as addMissingQuote from './plugins/add-missing-quote/index.js';

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

test('flatlint: plugins: startLine', (t) => {
    const [, places] = lint('a && b = c', {
        fix: false,
        startLine: 4,
        plugins: [
            ['wrap-assignment-in-parens', wrapAssignmentInParens],
        ],
    });
    
    const expected = [{
        position: {
            column: 10,
            line: 4,
        },
        message: `Wrap the assignment in parentheses after '&&'`,
        rule: 'wrap-assignment-in-parens',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('flatlint: plugins: report', (t) => {
    const source = montag`
        const a = 'hello;
        const b = 'world';
    `;
    
    const [, places] = lint(source, {
        fix: false,
        plugins: [
            ['add-missing-quote', addMissingQuote],
        ],
    });
    
    const expected = [{
        position: {
            column: 17,
            line: 1,
        },
        message: `Add missing quote`,
        rule: 'add-missing-quote',
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
