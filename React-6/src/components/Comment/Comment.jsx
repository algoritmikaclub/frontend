import './Comment.css'

function Comment({props}) {

    return (
        <div className='comment-container'>
            <h2>{props.name}</h2>
            <p>{props.body}</p>
            <div className='author'>
                author:<span>{props.email}</span>
            </div>
        </div>
    )
}

export default Comment