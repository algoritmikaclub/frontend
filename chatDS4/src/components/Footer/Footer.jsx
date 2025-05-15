import './Footer.less'
import logo from '../../assets/logo.png'

const year = new Date().getFullYear()

export default function Footer() {
    return (
        <footer>
            <img src={logo} /> <p>Fun &lt;/&gt; Chat &copy; {year}</p>
        </footer>
    )
}