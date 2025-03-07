const node = new Proxy(rawNode, {
    get(target, prop) {
        if (files) {
            return node;
        }

        return readNode(filename, filesystem);
    },
});
