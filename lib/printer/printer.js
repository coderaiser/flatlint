const getValue = (token) => token.value;

export const print = (tokens) => {
    return tokens
        .map(getValue)
        .join('');
};
