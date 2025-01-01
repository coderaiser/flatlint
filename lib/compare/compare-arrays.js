import {isTemplateArrayToken} from '#types';
import {equal} from './equal.js';

export const compareArrays = ({currentTokenIndex, tokens, nextTemplateToken}) => {
    const n = tokens.length;
    
    for (let index = currentTokenIndex; index < n; index++) {
        const token = tokens[index];
        
        if (equal(token, nextTemplateToken))
            return --index;
    }
    
    return currentTokenIndex;
};
