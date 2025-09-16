const test = createTest(import.meta.url, {
    extends: {
        render: (operator) => (a, b) => operator.equal(1, 1),
    }
});

const e = (b) => a.b(c, d);