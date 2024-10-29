import './Product.css'
import { useState } from 'react'

import Button from '../Button/Button'

function Product({name, price, updateSum}) {
    const [count, setCount] = useState(0)

    function add() {
        updateSum(+price)
        setCount(count + 1)
    }

    function subtract() {
        if (count > 0) {
            updateSum(-price)
            setCount(count - 1)
        }
    }

    return (
        <div className='product'>
            <h2>{name}</h2>
            <p>Цена: <b>{price}</b>; заказано: {count}</p>
            <Button onClick={subtract}>-</Button>
            <Button onClick={add}>+</Button>
        </div>
    )
}

export default Product
