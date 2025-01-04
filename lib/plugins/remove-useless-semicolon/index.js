import {isIdentifier} from '#types';

export const report = () => 'Remove useless semicolon';

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
    '__a: __expr;': '__a: __expr,',
});
