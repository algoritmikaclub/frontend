import './Message.less'

export default function Message({ text, sender, isTemp }) {
    return (
        <div className={`message ${sender} ${isTemp ? 'temp-message' : ''}`}>
            {text}
            {isTemp && <div className="typing-indicator">...</div>}
        </div>
    )
}