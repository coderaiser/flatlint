import {
    isId,
    isIdentifier,
    isPunctuator,
    isQuote,
    isStringLiteral,
} from '#types';

export function equal(a, b) {
    return a.type === b.type && a.value === b.value;
}

export function equalAny(a, b) {
    if (!isIdentifier(b))
        return false;
    
    if (isPunctuator(a))
        return false;
    
    return b.value === '__';
}

export function equalQuote(a, b) {
    if (!isPunctuator(a))
        return false;
    
    return isQuote(b.value);
}

export function equalStr(a, b) {
    if (!isStringLiteral(a))
        return false;
    
    return isId(b.value);
}

export function equalId(a, b) {
    if (!isIdentifier(b))
        return false;
    
    if (isPunctuator(a))
        return false;
    
    return isId(b.value);
}