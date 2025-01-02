import {
    CloseRoundBrace,
    Punctuator,
} from '#types';
import {equal} from './equal.js';

export const collectArray = ({currentTokenIndex, tokens, nextTemplateToken = Punctuator(';')}) => {
    const n = tokens.length;
    const brace = Punctuator(']');
    let index = currentTokenIndex;
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, CloseRoundBrace))
            break;
        
        if (equal(token, nextTemplateToken))
            break;
        
        if (equal(token, brace))
            break;
    }
    
    return --index;
};
