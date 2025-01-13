import {
    isIdentifier,
    isNewLine,
    isKeyword,
    isPunctuator,
    isWhiteSpace,
} from '#types';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

export const createPath = ({tokens, start, end}) => ({
    tokens,
    start,
    end,
    isNextIdentifier: createIsNextIdentifier({
        tokens,
        end,
    }),
    getAllPrev: createGetAllPrev({
        tokens,
        start,
    }),
    getAllNext: createGetAllNext({
        tokens,
        end,
    }),
    isNextOperator: createIsNextOperator({
        tokens,
        end,
    }),
    isNextPunctuator: createIsNextPunctuator({
        tokens,
        end,
    }),
    isNext: createIsNext({
        tokens,
        end,
    }),
    isPrevIdentifier: createIsPrevIdentifier({
        tokens,
        start,
    }),
    isPrevPunctuator: createIsPrevPunctuator({
        tokens,
        start,
        end,
    }),
    isCurrentPunctuator: createIsNextPunctuator({
        tokens,
        end: end - 1,
    }),
});

const prev = ({tokens, start, end}) => {
    let i = end + 1;
    
    while (--i >= start) {
        const token = tokens[i];
        
        if (isNewLine(token))
            continue;
        
        if (isWhiteSpace(token))
            continue;
        
        return token;
    }
};

const next = ({tokens, end}) => {
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

const createIsNext = ({tokens, end}) => () => {
    return Boolean(next({
        tokens,
        end,
    }));
};

const createIsNextIdentifier = ({tokens, end}) => (value) => {
    const current = next({
        tokens,
        end,
    });
    
    return isIdentifier(current, value);
};

const createIsNextOperator = ({tokens, end}) => () => {
    const current = next({
        tokens,
        end,
    });
    
    return isKeyword(current);
};

const createIsNextPunctuator = ({tokens, end}) => (punctuators) => {
    const current = next({
        tokens,
        end,
    });
    
    if (!current)
        return false;
    
    if (!punctuators)
        return isPunctuator(current);
    
    for (const punctuator of maybeArray(punctuators)) {
        if (isPunctuator(current, punctuator))
            return true;
    }
    
    return false;
};

const createIsPrevPunctuator = ({tokens, start, end}) => (punctuators) => {
    const current = prev({
        tokens,
        start,
        end,
    });
    
    if (!current)
        return false;
    
    for (const punctuator of maybeArray(punctuators)) {
        if (isPunctuator(current, punctuator))
            return true;
    }
    
    return false;
};

const createIsPrevIdentifier = ({tokens, start}) => (value) => {
    const SPACE = 1;
    const FUNCTION = 1;
    const current = tokens[start - (FUNCTION + SPACE)];
    
    if (!current)
        return false;
    
    return isIdentifier(current, value);
};

const createGetAllPrev = ({tokens, start}) => function*() {
    for (let i = start; i >= 0; --i) {
        yield tokens[i];
    }
};

const createGetAllNext = ({tokens, end}) => function*() {
    for (let i = end; i < tokens.length; ++i) {
        const current = tokens[i];
        
        if (isNewLine(current))
            continue;
        
        yield current;
    }
};
