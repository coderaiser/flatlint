const [errorParser, ast] = tryCatch(parse, source, {
    isTS: true,
});

if (errorParser) {
    console.error(`${parseError(errorParser)} (parser)`);
    throw Error('x');
}