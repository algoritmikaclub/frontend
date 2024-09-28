import './Header.css'
import shrek from '../assets/shrek.png'
function Header() {
    return (
        <header>
            <div>
                <img src={shrek} />
                <h1>Шрэк</h1>
            </div>
            <h2>мультфильм, фэнтези, приключения</h2>
        </header>
    )
}

export default Header