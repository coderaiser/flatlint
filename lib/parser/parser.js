import tokenize from 'js-tokens';
import {
    isMultilineComment,
    isNewLine,
    isNoSubstitutionTemplate,
    isStringLiteral,
    isWhiteSpace,
    isTemplate,
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

export const prepare = (a, {cutWhiteSpaces = false} = {}) => {
    if (!isString(a))
        return a;
    
    const array = Array.from(tokenize(a, {
        jsx: true,
    }));
    
    preprocess(array);
    
    if (cutWhiteSpaces)
        return runCutWhiteSpaces(array);
    
    return array;
};

function runCutWhiteSpaces(array) {
    const result = [];
    
    for (const current of array) {
        if (isWhiteSpace(current))
            continue;
        
        result.push(current);
    }
    
    return result;
}

export const parse = (source) => {
    return getTokensWithLocation(prepare(source));
};

function getTokensWithLocation(tokens) {
    let line = 1;
    let column = 1;
    const result = [];
    
    for (const token of tokens) {
        line = maybeIncreateLine({
            token,
            line,
        });
        
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

function maybeIncreateLine({line, token}) {
    if (isNewLine(token))
        ++line;
    
    if (isMultilineComment(token))
        line += getNewlinesCount(token);
    
    if (isNoSubstitutionTemplate(token))
        line += getNewlinesCount(token);
    
    if (isTemplate(token))
        line += getNewlinesCount(token);
    
    return line;
}

const getNewlinesCount = ({value}) => value.split('\n').length - 1;
