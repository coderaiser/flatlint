import tokenize from 'js-tokens';

export function lint(tokens, {fix = false, plugins}) {
    let fixedTokens = tokens.slice(); // Make a copy of the tokens to apply fixes
    let places = [];
    
    // Проходим по каждому плагину
    for (const plugin of plugins) {
        // Если fix true, используем replace, если false — compare
        if (fix) {
            fixedTokens = handleTokens(fixedTokens, plugin, 'replace');
            continue;
        }
        
        const pluginPlaces = handleTokens(fixedTokens, plugin, 'compare');
        
        places = [
            ...places,
            ...pluginPlaces,
        ];
    }
    
    // Преобразуем токены обратно в строку
    const lintedCode = fixedTokens
        .map((token) => token.value)
        .join(' ');
    
    return [lintedCode, places];
}

// Обрабатываем токены для поиска и замены
function handleTokens(tokens, plugin, mode) {
    const resultTokens = tokens.slice();
    const replacement = plugin.replace();
    
    for (const [i, currentToken] of resultTokens.entries()) {
        // Для каждого шаблона замены ищем соответствующие токены
        for (const pattern in replacement) {
            // Токенизируем шаблон с помощью js-tokens
            const patternTokens = Array.from(tokenize(pattern));
            const replacementValue = replacement[pattern];
            
            // Пропускаем пробелы и новые строки в токенах
            let tokenValues = '';
            let j = i;
            let matchFound = true;
            
            // Собираем токены и игнорируем пробелы и переносы строк
            for (const patternToken of patternTokens) {
                // Пропускаем токены типа WhiteSpace и LineTerminatorSequence
                while (j < resultTokens.length && (resultTokens[j].type === 'WhiteSpace' || resultTokens[j].type === 'LineTerminatorSequence')) {
                    j++;
                }
                
                // Сравниваем типы токенов для __ (если это IdentifierName или NumericLiteral, то это подходит)
                if (j < resultTokens.length && (patternToken.value === '__' ? resultTokens[j].type === 'IdentifierName' || resultTokens[j].type === 'NumericLiteral' : resultTokens[j].type === patternToken.type) && (patternToken.value === '__' || resultTokens[j].value === patternToken.value)) {
                    tokenValues += resultTokens[j].value;
                    j++;
                } else {
                    matchFound = false;
                    break;
                }
            }
            
            // Если совпало с шаблоном, выполняем действия в зависимости от режима (compare или replace)
            if (matchFound) {
                if (mode === 'compare')
                    return [{
                        message: plugin.report(),
                        line: currentToken.line,
                        column: currentToken.col,
                    }];
                
                if (mode === 'replace') {
                    const newTokens = createReplacementTokens(
                        replacementValue,
                        resultTokens[i].line,
                        resultTokens[i].col,
                    );
                    
                    resultTokens.splice(i, patternTokens.length, ...newTokens);
                }
            }
        }
    }
    
    return resultTokens;
}

// Функция для создания новых токенов на основе строки замены
function createReplacementTokens(value, line, col) {
    // Создаем новые токены с типом IdentifierName
    const tokens = value
        .split(' ')
        .map((v) => ({
            type: 'IdentifierName', // Используем тип IdentifierName для замены
            value: v,
            line,
            col,
        }));
    
    // Вернуть новый набор токенов с корректной информацией о строках и колонках
    return tokens;
}
