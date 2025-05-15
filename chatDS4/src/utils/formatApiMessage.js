import hljs from 'highlight.js'

export function formatApiMessage(text) {
    if (!text) return text

    // Шаг 1: Защищаем блоки кода перед обработкой
    const codeBlocks = []
    let result = text.replace(/```([\s\S]*?)```/g, (match) => {
        codeBlocks.push(match)
        return `%%CODE_BLOCK_${codeBlocks.length-1}%%`
    })

    // Шаг 2: Обрабатываем таблицы
    result = result.replace(
        /^(.+)\n\|?[-:|]+\|?\n((?:.*\|.*\n)+)/gm,
        (match, header, rows) => {
            const headers = header
                .split(/\t|\|/)
                .map(h => h.trim())
                .filter(h => h)
            
            const bodyRows = rows
                .split('\n')
                .filter(row => row.trim())
                .map(row => 
                    row
                        .split('|')
                        .map(cell => cell.trim())
                        .filter(cell => cell)
                )

            let html = '<table class="markdown-table"><thead><tr>'
            headers.forEach(h => html += `<th>${h}</th>`)
            html += '</tr></thead><tbody>'
            
            bodyRows.forEach(row => {
                html += '<tr>'
                row.forEach(cell => html += `<td>${cell}</td>`)
                html += '</tr>'
            })
            
            return html + '</tbody></table>'
        }
    )

    // Шаг 3: Базовое форматирование
    result = result
        // Заголовки (####)
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        
        // Жирный текст (**text**)
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        
        // Курсив (*text*)
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        
        // Зачеркнутый (~~text~~)
        .replace(/~~([^~]+)~~/g, '<del>$1</del>')
        
        // Горизонтальные линии (---)
        .replace(/^---$/gm, '<hr/>')
        
        // Inline-код (`code`)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Переносы строк
        .replace(/\n/g, '<br/>')

    // Шаг 4: Восстанавливаем блоки кода
    result = result.replace(/%%CODE_BLOCK_(\d+)%%/g, (_, index) => {
        const block = codeBlocks[index]
        const match = block.match(/```(\w*)\n([\s\S]*?)```/)
        const lang = match?.[1]
        const code = match?.[2]?.trim() || ''

        try {
            const highlighted = lang 
                ? hljs.highlight(code, { language: lang })
                : hljs.highlightAuto(code)
            return `<pre class="hljs-code-block"><code>${highlighted.value}</code></pre>`
        } catch {
            return `<pre class="hljs-code-block"><code>${code}</code></pre>`
        }
    })

    return result
}