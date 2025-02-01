import {
    closeRoundBrace,
    isDeclarationKeyword,
} from '#types';

export const report = () => 'Add missing round brace';

export const match = () => ({
    '__a(__args': (vars, path) => {
        if (path.isCurrentPunctuator(closeRoundBrace))
            return false;
        
        return !path.isNextPunctuator(closeRoundBrace);
    },
    'if (__a(__args)': (vars, path) => {
        return path.isNextKeyword();
    },
    '{__a} = __expr;': (vars, path) => {
        return !path.isPrevDeclarationKeyword();
    },
});

export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
    '__a(__args': '__a(__args)',
    'if (__a.__b(__args) {': 'if (__a.__b(__args)) {',
    'if (__a(__args) {': 'if (__a(__args)) {',
    'if (__a(__args)': 'if (__a(__args))',
    '{__a} = __expr;': '({__a} = __expr);',
});
