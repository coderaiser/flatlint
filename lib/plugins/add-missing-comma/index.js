import {isKeyword} from '#types';

export const report = () => 'Add missing comma';

export const match = () => ({
    __a: ({__a}, path) => {
        if (isKeyword(__a))
            return false;
        
        return !path.isNextPunctuator();
    },
});

export const replace = () => ({
    __a: '__a,',
});
