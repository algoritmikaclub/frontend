import { useState } from "react"
import { askDeepSeek } from "../../utils/api"
import Message from "../Message/Message"
import Input from "../Input/Input"
import "./Chat.less"

export default function Chat() {
    const [messages, setMessages] = useState([]) // состояние сообщений
    const [isLoading, setIsLoading] = useState(false) // Добавляем состояние загрузки

    const handleSend = (text) => {
        const newMessage = { text, sender: "user" }
        setMessages((prev) => [...prev, newMessage])
        setIsLoading(true) // Включаем индикатор загрузки

        // Добавляем временное сообщение
        const tempMessage = { text: "Идет обработка", sender: "bot", isTemp: true }
        setMessages((prev) => [...prev, tempMessage])

        // Запрос к API
        askDeepSeek(text).then((reply) => {
            // Удаляем временное сообщение и добавляем настоящий ответ
            setMessages((prev) => [
                ...prev.filter(msg => !msg.isTemp),
                { text: reply, sender: "bot" }
            ])
            setIsLoading(false) // Выключаем индикатор
        }).catch(error => {
            // В случае ошибки тоже убираем временное сообщение
            setMessages(prev => prev.filter(msg => !msg.isTemp))
            setIsLoading(false)
            console.error("Ошибка:", error)
        })
    }

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message 
                        key={index} 
                        text={msg.text} 
                        sender={msg.sender}
                        isTemp={msg.isTemp} // Передаем флаг временного сообщения
                    />
                ))}
            </div>
            <Input onSend={handleSend} disabled={isLoading} />
        </div>
    )
}