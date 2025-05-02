import { useState } from "react"
import "./Input.less"

export default function Input({ onSend, disabled }) {  // Принимаем проп disabled
    const [inputText, setInputText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputText.trim() || disabled) return  // Проверяем disabled
        onSend(inputText)
        setInputText("")
    }

    return (
        <form onSubmit={handleSubmit} className="input-form">
            <textarea
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Введите сообщение..."
                disabled={disabled}  // Отключаем input
            />
            <button 
                type="submit" 
                disabled={disabled}  // Отключаем кнопку
            >
                {disabled ? "Отправка..." : "Отправить"}
            </button>
        </form>
    )
}