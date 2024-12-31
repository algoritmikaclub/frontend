import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import GameCard from './components/GameCard/GameCard'
import NewsCard from './components/NewsCard/NewsCard'
import './App.css'

const App = () => {
    const [games, setGames] = useState([])
    const [news, setNews] = useState([])
    
    useEffect(() => {
        // Загрузка данных об играх
        fetch('./data/games.json')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setGames(data)
            })

        // Загрузка новостей
        fetch('./data/news.json')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setNews(data)
            })
    }, [])
    
    return (
        <div className="app">
            <Navbar />
            <div className="content">
                <h1>Игры</h1>
                <div className="game-list">
                    {games.map((game, index) => (
                        <GameCard key={index} game={game} />
                    ))}
                </div>
                <h1>Новости</h1>
                <div className="news-list">
                    {news.map((newsItem, index) => (
                        <NewsCard key={index} news={newsItem} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App