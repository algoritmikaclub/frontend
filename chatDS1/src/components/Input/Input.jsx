import { useState } from "react"
import "./Input.less"

export default function Input({ onSend }) {
    const [inputText, setInputText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputText.trim()) return
        onSend(inputText)
        setInputText("")
    };

    return (
        <form onSubmit={handleSubmit} className="input-form">
        <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Введите сообщение..."
        />
        <button type="submit">Отправить</button>
        </form>
    )
}

