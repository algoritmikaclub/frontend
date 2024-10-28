import './Button.css'

function Button({children, isActive}) {

    function checkActive() {
        if (isActive) {
            return 'active'
        }
        return ''
    }

    return (
        <button className={checkActive()}> {children} </button>
    )
}

export default Button

