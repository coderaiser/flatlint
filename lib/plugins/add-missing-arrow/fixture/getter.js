const path = {
    [CreatePath]: createPath,
    findParent: createFindParent(path, {
        dir,
        type,
        filesystem,
        isStop,
    }),

    get parentPath() {
        return createPath({
            dir: currentDir,
            type,
            filesystem,
            isStop,
        });
    },
};