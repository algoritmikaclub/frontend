import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import GamesList from './components/GamesList/GamesList'
import NewsList from './components/NewsList/NewsList'
import GameCard from './components/GameCard/GameCard'

const App = () => {
    const [games, setGames] = useState([])
    const [news, setNews] = useState([])

    const [currentContentKey, setCurrentContentKey] = useState('main')

    const handleNavClick = (key) => {
        if (key === currentContentKey) return
        setCurrentContentKey(key)
    }
 
    useEffect(() => {
        fetch( 'http://localhost:3000/games', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => setGames(data))

        fetch( 'http://localhost:3000/news', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => setNews(data))
    }, [])

    return (
        <Router>
            <Header />
            <Navbar contentKey={currentContentKey} changeContent = {handleNavClick} />
            <Routes>
                <Route path="/" element={<Main games={games} news={news} changeContent = {handleNavClick} />} />
                <Route path="/news" element={<NewsList news={news} />} />
                <Route path="/games" element={<GamesList games={games} />} />
                <Route path="/games/:gameTitle" element={<GameCard games={games} />} />
            </Routes>
        </Router>
    )
}

export default App