import {
    closeCurlyBrace,
    closeRoundBrace,
    comma,
    openRoundBrace,
    semicolon,
} from '#types';
import {equal} from './equal.js';

export const collectExpression = ({currentTokenIndex, tokens, nextTemplateToken = semicolon}) => {
    const n = tokens.length;
    let index = currentTokenIndex;
    let roundBracesBalance = 0;
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, semicolon))
            break;
        
        if (equal(token, comma))
            break;
        
        if (equal(token, nextTemplateToken))
            break;
        
        if (equal(token, closeCurlyBrace))
            break;
        
        if (equal(token, openRoundBrace))
            ++roundBracesBalance;
        
        if (equal(token, closeRoundBrace))
            --roundBracesBalance;
        
        if (roundBracesBalance < 0)
            break;
    }
    
    return --index;
};
