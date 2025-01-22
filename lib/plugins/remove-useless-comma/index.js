import {
    closeCurlyBrace,
    colon,
    isIdentifier,
    isPunctuator,
    openSquireBrace,
} from '#types';

export const report = () => 'Remove useless coma';

export const match = () => ({
    '__a(__args) {},': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isIdentifier(token, 'class'))
                return true;
        }
        
        return false;
    },
    '},': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, openSquireBrace))
                return false;
        }
        
        if (!path.isNext())
            return true;
        
        if (path.isNextPunctuator(closeCurlyBrace))
            return false;
        
        return path.isNextIdentifier('const');
    },
    '}),': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isPunctuator(token, colon))
                return false;
        }
        
        return !path.isNext();
    },
    '__a(__args),': (vars, path) => {
        if (!path.isNext())
            return true;
        
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, colon))
                return false;
        }
        
        return true;
    },
});

export const replace = () => ({
    '__a(__args) {},': '__a(__args) {}',
    '__a(__args),': '__a(__args)',
    '},': '}',
    '}),': '})',
});
