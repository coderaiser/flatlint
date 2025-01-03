import {
    closeRoundBrace,
    closeSquareBrace,
    semicolon,
    OK,
    NOT_OK,
} from '#types';
import {equal} from './equal.js';

export const collectArray = ({currentTokenIndex, tokens, nextTemplateToken = semicolon}) => {
    const n = tokens.length;
    let index = currentTokenIndex;
    
    if (equal(tokens[index], closeSquareBrace))
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
