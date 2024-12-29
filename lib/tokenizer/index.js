import tokenize from 'js-tokens';
import {
    isNewLine,
    isStringLiteral,
} from '../compare/types.js';

const isString = (a) => typeof a === 'string';

const closeQuotes = (tokens) => {
    const n = tokens.length;
    
    for (let i = 0; i < n; i++) {
        const token = tokens[i];
        
        if (isStringLiteral(token)) {
            const {closed, value} = token;
            
            const quote = {
                type: 'Punctuator',
                value: value.at(0),
            };
            
            const newTokens = [];
            
            if (closed) {
                const literal = {
                    value: value.slice(1, -1),
                    type: 'StringLiteral',
                };
                
                newTokens.push(quote, literal, quote);
            } else {
                const literal = {
                    value: value.slice(1),
                    type: 'StringLiteral',
                };
                
                newTokens.push(quote, literal);
            }
            
            tokens.splice(i, 1, ...newTokens);
            ++i;
        }
    }
};

export const prepare = (a) => {
    if (!isString(a))
        return a;
    
    const array = Array.from(tokenize(a));
    closeQuotes(array);
    
    return array;
};

export const parse = (source) => {
    return getTokensWithLocation(prepare(source));
};

function getTokensWithLocation(tokens) {
    let line = 1;
    let column = 1;
    const result = [];
    
    for (const token of tokens) {
        if (isNewLine(token))
            ++line;
        
        result.push({
            ...token,
            line,
            column,
        });
        
        column += token.value.length;
        
        if (isNewLine(token))
            column = 1;
    }
    
    return result;
}
