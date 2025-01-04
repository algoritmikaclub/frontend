import './Navbar.less'

const Navbar = ({contentKey, changeContent}) => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a
                        className={contentKey === 'games' ? 'active' : ''}
                        onClick={() => changeContent('games')} >
                        Игры
                    </a>
                </li>
                <li>
                    <a
                        className={contentKey === 'news' ? 'active' : ''}
                        onClick={() => changeContent('news')}>
                        Новости
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar