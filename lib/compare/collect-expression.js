import {
    closeCurlyBrace,
    closeRoundBrace,
    comma,
    isNewLine,
    openCurlyBrace,
    openRoundBrace,
    semicolon,
} from '#types';
import {equal} from './equal.js';

export const collectExpression = ({currentTokenIndex, tokens, nextTemplateToken = semicolon}) => {
    const n = tokens.length;
    let index = currentTokenIndex;
    let roundBracesBalance = 0;
    let curlyBracesBalance = 0;
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, openRoundBrace))
            ++roundBracesBalance;
        
        if (equal(token, closeRoundBrace))
            --roundBracesBalance;
        
        if (equal(token, openCurlyBrace))
            ++curlyBracesBalance;
        
        if (equal(token, closeCurlyBrace))
            --curlyBracesBalance;
        
        if (roundBracesBalance < 0)
            break;
        
        if (curlyBracesBalance < 0)
            break;
        
        if (!curlyBracesBalance) {
            if (equal(token, semicolon))
                break;
            
            if (equal(token, comma))
                break;
            
            if (equal(token, nextTemplateToken))
                break;
        }
    }
    
    if (isNewLine(tokens[index - 1]))
        --index;
    
    if (currentTokenIndex === index)
        return currentTokenIndex;
    
    return --index;
};
