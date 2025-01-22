const historyNew = history + rendy(template, {
    date: shortdate(),
    version: versionNew,
});

const history = history + rendy(template, {
    date: shortdate(abc),
    version: versionNew,
});
