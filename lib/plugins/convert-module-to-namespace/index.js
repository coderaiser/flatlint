export const report = () => `Use 'namespace' instead of 'module'`;

const check = (vars, path) => !path.isPrevKeyword('declare');

export const match = () => ({
    'module __a': check,
    'module "__a"': check,
});

export const replace = () => ({
    'module __a': 'namespace __a',
    'module "__a"': 'namespace "__a"',
});
