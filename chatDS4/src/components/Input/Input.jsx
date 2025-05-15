import { useState, useEffect, useRef  } from "react"
import "./Input.less"

const isMac = /mac|iphone|ipad|ipod/i.test(navigator.userAgent)

export default function Input({ onSend, onNewChat, disabled }) {
    const [inputText, setInputText] = useState("")

    const inputRef = useRef(null)

    // Обработка горячих клавиш
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ctrl+Enter или Cmd+Enter для отправки
            if ((e.ctrlKey || e.metaKey) && e.code === 'Enter') {
                const value = inputRef.current?.value.trim()
                if (value) {
                    onSend(value)
                    setInputText("")
                }
                return
            }

            // Ctrl+Shift+N или Cmd+Shift+N для нового чата
            if (e.altKey && e.code === 'KeyN') {
                e.preventDefault()
                setInputText("")
                onNewChat()
            }
        }
    
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onSend, onNewChat])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputText.trim() || disabled) return  // Проверяем disabled
        onSend(inputText)
        setInputText("")
    };

    return (
        <form onSubmit={handleSubmit} className="input-form">
            <textarea
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Введите сообщение..."
                disabled={disabled}  // Отключаем input
            />

            <button 
                onClick={() => {setInputText(""); onNewChat();}}
                className="new-chat"
                disabled={disabled}
            >
                <b>Новый чат</b>
                {' (' + (isMac ? '⌥' : 'Alt') + ' + N)'}
            </button>

            <button 
                type="submit" 
                disabled={disabled}  // Отключаем кнопку
            >
                {disabled ? "Отправка..." : <b>Отправить</b>}
                {!disabled && ' (' + (isMac ? '⌘' : 'Ctrl') + ' + Enter)'}
            </button>
        </form>
    );
}