import { Link } from 'react-router-dom'
import GamePreview from '../GamePreview/GamePreview'
import NewsCard from '../NewsCard/NewsCard'
import './Main.less'

const Main = ({ games, news, changeContent }) => {
    return (
        <main>

            <section>
                <h2>Новости</h2>
                {news.length > 0 && (
                    <NewsCard
                        title={news[0].title}
                        content={news[0].content.substring(0, 200) + '...'}
                        image={news[0].image}
                    />
                )}
                <Link className='link' to="/news" onClick={() => changeContent('news')}>
                    Смотреть все новости
                </Link>
                <hr></hr>
            </section>

            <section>
                <h2>Игры</h2>
                {games.slice(0, 2).map((game, index) => (
                    <GamePreview
                        key={index}
                        title={game.title}
                        description={game.descriptions[0].substring(0, 200) + '...'}
                        image={game.mainImage}
                        link={`/games/${game.title}`}
                        changeContent={changeContent}
                    />
                ))}
                <Link className='link' to="/games" onClick={() => changeContent('games')}>
                    Смотреть все игры
                </Link>
                <br></br>
            </section>
            
        </main>
    )
}

export default Main