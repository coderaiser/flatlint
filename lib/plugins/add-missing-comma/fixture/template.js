const nameTo = join(__dirname, 'fixture', `${fixtureName}-fix.js`);
log(`${rule}: ${from} -> ${to}`);

const source = montag`
    if a > 3 {
        alert();
    }
`;