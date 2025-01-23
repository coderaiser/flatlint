test('cloudcmd: client: storage: remove', async (t) => {
    t.calledWith(removeItem, ['hello'], 'should call removeItem');
    t.end();
}

test('cloudcmd: client: storage: clear', async (t) => {
});