import { useState, useRef } from 'react'
import './App.css'

function App() {
    const [result, setResult] = useState('Жду ваши версии...')
    let inputRef = useRef(null)
    let numberRef = useRef( Math.ceil(Math.random() * 100) )
    let attemptRef = useRef(0)

    function checkInput() {
        console.log(numberRef.current)
        attemptRef.current++
        const value = +inputRef.current.value
        if (isNaN(value)) {
            setResult('Ну точно не такое число...')
        } else if (value > numberRef.current) {
            setResult(`Мое число меньше чем ${value}`)
        } else if (value < numberRef.current) {
            setResult(`Мое число больше чем ${value}`)
        } else {
            setResult(`Точно! вы угадали с ${attemptRef.current} попытки`)
        }
    }

    return (
        <main>
            <p>Угадай число от 1 до 100</p>
            <input ref={inputRef} placeholder="Ваш вариант..." />
            <button onClick={checkInput}>Ответить</button>
            <p>{result}</p>
        </main>
    )
}

export default App


