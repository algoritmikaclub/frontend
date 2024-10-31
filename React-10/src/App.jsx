import { useEffect, useRef, useState } from 'react'
import './App.css'
import Product from './components/Product/Product'

function App() {
    const [productList, setProductList] = useState([])
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
        if (productList.length) return
        setProductList(productsRef.current.models)
    }

    function getProductDiv(product) {
        return (
            <Product key={product.id} props={product} />
        )
    }
        
    return (
        (productList.length === 0)
        ? <p className='loading-text'>Загрузка...</p>
        : productList.map( getProductDiv )
    )
}

export default App





