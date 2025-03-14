for (const line of list)) {
    continue;
}

function createDirectory(filename) {
    return {
        filename,
        type: 'directory',
        files: [],
    }
}