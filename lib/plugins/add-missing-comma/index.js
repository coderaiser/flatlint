import {isIdentifier, isOperator} from '#types';

export const report = () => 'Add missing comma';

export const match = () => ({
    __a: ({__a}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        if (isOperator(__a))
            return false;
        
        return !path.isNextPunctuator();
    },
});

export const replace = () => ({
    __a: '__a,',
});
