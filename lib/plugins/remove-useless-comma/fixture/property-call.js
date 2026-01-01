const createImport = ({name, source}) => {
    const specifiers = [
        importDefaultSpecifier(name),
    ];

    return importDeclaration(specifiers, source);
};