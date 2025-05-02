import Message from "../Message/Message"
import Input from "../Input/Input"
import "./Chat.less"

export default function Chat() {

    const handleSend = (text) => {
        const newMessage = { text, sender: "user" }
        console.log(newMessage)
    }

    return (
        <div className="chat-container">
            <div className="messages">
                <Message text={"Проверка связи 1"} sender={"user"} />
                <Message text={"Проверка связи 1"} sender={"bot"} />
                <Message text={"Проверка связи 2"} sender={"user"} />
                <Message text={"Проверка связи 2"} sender={"bot"} />
                <Message text={"Проверка связи 3"} sender={"user"} />
                <Message text={"Проверка связи 3"} sender={"bot"} />
            </div>
            <Input onSend={handleSend} />
        </div>
    )
}

