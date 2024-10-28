import './Article.css'

function Article(title, text, image, href) {
    return (
        <>
            <h2> {title} </h2>
            <img src={image} />
            <p>
                {text}
                <a href={href}>Подробнее</a>
            </p>
        </>
    )
}

export default Article

