import NewsCard from '../NewsCard/NewsCard'

const NewsList = ({ news }) => {
    return (
        <main>
            <h2>Новости</h2>
            {news.map((newsItem, index) => (
                <NewsCard
                    key={index}
                    title={newsItem.title}
                    content={newsItem.content}
                    image={newsItem.image}
                />
            ))}
        </main>
    )
}

export default NewsList