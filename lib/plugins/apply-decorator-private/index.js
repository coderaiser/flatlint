export const report = () => `Use '@decorator private' instead of 'private @decorator'`;

export const replace = () => ({
    'private readonly @__a("__b")': '@__a("__b") private readonly',
});
