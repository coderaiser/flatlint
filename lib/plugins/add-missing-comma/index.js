import {
    colon,
    isKeyword,
    quote,
} from '#types';

export const report = () => 'Add missing comma';

export const match = () => ({
    __a: ({__a}, path) => {
        if (isKeyword(__a))
            return false;
        
        if (path.isNextKeyword())
            return false;
        
        if (path.isInsideTemplate())
            return false;
        
        if (path.isPrevPunctuator(colon) && path.isNextPunctuator(quote))
            return true;
        
        return !path.isNextPunctuator();
    },
});

export const replace = () => ({
    __a: '__a,',
});
