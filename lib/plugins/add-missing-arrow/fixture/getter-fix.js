const path = {
    [CreatePath]: createPath,
    findParent: createFindParent(path, {
        dir,
(type,
        filesystem,
        isStop,
    ) => {
        return createPath({
            dir: currentDir,
            type,
            filesystem,
            isStop,
        });
    },
};