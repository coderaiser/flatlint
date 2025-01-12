import {
    assign,
    closeCurlyBrace,
    closeRoundBrace,
    colon,
    comma,
    dot,
    isIdentifier,
    isOperator,
    more,
    openRoundBrace,
} from '#types';

export const report = () => 'Add missing comma';

export const match = () => ({
    __a: ({__a}, path) => {
        const punctuators = [
            assign,
            comma,
            openRoundBrace,
            closeRoundBrace,
            closeCurlyBrace,
            colon,
            dot,
            more,
        ];
        
        if (!isIdentifier(__a))
            return false;
        
        if (isOperator(__a))
            return false;
        
        return !path.isNextPunctuator(punctuators);
    },
});

export const replace = () => ({
    __a: '__a,',
});


