import montag from 'montag';

export const report = () => 'Remove useless curly braces from ImportDeclaration';

export const replace = () => ({
    [montag`
        import __a from "__b" {
            with: {
                type: 'json',
            }
        };
    `]: montag`
        import __a from "__b" with {
            type: 'json',
        };
    `,
});
