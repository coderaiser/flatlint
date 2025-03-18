test('putout: operator: filesystem: renameFile', (t) => {
    const result = print(ast, {
        printer: PRINTER,
    });

    t.equal(result, expected);
    t.end();
});