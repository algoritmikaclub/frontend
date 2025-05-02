import './Message.less'

export default function Message({ text, sender }) {
    return (
        <div className={`message ${sender}`}>
            <p>{text}</p>
        </div>
    );
}

