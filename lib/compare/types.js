export const isWhiteSpace = ({type}) => type === 'WhiteSpace';
export const isIdentifier = ({type}) => type === 'IdentifierName';
export const isNumericLiteral = ({type}) => type === 'NumericLiteral';
export const isNewLine = ({type}) => type === 'LineTerminatorSequence';
export const notWhiteSpace = (a) => !isWhiteSpace(a);
export const isPunctuator = ({type}) => type === 'Punctuator';
