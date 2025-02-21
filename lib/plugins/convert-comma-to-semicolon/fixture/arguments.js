const test = createTest(import.meta.url);

test('eslint-config: operator-linebreak', async ({process}) => {
    await process('operator-linebreak');
});

test('hello', 'eslint-config: operator-linebreak', async ({process}) => {
    await process('operator-linebreak');
});
