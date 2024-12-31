// import './GameCard.less'

const GameCard = ({ game }) => {
    return (
        <div className="game-card">
            <h2>{game.title} ({game.releaseYear})</h2>
            <h3>{game.developer}</h3>
            <p><strong>Жанр:</strong> {game.genre}</p>
            <p>{game.description}</p>
            <div className="cover-images">
                {game.images.map((image, index) => (
                    <img key={index} src={image} alt={`${game.title} screenshot ${index + 1}`} />
                ))}
            </div>
        </div>
    )
}

export default GameCard