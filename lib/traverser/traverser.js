import {
    isIdentifier,
    isStringLiteral,
} from '#types';

const maybeCall = (fn, a) => fn?.(a);

export const traverse = (tokens, visitors = {}) => {
    for (const [index, token] of tokens.entries()) {
        if (isIdentifier(token)) {
            maybeCall(visitors.Identifier, {
                ...token,
                index,
            });
            continue;
        }
        
        if (isStringLiteral(token)) {
            maybeCall(visitors.StringLiteral, {
                ...token,
                index,
            });
            continue;
        }
    }
};
