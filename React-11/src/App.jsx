import { useEffect, useRef, useState } from 'react'
import './App.css'
import Product from './components/Product/Product'

function App() {
    const [productList, setProductList] = useState([])
    const filtersRef = useRef({isSale: false, isIncrease: true})
    const productsRef = useRef([])
    useEffect( getProducts, [] )
    function getProducts() {
        fetch('./products.json')
            .then( data => data.json() )
            .then( json => {
                productsRef.current = json
                setTimeout(updateProductList, 1000)
            })
    }

    function updateProductList() {      
        let prodList
        if (filtersRef.current.isSale) {
            prodList = productsRef.current.models.filter( p => p.discountPercentage > 0 )
        } else {
            prodList = [...productsRef.current.models]
        }

        setProductList([...prodList].sort((a, b) => {
            if (filtersRef.current.isIncrease) {
                return a.price * (0.01 * a.discountPercentage) - b.price * (0.01 * b.discountPercentage)
            } else {
                return b.price * (0.01 * b.discountPercentage) - a.price * (0.01 * a.discountPercentage)
            }
        }))
    }

    function handleChangePrice(event) {
        filtersRef.current.isIncrease = event.target.value === 'increase'
        updateProductList()
    }

    function handleChangeSale(event) {
        filtersRef.current.isSale = event.target.checked
        updateProductList()
    }

    function getProductDiv(product) {
        return (
            <Product key={product.id} props={product} />
        )
    }
        
    return (
        (productList.length === 0)
        ? <p className='loading-text'>Загрузка...</p>
        : <>
        <header>
            <select onChange={handleChangePrice}>
                <option value="increase">Цена по возрастанию</option>
                <option value="decrease">Цена по убыванию</option>
            </select>
            <input id="sale-only" type="checkbox" onChange={handleChangeSale}></input>
            <label htmlFor="sale-only">только со скидкой</label>
        </header>
        
        {productList.map( getProductDiv )}
        </>
    )
}

export default App



