export const createPath = ({tokens, start, end}) => ({
    isNextIdentifier: createIsNextIdentifier({
        tokens,
        end,
    }),
    getAllPrev: createGetAllPrev({
        tokens,
        start,
    }),
});