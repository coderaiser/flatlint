import {
    isIdentifier,
    isNewLine,
    isKeyword,
    isPunctuator,
    isWhiteSpace,
    isTemplateTail,
    isTemplateMiddle,
} from '#types';

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
    isNextKeyword: createIsNextKeyword({
        tokens,
        end,
    }),
    isNextPunctuator: createIsNextPunctuator({
        tokens,
        end,
    }),
    isInsideTemplate: createIsInsideTemplate({
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
    isCurrentPunctuator: createIsNextPunctuator({
        tokens,
        end: end - 1,
    }),
});

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

const createIsInsideTemplate = ({tokens, end}) => () => {
    const current = next({
        tokens,
        end,
    });
    
    if (isTemplateTail(current))
        return true;
    
    return isTemplateMiddle(current);
};

const createIsNextKeyword = ({tokens, end}) => () => {
    const current = next({
        tokens,
        end,
    });
    
    if (!current)
        return false;
    
    return isKeyword(current);
};

const createIsNextPunctuator = ({tokens, end}) => (punctuators) => {
    const current = next({
        tokens,
        end,
    });
    
    if (!current)
        return false;
    
    return isPunctuator(current, punctuators);
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
        yield tokens[i];
    }
};
