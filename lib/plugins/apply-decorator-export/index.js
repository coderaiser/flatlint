export const report = () => `Use '@decorator export' instead of 'export @decorator'`;

export const replace = () => ({
    'export @__a("__b") class': '@__a("__b")\nexport class',
    'export @__a()\nclass': '@__a()\nexport class',
});
