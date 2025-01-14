if (parentPath.isLabeledStatement()) {
    const block = parentPath.parentPath;
    
    if (isBlockStatement(blockPath))
        return isPrevReturnWithoutArg(blockPath);
}