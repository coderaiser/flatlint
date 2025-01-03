import {
    CloseRoundBrace,
    OpenRoundBrace,
    Punctuator,
} from '#types';
import {equal} from './equal.js';

export const collectArgs = ({currentTokenIndex, tokens, nextTemplateToken = Punctuator(')')}) => {
    const n = tokens.length;
    const brace = Punctuator(']');
    let index = currentTokenIndex;
    
    if (equal(tokens[index - 1], OpenRoundBrace) && equal(tokens[index], CloseRoundBrace))
        return [false];
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, CloseRoundBrace))
            break;
        
        if (equal(token, nextTemplateToken))
            break;
        
        if (equal(token, brace))
            break;
    }
    
    return [
        true,
        --index,
    ];
};
