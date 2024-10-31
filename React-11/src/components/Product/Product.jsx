import './Product.css'

function Product({props}) {
    function getPrice() {
        if (props.discountPercentage === 0) return props.price.toFixed(2)

        const discount = props.price * (0.01 * props.discountPercentage)
        return (props.price - discount).toFixed(2)
    }

    return (
        <div className="product">
            <img src={'./images/' + props.image}></img>
            <h2>{props.name}</h2>
            <p className="info">Производитель: <span>{props.brand}</span></p>
            <p className="info">Тип: <span>{props.type}</span></p>
            <p className="info">Апертура: <span>{props.lensDiameter}</span>мм</p>
            <p className="info">Фокусное расстояние: <span>{props.focalLength}</span>мм</p>
            <p className="price">
                Цена: <span>{getPrice()}</span>$
                {
                    props.discountPercentage === 0 ? null
                    : <span className="saleSize">{"-" + props.discountPercentage + "%"}</span>
                }
            </p>
            <p className="description">{props.description}</p>
        </div>
    )
}

export default Product





