import {
    isIdentifier,
    isPunctuator,
    openCurlyBrace,
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
        
        if (path.isNextIdentifier('const'))
            return true;
        
        return !path.isNextPunctuator(openCurlyBrace);
    },
});

export const replace = () => ({
    '__a(__args) {},': '__a(__args) {}',
    '__a(),': '__a()',
    '},': '}',
});
