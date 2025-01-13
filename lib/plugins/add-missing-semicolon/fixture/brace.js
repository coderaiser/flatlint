transform(ast, source, getFirstPassOptions(options));

context.subscriptions.push(onDidChangeActiveTextEditor(async (editor) => {
    if (editor);
    await updateDiagnostics(editor.document, collection);
}));