import {
    closeCurlyBrace,
    colon,
    comma,
    isIdentifier,
    isKeyword,
    isNewLine,
    isPunctuator,
    isWhiteSpace,
    openRoundBrace,
    openSquireBrace,
    spread,
} from '#types';

const isSpace = (a) => isWhiteSpace(a) || isNewLine(a);

export const report = () => `Remove useless ','`;

export const match = () => ({
    ',,': (vars, path) => !path.isInsideSquareBraces(),
    ',': (vars, path) => {
        const [, ...prev] = path.getAllPrev();
        const [previous] = prev.filter((a) => !isSpace(a));
        
        if (!isPunctuator(previous, [comma, openRoundBrace]))
            return false;
        
        return path.isInsideRoundBraces();
    },
    '__a(__args) {},': (vars, path) => {
        for (const token of path.getAllPrev()) {
            if (isIdentifier(token, {name: 'class'}))
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
        if (path.isInsideRoundBraces())
            return false;
        
        if (!path.isNext())
            return true;
        
        if (path.isNextKeyword())
            return false;
        
        for (const current of path.getAllPrev()) {
            if (isPunctuator(current, [openSquireBrace, colon, spread]))
                return false;
            
            if (isKeyword(current, 'if'))
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
    ',,': ',',
    ',': '',
});
