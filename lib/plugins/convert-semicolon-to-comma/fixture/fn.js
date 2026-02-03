export const listen = (socket, options) => {
    options = options || {};

    const {
        root = '/',
        auth,
        prefixSocket = '/edward',
    } = options;

    return socketFile(socket, {
        root: maybe(root),
        auth,
        prefix: prefixSocket,
    });
};