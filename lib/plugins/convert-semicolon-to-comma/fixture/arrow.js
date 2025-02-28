const reportCode = (lint, options, t) => (source, message, plugins) => {
    const {places} = lint(source, {
        fix: false,
        ...options,
        plugins: {
            ...options.plugins,
            plugins,
        },
    });

    const resultMessages = places.map(getMessage);

    if (isArray(message))
        return t.deepEqual(resultMessages, message);

    return t.equal(resultMessages[0], message);
});