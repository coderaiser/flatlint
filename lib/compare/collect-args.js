import {
    closeRoundBrace,
    isNewLine,
    NOT_OK,
    OK,
} from '#types';
import {equal} from './equal.js';

export const collectArgs = ({currentTokenIndex, tokens}) => {
    const n = tokens.length;
    let index = currentTokenIndex;
    
    if (equal(tokens[index], closeRoundBrace))
        return [NOT_OK];
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, closeRoundBrace))
            break;
        
        if (isNewLine(token))
            break;
    }
    
    return [
        OK,
        --index,
    ];
};
