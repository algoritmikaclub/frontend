import './App.css'

import Button from './components/Button/Button'
import Header from './components/Header/Header'
import buttonsList from './data/buttonsList'

function App() {
    return (
        <>
            <Header title = 'Menu icons' />
            <main>
                { buttonsList.map((btn, i) => <Button key = {i} icon = {btn.icon} text = {btn.text} />) }
            </main>
        </>
    )
}

export default App