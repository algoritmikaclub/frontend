import './App.css'
import { useState } from 'react'

import Product from './components/Product/Product'

function App() {
    const [orderSum, setOrderSum] = useState(0)

    function updateSum(sum) {
        setOrderSum(orderSum + sum)
    }

    return (
        <main>
            { 
                (orderSum === 0)
                ? <p className='total'>Вы еще ничего не заказали</p>
                : <p className='total'>Общая сумма заказа: <b>{orderSum}</b></p>
            }
            <Product name={'Вода'} price={10} updateSum={updateSum} />
            <Product name={'Еда'} price={100} updateSum={updateSum} />
        </main>
    )
}

export default App
