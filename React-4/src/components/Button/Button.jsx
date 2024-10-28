import './Button.css'

function Button({icon, text}) {
    return (
        <button>
            <img src={icon} />
            <span>{text}</span>
        </button>
    )
}

export default Button

