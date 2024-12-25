import './Card.less'

const Card = ({ title, content, type }) => {
    return (
        <div className={`card type-${type}`}>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
};

export default Card