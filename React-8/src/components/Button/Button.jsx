import './Button.css'

function Button({children, onClick}) {

    function handleClick() {
        onClick()
    }

    return (
        <button onClick={handleClick}> {children} </button>
    )
}

export default Button

