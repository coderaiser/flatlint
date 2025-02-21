import {
    closeRoundBrace,
    comma,
    Punctuator,
    semicolon,
    StringLiteral,
} from '#types';

export function parseStringLiteral({i, token, tokens}) {
    const {closed} = token;
    let {value} = token;
    
    const quote = Punctuator(`'`);
    const newTokens = [quote];
    
    if (closed) {
        const literal = StringLiteral(value.slice(1, -1));
        
        newTokens.push(literal, quote);
        tokens.splice(i, 1, ...newTokens);
        ++i;
    } else {
        let count = 0;
        
        if (value.endsWith(';')) {
            value = value.slice(0, -1);
            newTokens.push(semicolon);
            ++count;
        }
        
        if (value.endsWith(',')) {
            value = value.slice(0, -1);
            newTokens.push(comma);
            ++count;
        }
        
        if (value.endsWith(')')) {
            const brace = closeRoundBrace;
            
            value = value.slice(0, -1);
            const {length} = newTokens;
            const start = !count ? length : length - 1;
            
            newTokens.splice(start, 0, brace);
            ++count;
        }
        
        ++count;
        
        const literal = StringLiteral(value.slice(1));
        
        if (literal.value)
            newTokens.splice(1, 0, literal);
        
        tokens.splice(i, 1, ...newTokens);
        i += count;
    }
    
    return i;
}
