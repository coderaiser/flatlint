const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const isString = (a) => typeof a === 'string';

export const isWhiteSpace = ({type}) => type === 'WhiteSpace';
export const isIdentifier = (token, value = token.value) => {
    const {type} = token;
    const is = type === 'IdentifierName';
    
    if (!is)
        return false;
    
    return value === token.value;
};

export const isStringLiteral = ({type}) => type === 'StringLiteral';
export const isNumericLiteral = ({type}) => type === 'NumericLiteral';
export const isNewLine = ({type}) => type === 'LineTerminatorSequence';
export const notWhiteSpace = (a) => !isWhiteSpace(a);
export const isKeyword = (token) => {
    const keywords = [
        'await',
        'var',
        'let',
        'const',
        'export',
        'from',
        'import',
        'return',
        'function',
    ];
    
    for (const keyword of keywords) {
        if (isIdentifier(token, keyword))
            return true;
    }
    
    return false;
};

export const isOneOfKeywords = (token, keywords) => {
    for (const keyword of keywords) {
        if (isIdentifier(token, keyword))
            return true;
    }
    
    return false;
};

export const isPunctuator = (token, punctuator) => {
    if (token.type !== 'Punctuator')
        return false;
    
    if (!punctuator)
        return true;
    
    const punctuatorValue = punctuator.value;
    
    return token.value === punctuatorValue;
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

const LINKED_NODE = /^__[a-z]$/;
const ANY = '__';
const QUOTE = /^['"]$/;
const ARRAY = '__array';
const EXPR = '__expr';
const ARGS = '__args';

const ALL = [
    ANY,
    LINKED_NODE,
    ARRAY,
    ARGS,
    EXPR,
];

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

export const arrow = Punctuator('=>');
export const closeRoundBrace = Punctuator(')');
export const closeSquareBrace = Punctuator(']');
export const colon = Punctuator(':');
export const comma = Punctuator(',');
export const dot = Punctuator('.');
export const more = Punctuator('>');
export const assign = Punctuator('=');
export const openRoundBrace = Punctuator('(');
export const semicolon = Punctuator(';');
export const openCurlyBrace = Punctuator('{');
export const closeCurlyBrace = Punctuator('}');
export const openSquireBrace = Punctuator('[');
export const quote = Punctuator(`'`);

export const OK = true;
export const NOT_OK = false;

