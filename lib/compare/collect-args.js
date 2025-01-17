import {
    closeCurlyBrace,
    closeRoundBrace,
    isNewLine,
    NOT_OK,
    OK,
    openCurlyBrace,
    openRoundBrace,
} from '#types';
import {equal} from './equal.js';

export const collectArgs = ({currentTokenIndex, tokens}) => {
    const n = tokens.length;
    let index = currentTokenIndex;
    
    if (equal(tokens[index], closeRoundBrace))
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
