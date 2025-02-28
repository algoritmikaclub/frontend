import './NewsCard.less'

const NewsCard = ({ title, content, image }) => {
    return (
        <div className="news-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}

export default NewsCard

