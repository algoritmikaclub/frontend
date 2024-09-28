import './Footer.css'

let today = new Date()

function Footer() {
    return (
        <footer>
            {today.toLocaleDateString()}
        </footer>
    )
}

export default Footer