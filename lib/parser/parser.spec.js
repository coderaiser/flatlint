import {test} from 'supertape';
import montag from 'montag';
import {parse} from '#parser';

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

test('flatlint: parser: template', (t) => {
    const source = montag`
        const a = \`
            hello
            world
        \`;
        
        const b = 3;
    `;
    
    const tokens = parse(source);
    const result = tokens.at(-1);
    
    const expected = {
        column: 12,
        line: 6,
        type: 'Punctuator',
        value: ';',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('flatlint: parser: template: value', (t) => {
    const source = montag`
        const expected = montag\`
            \${__filesystem_name}({
                "type": "directory",
                "filename": "/lib/lint/hello.js",
                "files": []
            });
        \`;
        
        const [file] = getFile(root, ['index.js', 'index.spec.js');
    `;
    
    const tokens = parse(source);
    const result = tokens.at(-1);
    
    const expected = {
        column: 59,
        line: 9,
        type: 'Punctuator',
        value: ';',
    };
    
    t.deepEqual(result, expected);
    t.end();
});
