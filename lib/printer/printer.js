const isString = (a) => typeof a === 'string';
const getValue = (token) => token.value;

export const print = (tokens) => {
    if (isString(tokens))
        return tokens;
    
    return tokens
        .map(getValue)
        .join('');
};
