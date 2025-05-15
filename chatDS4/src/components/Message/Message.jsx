import {formatApiMessage} from '../../utils/formatApiMessage'
import './Message.less'
//import 'highlight.js/styles/github.css'; // Светлая тема
import 'highlight.js/styles/github-dark.css'; // Тёмная тема

export default function Message({ text, sender, isTemp }) {
    return (
        <div className={`message ${sender} ${isTemp ? 'temp-message' : ''}`}>
            {sender === "user"
                ? text // Сообщения пользователя без обработки
                : <div dangerouslySetInnerHTML={{ __html: formatApiMessage(text) }} />
            }

            {isTemp && <div className="typing-indicator">...</div>}
        </div>
    )
}

