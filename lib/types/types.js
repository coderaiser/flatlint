import * as keyword from '@putout/operator-keyword';

const ARGS = '__args';
const EXPR = '__expr';
const ARRAY = '__array';
const ANY = '__';
const LINKED_NODE = /^__[a-z]$/;

const ALL = [
    ANY,
    LINKED_NODE,
    ARRAY,
    ARGS,
    EXPR,
];

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const isString = (a) => typeof a === 'string';

export const isTemplateMiddle = (a) => a?.type === 'TemplateMiddle';
export const isNoSubstitutionTemplate = (a) => a?.type === 'NoSubstitutionTemplate';
export const isTemplateHead = (a) => a?.type === 'TemplateHead';
export const isTemplateTail = (a) => a?.type === 'TemplateTail';
export const isWhiteSpace = ({type}) => type === 'WhiteSpace';
export const isIdentifier = (token, newToken) => {
    const {type} = token;
    const is = type === 'IdentifierName' || type === 'PrivateIdentifier';
    
    if (!is)
        return false;
    
    if (!newToken)
        return true;
    
    const newValue = newToken.value || newToken;
    
    return newValue === token.value;
};

export const isStringLiteral = ({type}) => type === 'StringLiteral';
export const isNumericLiteral = ({type}) => type === 'NumericLiteral';
export const isNewLine = ({type}) => type === 'LineTerminatorSequence';
export const isMultilineComment = ({type}) => type === 'MultiLineComment';

export const isKeyword = (token, names) => {
    if (!token)
        return false;
    
    for (const name of maybeArray(names)) {
        const {value} = token;
        const is = keyword.isKeyword(value);
        const isTS = keyword.isTSKeyword(value);
        
        if (!is && !isTS)
            return false;
        
        if (isIdentifier(token, name))
            return true;
    }
    
    return false;
};

export const isDeclarationKeyword = (token, name) => {
    if (!token)
        return false;
    
    const {value} = token;
    
    if (!keyword.isDeclarationKeyword(value))
        return false;
    
    return isIdentifier(token, name);
};

export const isOneOfIdentifiers = (token, keywords) => {
    for (const keyword of keywords) {
        if (isIdentifier(token, keyword))
            return true;
    }
    
    return false;
};

export const isPunctuator = (token, punctuator) => {
    if (!token)
        return false;
    
    if (token.type !== 'Punctuator')
        return false;
    
    if (!punctuator)
        return true;
    
    for (const {value} of maybeArray(punctuator)) {
        if (token.value === value)
            return true;
    }
    
    return false;
};

export const StringLiteral = (value) => ({
    type: 'StringLiteral',
    value,
});

export const Punctuator = (value) => ({
    type: 'Punctuator',
    value,
});

export const is = (str, array = ALL) => {
    for (const item of array) {
        if (check(str, item))
            return true;
    }
    
    return false;
};

const QUOTE = /^['"]$/;

function check(str, item) {
    if (isString(item))
        return str === item;
    
    return item.test(str);
}

export const isId = (a) => LINKED_NODE.test(a);
export const isQuote = (a) => QUOTE.test(a);
export const isTemplateArray = (a) => a === ARRAY;
export const isTemplateExpression = (a) => a === EXPR;
export const isTemplateArgs = (a) => a === ARGS;
export const isTemplateArrayToken = (a) => isIdentifier(a) && isTemplateArray(a.value);
export const isTemplateExpressionToken = (a) => isIdentifier(a) && isTemplateExpression(a.value);
export const isTemplateArgsToken = (a) => isIdentifier(a) && isTemplateArgs(a.value);

export const bitwiseAnd = Punctuator('&');
export const arrow = Punctuator('=>');
export const closeRoundBrace = Punctuator(')');
export const closeSquareBrace = Punctuator(']');
export const colon = Punctuator(':');
export const comma = Punctuator(',');
export const dot = Punctuator('.');
export const question = Punctuator('?');
export const more = Punctuator('>');
export const less = Punctuator('<');
export const assign = Punctuator('=');
export const openRoundBrace = Punctuator('(');
export const or = Punctuator('||');
export const binaryOr = Punctuator('|');
export const spread = Punctuator('...');
export const rest = Punctuator('...');
export const semicolon = Punctuator(';');
export const openCurlyBrace = Punctuator('{');
export const closeCurlyBrace = Punctuator('}');
export const openSquireBrace = Punctuator('[');
export const quote = Punctuator(`'`);

export const OK = true;
export const NOT_OK = false;

export const isOnlyWhitespaces = (tokens) => {
    for (const token of tokens) {
        if (isWhiteSpace(token))
            continue;
        
        if (isNewLine(token))
            continue;
        
        return false;
    }
    
    return true;
};

export const hasRoundBraces = (tokens) => {
    const roundBraces = [openRoundBrace, closeRoundBrace];
    
    for (const token of tokens) {
        if (isPunctuator(token, roundBraces))
            return true;
    }
    
    return false;
};

export const isBalancedRoundBraces = (tokens) => {
    let roundBalance = 0;
    
    for (const token of tokens) {
        if (isPunctuator(token, openRoundBrace))
            roundBalance++;
        
        if (isPunctuator(token, closeRoundBrace))
            roundBalance--;
    }
    
    return !roundBalance;
};

export const getNext = ({tokens, end}) => {
    let i = end - 1;
    
    while (++i) {
        const token = tokens[i];
        
        if (!token)
            return token;
        
        if (isNewLine(token))
            continue;
        
        if (isWhiteSpace(token))
            continue;
        
        return token;
    }
};

export const getPrev = ({tokens, start}) => {
    let i = start;
    
    while (--i > -1) {
        const token = tokens[i];
        
        if (isWhiteSpace(token))
            continue;
        
        return token;
    }
};
