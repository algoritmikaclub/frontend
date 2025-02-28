import { Link } from 'react-router-dom'
import './Navbar.less'

const Navbar = ({contentKey, changeContent}) => {
    // console.log('Navbar currentContentKey:',contentKey)
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/"
                        className={contentKey === 'main' ? 'active' : ''}
                        onClick={() => changeContent('main')} >
                        Главная
                    </Link>
                </li>
                <li>
                    <Link to="/games"
                        className={contentKey === 'games' ? 'active' : ''}
                        onClick={() => changeContent('games')} >
                        Игры
                    </Link>
                </li>
                <li>
                    <Link to="/news"
                        className={contentKey === 'news' ? 'active' : ''}
                        onClick={() => changeContent('news')}>
                        Новости
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar