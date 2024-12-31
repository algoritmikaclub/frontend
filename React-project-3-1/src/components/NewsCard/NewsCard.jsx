// import './NewsCard.less'

const NewsCard = ({ news }) => {
    return (
        <div className="news-card">
            <h2>{news.title}</h2>
            <img src={news.image} alt={news.title} />
            <p>{news.content}</p>
            <p><em>{new Date(news.publicationDate).toLocaleDateString()}</em></p>
        </div>
    )
}

export default NewsCard