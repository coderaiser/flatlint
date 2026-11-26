import {test} from 'supertape';
import {parse} from '#parser';
import {createPath} from './path.js';

test('flatlint: runner: path', (t) => {
    const tokens = parse('cons a = 3');
    const {isNextCompareAll} = createPath({
        tokens,
    });
    
    const is = isNextCompareAll('const __a = __b');
    
    t.ok(is);
    t.end();
});

test('flatlint: runner: path: isInsideRoundBraces', (t) => {
    const tokens = parse('f(g(1), [a, b], {c: d}, e)');
    const start = tokens.findIndex((a) => a.value === 'e');
    
    const {isInsideRoundBraces} = createPath({
        tokens,
        start,
    });
    
    t.ok(isInsideRoundBraces());
    t.end();
});

test('flatlint: runner: path: isInsideRoundBraces: square', (t) => {
    const tokens = parse('f((a), [b, c])');
    const start = tokens.findIndex((a) => a.value === 'c');
    
    const {isInsideRoundBraces} = createPath({
        tokens,
        start,
    });
    
    t.notOk(isInsideRoundBraces());
    t.end();
});

test('flatlint: runner: path: isInsideRoundBraces: top level', (t) => {
    const tokens = parse('f(a); b');
    const start = tokens.findIndex((a) => a.value === 'b');
    
    const {isInsideRoundBraces} = createPath({
        tokens,
        start,
    });
    
    t.notOk(isInsideRoundBraces());
    t.end();
});

test('flatlint: runner: path: isInsideSquareBraces', (t) => {
    const tokens = parse('f((a), [b, {c}, d])');
    const start = tokens.findIndex((a) => a.value === 'd');
    
    const {isInsideSquareBraces} = createPath({
        tokens,
        start,
    });
    
    t.ok(isInsideSquareBraces());
    t.end();
});

test('flatlint: runner: path: isInsideSquareBraces: round', (t) => {
    const tokens = parse('f([a], b)');
    const start = tokens.findIndex((a) => a.value === 'b');
    
    const {isInsideSquareBraces} = createPath({
        tokens,
        start,
    });
    
    t.notOk(isInsideSquareBraces());
    t.end();
});
