export const report = () => `Use '@decorator export' instead of 'export @decorator'`;

export const replace = () => ({
    'private readonly @__a("__b")': '@__a("__b") private readonly',
});
