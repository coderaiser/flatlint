import {
    isIdentifier,
    isKeyword,
    isPunctuator,
    isTemplateTail,
    isTemplateMiddle,
    isNoSubstitutionTemplate,
    getNext,
    getPrev,
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
    isNextKeyword: createIsNextKeyword({
        tokens,
        end,
    }),
    isNextPunctuator: createIsNextPunctuator({
        tokens,
        end,
    }),
    isPrevPunctuator: createIsPrevPunctuator({
        tokens,
        start,
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

const createIsNext = ({tokens, end}) => () => {
    return Boolean(getNext({
        tokens,
        end,
    }));
};

const createIsNextIdentifier = ({tokens, end}) => (value) => {
    const current = getNext({
        tokens,
        end,
    });
    
    return isIdentifier(current, value);
};

const createIsInsideTemplate = ({tokens, end}) => () => {
    const current = getNext({
        tokens,
        end,
    });
    
    if (isTemplateTail(current))
        return true;
    
    if (isNoSubstitutionTemplate(current))
        return true;
    
    return isTemplateMiddle(current);
};

const createIsNextKeyword = ({tokens, end}) => () => {
    const current = getNext({
        tokens,
        end,
    });
    
    return isKeyword(current);
};

const createIsNextPunctuator = ({tokens, end}) => (punctuators) => {
    const current = getNext({
        tokens,
        end,
    });
    
    if (!current)
        return false;
    
    return isPunctuator(current, punctuators);
};

const createIsPrevPunctuator = ({tokens, start}) => (punctuators) => {
    const current = getPrev({
        tokens,
        start,
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
