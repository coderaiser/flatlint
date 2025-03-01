const scope = {
    crawl: createCrawl(),
    getProgramParent: createGetProgramParent({
        dir,
        type,
        filesystem,
    })
};
