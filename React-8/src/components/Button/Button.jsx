import './Button.css'

function Button({children, onClick}) {

    function handlerClick() {
        onClick()
    }

    return (
        <button onClick={handlerClick}> {children} </button>
    )
}

export default Button

