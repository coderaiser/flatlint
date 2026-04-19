import {test} from 'supertape';
import {parse} from '#parser';
import {compare} from '#compare';
import {getCurrentValues} from '#compare/values';
import {print} from '#printer';

test('flatlint: compare: values: tmpl', (t) => {
    const from = 'const __a = __tmpl;';
    const source = 'const a = `hello ${world}`;';
    
    const tokens = parse(source);
    
    const [, start, end] = compare(tokens, from);
    
    const {__tmpl} = getCurrentValues({
        tokens,
        from,
        start,
        end,
    });
    
    const result = print(__tmpl);
    
    const expected = '`hello ${world}`';
    
    t.equal(result, expected);
    t.end();
});
