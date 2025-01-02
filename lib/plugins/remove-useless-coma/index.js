import {isIdentifier} from '#types';

export const report = () => 'Remove useless coma';

export const match = () => ({
    '__a() {},': (vars, path) => {
        for (const token of path.getPrev()) {
            if (isIdentifier(token, 'class'))
                return true;
        }
        
        return false;
    },
});

export const replace = () => ({
    '__a() {},': '__a() {}',
});
