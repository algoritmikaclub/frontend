import './Rating.less'

const Rating = ({ rating }) => {
    const minRating = 0
    const maxRating = 5
    let stars = rating.toFixed(1)
    if (stars < minRating) stars = minRating
    else if (stars > maxRating) stars = maxRating

    return (
        <div className="rating">
            ★ <span>{stars}</span> / {maxRating}
        </div>
    )
}

export default Rating

