export function createTokenTypes() {
    return {
        operator: ['=', '==', '&&'], // Add support for operators like '=', '==' and '&&'
    };
}

export function filter({tokens, currentToken, index}) {
    return currentToken.type === 'operator'
        && (currentToken.value === '='
        || currentToken.value === '=='
        || currentToken.value === '&&')
        && tokens[index - 1]?.type === 'identifier'
        && // Ensure there's an identifier before
tokens[index + 1]?.type === 'identifier' // And an identifier after
    ;
}

export function fix({tokens, index}) {
    if (tokens[index].value === '=' || tokens[index].value === '==')
        tokens[index] = {
            type: 'operator',
            value: '===',
        };
        // Fix to '==='
}

export function report() {
    return `Use '===' for strict equality instead of '=' or '=='`;
}
