import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import GameCard from './components/GameCard/GameCard'
import NewsCard from './components/NewsCard/NewsCard'
import './App.css'

const App = () => {
    const [games, setGames] = useState([])
    const [news, setNews] = useState([])
    const [currentContentKey, setCurrentContentKey] = useState('games')

    const handleNavClick = (key) => {
        if (key === currentContentKey) return
        setCurrentContentKey(key)
    }
    
    useEffect(() => {
        // Загрузка данных об играх
        fetch('./data/games.json')
            .then(response => response.json())
            .then(data => setGames(data))

        // Загрузка новостей
        fetch('./data/news.json')
            .then(response => response.json())
            .then(data => setNews(data))
    }, [])
    
    return (
        <>
            <Header />
            <Navbar contentKey={currentContentKey} changeContent = {handleNavClick} />
            <main>
                <h2>{currentContentKey === 'games' ? 'Игры' : 'Новости'}</h2>
                {
                    currentContentKey === 'games'
                    ? games.map( (game, index) => <GameCard key={index} game={game} /> )
                    : news.map( (newsItem, index) => <NewsCard key={index} news={newsItem} /> )
                }
            </main>
        </>
    )
}

export default App