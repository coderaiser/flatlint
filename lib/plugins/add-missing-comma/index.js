import {
    colon,
    isKeyword,
    quote,
    assign,
} from '#types';

export const report = () => 'Add missing comma';

export const match = () => ({
    '__a': ({__a}, path) => {
        if (path.isNextTemplateHead())
            return false;
        
        const isType = isKeyword(__a, 'type');
        
        if (isType && path.isNextCompare('__a ='))
            return false;
        
        if (!isType && isKeyword(__a))
            return false;
        
        if (path.isNextKeyword())
            return false;
        
        if (!path.isNext())
            return false;
        
        if (path.isInsideTemplate())
            return false;
        
        if (path.isNextCompare(`',`))
            return false;
        
        if (path.isPrevPunctuator(colon) && path.isNextPunctuator(quote))
            return true;
        
        return !path.isNextPunctuator();
    },
    '"__a"': (vars, path) => {
        if (path.isNextPunctuator(quote))
            return true;
        
        if (path.isNextKeyword())
            return false;
        
        if (path.isPrevPunctuator(assign))
            return false;
        
        return path.isNextIdentifier();
    },
});

export const replace = () => ({
    '__a': '__a,',
    '"__a"': '"__a",',
});
