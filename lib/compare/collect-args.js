import {
    closeCurlyBrace,
    closeRoundBrace,
    isNewLine,
    isPunctuator,
    NOT_OK,
    OK,
    openCurlyBrace,
    openRoundBrace,
    semicolon,
} from '#types';
import {equal} from './equal.js';

const NOT_OK_PUNCTUATORS = [semicolon, closeRoundBrace];

export const collectArgs = ({currentTokenIndex, tokens}) => {
    let index = currentTokenIndex;
    
    const n = tokens.length;
    const currentToken = tokens[index];
    
    if (isPunctuator(currentToken, NOT_OK_PUNCTUATORS))
        return [NOT_OK];
    
    let curlyBracesBalance = 0;
    let roundBracesBalance = 0;
    
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
        
        if (equal(token, semicolon) && !curlyBracesBalance)
            break;
        
        if (curlyBracesBalance < 0)
            break;
        
        if (roundBracesBalance < 0)
            break;
    }
    
    if (isNewLine(tokens[index - 1]))
        --index;
    
    return [
        OK,
        --index,
    ];
};
