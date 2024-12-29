import tokenize from 'js-tokens';
import {
    isNewLine,
    isStringLiteral,
    Punctuator,
    StringLiteral,
} from '#types';

const isString = (a) => typeof a === 'string';

const closeQuotes = (tokens) => {
    const n = tokens.length;
    
    for (let i = 0; i < n; i++) {
        const token = tokens[i];
        
        if (isStringLiteral(token)) {
            const {closed, value} = token;
            
            const quote = Punctuator(value.at(0));
            const newTokens = [];
            
            if (closed) {
                const literal = StringLiteral(value.slice(1, -1));
                newTokens.push(quote, literal, quote);
            } else if (value.endsWith(';')) {
                const literal = StringLiteral(value.slice(1, -1));
                const semicolon = Punctuator(';');
                
                newTokens.push(quote, literal, semicolon);
            } else {
                const literal = StringLiteral(value.slice(1));
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
