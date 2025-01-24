import tokenize from 'js-tokens';
import {
    isNewLine,
    isStringLiteral,
} from '#types';
import {parseStringLiteral} from './string-literal.js';

const isString = (a) => typeof a === 'string';

const preprocess = (tokens) => {
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        if (isStringLiteral(token))
            i = parseStringLiteral({
                token,
                tokens,
                i,
            });
    }
};

export const prepare = (a) => {
    if (!isString(a))
        return a;
    
    const array = Array.from(tokenize(a, {
        jsx: true,
    }));
    
    preprocess(array);
    
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
