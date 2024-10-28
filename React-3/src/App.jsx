import './App.css'

import Article from './components/Article/Article'

import articlesList from './data/articlesList'

function App() {
  return (
    <main>
        { articlesList.map((article) => Article(article.title, article.text, article.image, article.href)) }
    </main>
  )
}

export default App
