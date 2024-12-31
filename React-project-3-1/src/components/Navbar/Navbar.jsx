import './Navbar.less'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Обзоры на игры</h1>
            <ul>
                <li><a href="/">Игры</a></li>
                <li><a href="/news">Новости</a></li>
            </ul>
        </nav>
    )
}

export default Navbar