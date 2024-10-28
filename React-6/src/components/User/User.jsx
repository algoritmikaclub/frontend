import './User.css'

function User({props}) {

    return (
        <div className='user-container'>
            <p>name: <span>{props.name}</span></p>
            <p>email: <span>{props.email}</span></p>
            <p>city: <span>{props.address.city}</span></p>
        </div>
    )
}

export default User
