import {
    closeRoundBrace,
    closeSquareBrace,
    colon,
    comma,
    isKeyword,
    isPunctuator,
    openRoundBrace,
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
    '{__a} = __expr;': (vars, path) => !path.isPrevDeclarationKeyword(),
    '{__a} = __expr': (vars, path) => {
        return path.isNextKeyword();
    },
    '__a;': (vars, path) => {
        if (path.isPrevPunctuator(colon))
            return false;
        
        let result = true;
        
        for (const current of path.getAllPrev())
            if (isKeyword(current)) {
                result = false;
                break;
            }
        
        return result;
    },
    '"__a"': (vars, path) => {
        if (path.isNextPunctuator([
            colon,
            comma,
            closeRoundBrace,
            closeSquareBrace,
        ]))
            return false;
        
        if (path.isPrevPunctuator(colon))
            return false;
        
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, closeRoundBrace))
                return false;
            
            if (isPunctuator(current, openRoundBrace))
                return true;
        }
        
        return false;
    },
    '}': (vars, path) => {
        if (!path.isNext())
            return false;
        
        if (path.isNextKeyword())
            return false;
        
        let balance = 0;
        
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, openRoundBrace))
                ++balance;
            
            if (isPunctuator(token, closeRoundBrace))
                --balance;
            
            if (isKeyword(token, 'if'))
                return false;
        }
        
        if (!balance)
            return false;
        
        return path.isNextCompare('__a(');
    },
    'if (!__a.__b(__args)': (vars, path) => !path.isNextPunctuator(closeRoundBrace),
});

export const replace = () => ({
    'if __a > __b': 'if (__a > __b)',
    '__a(__args': '__a(__args)',
    'if (__a.__b(__args) {': 'if (__a.__b(__args)) {',
    'if (__a(__args) {': 'if (__a(__args)) {',
    'if (__a(__args)': 'if (__a(__args))',
    'if (!__a.__b(__args)': 'if (!__a.__b(__args))',
    '"__a"': '"__a")',
    '{__a} = __expr;': '({__a} = __expr);',
    '{__a} = __expr': '({__a} = __expr)',
    '__a;': '__a);',
    '}': '})',
    '__a(__b(__c);': '__a(__b(__c));',
});
