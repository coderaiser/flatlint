import {isIdentifier} from '#types';

export const report = () => 'Use semicolon instead of trailing comma';
export const match = () => ({
    '__a: __expr;': (vars, path) => {
        for (const token of path.getPrev()) {
            if (isIdentifier(token, 'interface'))
                return false;
        }
        
        return true;
    },
});
export const replace = () => ({
    'const __a = __b,': 'const __a = __b;',
});
