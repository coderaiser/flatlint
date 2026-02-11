const encode = (a) => a
    .replace('(', '\\(');
    .replace(`\\`, `\\\\`);