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
        fetch( 'http://localhost:3000/games', {
            method: 'GET', // Метод запроса
            headers: { 'Content-Type': 'application/json'}  // Указываем тип содержимого
        })
        .then(response => response.json()) // Получаем ответ в формате JSON
        .then(data => {
            setGames(data)
        })

        // Загрузка новостей
        fetch( 'http://localhost:3000/news', {
            method: 'GET', // Метод запроса
            headers: { 'Content-Type': 'application/json'}  // Указываем тип содержимого
        })
        .then(response => response.json()) // Получаем ответ в формате JSON
        .then(data => {
            setNews(data)
        })
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

/*
function App() {
    const handleButtonClick = (contentName) => {
        //fetch('http://localhost:3000/api/button', {
        fetch( 'https://test-sqlite-8zr9.onrender.com/api/button', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contentName }) // Отправляем номер кнопки в JSON формате
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой')
            }
            return response.json() // Получаем ответ в формате JSON
        })
        .then(data => {
            console.log(data); // Выводим сообщение от сервера в консоль
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    };
  
    return (
      <div>
        <h1>Тестирование кнопок</h1>
        <button onClick={() => handleButtonClick('games')}>games</button>
        <button onClick={() => handleButtonClick('news')}>news</button>
      </div>
    );
  }
  
  export default App;
*/