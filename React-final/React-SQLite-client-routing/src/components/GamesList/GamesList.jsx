import GamePreview from '../GamePreview/GamePreview'

const GamesList = ({ games }) => {
    return (
        <main>
            <h2>Игры</h2>
            {games.map((game, index) => (
                <GamePreview
                    key={index}
                    rating={game.rating}
                    title={game.title}
                    description={game.descriptions[0].substring(0, 200) + '...'}
                    image={game.mainImage}
                    link={`/games/${game.title}`}
                />
            ))}
        </main>
    )
}

export default GamesList