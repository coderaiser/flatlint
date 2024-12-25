import tokenize from 'js-tokens';
import {isNewLine, isWhiteSpace} from '../compare/types.js';

export const parse = (source) => {
    const tokens = Array.from(tokenize(source));
    return getTokensWithLocation(tokens);
};

function getTokensWithLocation(tokens) {
    let line = 1;
    let column = 1;
    const result = [];
    
    for (const token of tokens) {
        if (isNewLine(token)) {
            ++line;
            continue;
        }
        
        if (isWhiteSpace(token)) {
            ++column;
            continue;
        }
        
        result.push({
            ...token,
            line,
            column,
        });
        
        column += token.value.length;
    }
    
    return result;
}
