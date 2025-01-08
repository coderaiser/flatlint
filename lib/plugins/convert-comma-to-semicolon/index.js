import {colon, isPunctuator} from '#types';

export const report = () => 'Use semicolon instead of trailing comma';
export const match = () => ({
    '__a(__args),': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, colon))
                return false;
        }
        
        return true;
    },
});

export const replace = () => ({
    'const __a = __b,': 'const __a = __b;',
    '__a(__args),': '__a(__args);',
});
