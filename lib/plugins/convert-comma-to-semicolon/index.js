export const report = () => 'Use semicolon instead of trailing comma';
export const replace = () => ({
    'const __a = __b,': 'const __a = __b;',
    '__a(__args),': '__a(__args);',
    '__a(),': '__a();',
});
