import './Header.less'
import logo from '../../assets/logo.png'
const Header = () => {
    return (
        <header>
            <img src={logo} />
            <div>
                <h1>Fun
                    <span className="first">&lt;</span>
                    <span className="second">/</span>
                    <span className="third">&gt;</span>
                    Chat
                </h1>
                <h3>Ваш AI ассистент</h3>
            </div>
        </header>
    )
}

export default Header