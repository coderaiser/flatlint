const isString = (a) => typeof a === 'string';

export const isWhiteSpace = ({type}) => type === 'WhiteSpace';
export const isIdentifier = ({type}) => type === 'IdentifierName';
export const isStringLiteral = ({type}) => type === 'StringLiteral';
export const isNumericLiteral = ({type}) => type === 'NumericLiteral';
export const isNewLine = ({type}) => type === 'LineTerminatorSequence';
export const notWhiteSpace = (a) => !isWhiteSpace(a);
export const isPunctuator = ({type}) => type === 'Punctuator';

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

const ALL = [ANY, LINKED_NODE];

function check(str, item) {
    if (isString(item))
        return str === item;
    
    return item.test(str);
}

export const isId = (a) => LINKED_NODE.test(a);
export const isQuote = (a) => QUOTE.test(a);
