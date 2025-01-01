import {test} from 'supertape';
import tokenize from 'js-tokens';
import {compare} from './compare.js';

test('compare: equal', (t) => {
    const tokens = Array.from(tokenize('hello && world = 5'));
    const [result] = compare(tokens, 'hello && world = 5');
    
    t.ok(result);
    t.end();
});

test('compare: not equal', (t) => {
    const [result] = compare('abc && world = 5', 'hello && world = 5');
    
    t.notOk(result);
    t.end();
});

test('compare: spaces', (t) => {
    const tokens = Array.from(tokenize('hello&&world=5'));
    const [result] = compare(tokens, 'hello && world = 5');
    
    t.notOk(result);
    t.end();
});

test('compare: __: identifiers', (t) => {
    const tokens = Array.from(tokenize('hello && world = x'));
    const [result] = compare(tokens, '__ && __ = __');
    
    t.ok(result);
    t.end();
});

test('compare: __: numbers', (t) => {
    const tokens = Array.from(tokenize('hello && world = 5'));
    const [result] = compare(tokens, '__ && __ = __');
    
    t.ok(result);
    t.end();
});

test('compare: __: start', (t) => {
    const source = 'const a = 5;\nhello && world = 5;';
    const [, start] = compare(source, '__ && __ = __');
    
    t.equal(start, 9);
    t.end();
});

test('compare: __: end', (t) => {
    const source = 'const a = 5;\nhello && world = 5;const c = 3';
    const [, , end] = compare(source, '__ && __ = __');
    
    t.equal(end, 18);
    t.end();
});

test('compare: __a', (t) => {
    const source = 'const a = 5;\nhello && world = 5;';
    const [, start] = compare(source, '__a && __b = __c');
    
    t.equal(start, 9);
    t.end();
});

test('compare: "__a"', (t) => {
    const source = 'const a = "hello;';
    const [ok] = compare(source, 'const __a = "__b');
    
    t.ok(ok);
    t.end();
});

test('compare: "__array"', (t) => {
    const source = 'const a = [1, 2;';
    const [ok] = compare(source, 'const __a = [__array;');
    
    t.ok(ok);
    t.end();
});
