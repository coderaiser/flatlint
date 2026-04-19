import {
    closeRoundBrace,
    closeSquareBrace,
    semicolon,
    OK,
    NOT_OK,
    isTemplateArray,
    closeCurlyBrace,
} from '#types';
import {equal} from '../equal.js';

export const test = isTemplateArray;

export const collect = ({currentTokenIndex, tokens, nextTemplateToken = semicolon}) => {
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
        
        if (equal(token, closeCurlyBrace))
            break;
        
        if (equal(token, closeSquareBrace))
            break;
    }
    
    return [
        OK,
        --index,
    ];
};
