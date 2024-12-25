import tokenize from 'js-tokens';
import {isNewLine} from '../compare/types.js';

const isString = (a) => typeof a === 'string';

export const prepare = (a) => {
    if (isString(a))
        return Array.from(tokenize(a));
    
    return a;
};

export const parse = (source) => {
    return getTokensWithLocation(prepare(source));
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
        
        result.push({
            ...token,
            line,
            column,
        });
        
        column += token.value.length;
    }
    
    return result;
}
