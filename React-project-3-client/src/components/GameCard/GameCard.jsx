import './GameCard.less'

const GameCard = ({ game }) => {
    return (
        <div className="game-card">
            <h4>{game.title}</h4>
            <h5>Разработана {game.developer} в {game.releaseYear} году</h5>
            <img className="main-game-image" src={game.mainImage} alt={game.title}></img>
            <h6>Жанр: {game.genre}</h6>
            {game.descriptions.map( (text, index) => <p key={index}>{text}</p> )}
            <div className="cover-images">
                {game.images.map((image, index) => (
                    <img key={index} src={image} alt={`${game.title} screenshot ${index + 1}`} />
                ))}
            </div>
        </div>
    )
}

export default GameCard