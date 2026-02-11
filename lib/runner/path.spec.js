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

