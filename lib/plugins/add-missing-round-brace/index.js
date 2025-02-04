import {
    closeRoundBrace,
    isKeyword,
    isPunctuator,
    openRoundBrace,
    semicolon,
} from '#types';

export const report = () => 'Add missing round brace';

export const match = () => ({
    '__a(__args': ({__args}, path) => {
        const last = __args.at(-1);
        
        if (isPunctuator(last, semicolon))
            return false;
        
        if (path.isCurrentPunctuator(closeRoundBrace))
            return false;
        
        return !path.isNextPunctuator(closeRoundBrace);
    },
    'if (__a(__args)': (vars, path) => {
        return path.isNextKeyword();
    },
    '{__a} = __expr;': (vars, path) => !path.isPrevDeclarationKeyword(),
    '{__a} = __expr': (vars, path) => {
        return path.isNextKeyword();
    },
    '__a;': (vars, path) => {
        let result = false;
        
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, openRoundBrace)) {
                result = true;
                break;
            }
            
            if (isKeyword(current)) {
                result = false;
                break;
            }
        }
        
        return result;
    },
});

export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
    '__a(__args': '__a(__args)',
    'if (__a.__b(__args) {': 'if (__a.__b(__args)) {',
    'if (__a(__args) {': 'if (__a(__args)) {',
    'if (__a(__args)': 'if (__a(__args))',
    '{__a} = __expr;': '({__a} = __expr);',
    '{__a} = __expr': '({__a} = __expr)',
    '__a;': '__a);',
});
