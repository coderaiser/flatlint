import {
    closeRoundBrace,
    closeSquareBrace,
    NOT_OK,
    OK,
    OpenRoundBrace,
} from '#types';
import {equal} from './equal.js';

export const collectArgs = ({currentTokenIndex, tokens, nextTemplateToken = closeRoundBrace}) => {
    const n = tokens.length;
    let index = currentTokenIndex;
    
    if (equal(tokens[index - 1], OpenRoundBrace) && equal(tokens[index], closeRoundBrace))
        return [NOT_OK];
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, closeRoundBrace))
            break;
        
        if (equal(token, nextTemplateToken))
            break;
        
        if (equal(token, closeSquareBrace))
            break;
    }
    
    return [
        OK,
        --index,
    ];
};
