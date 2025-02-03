import './Header.less'

const Header = () => {
    return (
        <header>
            <img src="./images/logo.png" />
            <h1>
                <span className="first">G</span>am<span className="second">e</span>
                S<span className="third">p</span>y
            </h1>
            <h3>Следим за новинками игр</h3>
        </header>
    )
}

export default Header