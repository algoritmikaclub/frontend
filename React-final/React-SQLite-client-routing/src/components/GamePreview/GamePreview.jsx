import { Link } from 'react-router-dom'
import Rating from '../Rating/Rating'
import './GamePreview.less'

const GamePreview = ({ title, description, image, link, changeContent, rating }) => {
    return (
        <div className="game-card">
            <Rating rating={rating} />
            <img src={image} alt={title} className='main-game-image' />
            <h4>{title}</h4>
            <p>{description}</p>
            <Link className='link' to={link} onClick={() => changeContent('')}>Подробнее</Link>
        </div>
    )
}

export default GamePreview