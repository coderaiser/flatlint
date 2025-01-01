import {Punctuator} from '#types';
import {equal} from './equal.js';

export const collectExpression = ({currentTokenIndex, tokens, nextTemplateToken}) => {
    const n = tokens.length;
    const closeBrace = Punctuator(')');
    const openBrace = Punctuator('(');
    const semicolon = Punctuator(';');
    let index = currentTokenIndex;
    
    for (; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, semicolon))
            break;
        
        if (equal(token, nextTemplateToken))
            break;
        
        if (equal(token, openBrace))
            break;
        
        if (equal(token, closeBrace))
            break;
    }
    
    return --index;
};
