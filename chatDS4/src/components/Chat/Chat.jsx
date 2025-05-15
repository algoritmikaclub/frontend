import { useState, useEffect, useRef } from "react"
import useLocalStorage from "../../hooks/useLocalStorage"
import { askDeepSeek } from "../../utils/api"
import Message from "../Message/Message"
import Input from "../Input/Input"
import "./Chat.less"

export default function Chat() {
    const [messages, setMessages] = useLocalStorage("chat_messages", [])
    const [isLoading, setIsLoading] = useState(false)

    const messagesRef = useRef(null) // Реф на <div> под списком всех сообщений
    useEffect(() => {
        const last = messagesRef.current
        if (last) {
            last.scrollTop = last.scrollHeight
        }
    }, [messages]) // При каждом новом сообщении

    const handleSend = (text) => {
        const newMessage = { text, sender: "user" }
        const updatedMessages = [...messages, newMessage]
        setMessages(updatedMessages)
        setIsLoading(true) // Включаем индикатор загрузки

        // Добавляем временное сообщение
        const tempMessage = { text: "Идет обработка", sender: "bot", isTemp: true }
        setMessages((prev) => [...prev, tempMessage])

        // Запрос к API
        const last10Messages = updatedMessages.slice(-10); // Берём 10 последних
        askDeepSeek(last10Messages).then((reply) => {
            // Удаляем временное сообщение и добавляем настоящий ответ
            setMessages((prev) => [
                ...prev.filter(msg => !msg.isTemp),
                { text: reply, sender: "bot" }
            ])
            setIsLoading(false); // Выключаем индикатор
        }).catch(error => {
            // В случае ошибки тоже убираем временное сообщение
            setMessages(prev => prev.filter(msg => !msg.isTemp))
            setIsLoading(false)
            console.error("Ошибка:", error)
        });
    }

    // Функция сброса чата
    const handleNewChat = () => {
        setMessages([]) // Очищаем массив сообщений
        localStorage.removeItem('chat_messages') // Очищаем LocalStorage
    }

    return (
        <div className="chat-container">
            <div className="messages" ref={messagesRef}>
                {messages.map((msg, index) => (
                    <Message 
                        key={index} 
                        text={msg.text} 
                        sender={msg.sender}
                        isTemp={msg.isTemp} // Передаем флаг временного сообщения
                    />
                ))}
            </div>
            <Input onSend={handleSend} onNewChat={handleNewChat} disabled={isLoading} />
        </div>
    )
}