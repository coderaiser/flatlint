import {isIdentifier} from '../compare/types.js';

const isFn = (a) => typeof a === 'function';
const maybeCall = (fn, a) => isFn(a) && fn(a);

export const traverse = (tokens, visitors = {}) => {
    for (const [index, token] of tokens.entries()) {
        if (isIdentifier(token))
            maybeCall(visitors.Identifier, {
                ...token,
                index,
            });
    }
};
