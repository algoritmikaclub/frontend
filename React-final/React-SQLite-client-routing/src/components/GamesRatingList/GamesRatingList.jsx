import GamePreview from '../GamePreview/GamePreview'

const GamesRatingList = ({ games }) => {

    games.sort( (gameA, gameB) => gameB.rating - gameA.rating )

    return (
        <main>
            <h2>Игры по рейтингу</h2>
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

export default GamesRatingList