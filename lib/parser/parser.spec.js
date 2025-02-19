import {test} from 'supertape';
import montag from 'montag';
import {parse} from './parser.js';

test('flatlint: parser: comment', (t) => {
    const source = montag`
        /**
         * Class representing a DrawCircle instance.
         */
        export class DrawCircle {
            #canvas: HTMLElement | SVGElement | null;
        }
    `;
    
    const [, , result] = parse(source);
    const expected = {
        column: 1,
        line: 4,
        type: 'IdentifierName',
        value: 'export',
    };
    
    t.deepEqual(result, expected);
    t.end();
});
