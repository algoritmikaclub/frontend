import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Chat from './components/Chat/Chat'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import './App.less'

export default function App() {
    return (
        <>
            <ThemeToggle />
            <Header />
            <Chat />
            <Footer />
        </>
    )
}