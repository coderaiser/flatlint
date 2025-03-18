const ast = parse(montag`
    ${FS}({
        "type": "directory",
        "filename": "/lib/lint/json.js",
        "files": []
    });
`);

const expected = montag`
    ${__filesystem_name}({
        "type": "directory",
        "filename": "/lib/lint/hello.js",
        "files": []
    });
`;