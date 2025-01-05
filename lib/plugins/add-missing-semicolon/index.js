import {isPunctuator} from '#types';

export const report = () => 'Add missing semicolon';

export const match = () => ({
    'const __a = __expr': check,
    '__a(__args)': check,
});

export const replace = () => ({
    'const __a = __expr': 'const __a = __expr;',
    '__a(__args)': '__a(__args);',
});

function check(vars, path) {
    for (const token of path.getAllNext()) {
        if (isPunctuator(token))
            return false;
    }
    
    return true;
}