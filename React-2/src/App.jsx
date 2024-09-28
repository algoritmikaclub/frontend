import './App.css'

import Header from './Header/Header'
import Footer from './Footer/Footer'
import Button from './Button/Button'
import frame1 from './assets/01.jpg'
import frame2 from './assets/02.jpg'

function App() {
  return (
    <>
        <Header />
        <Button />
        <div className="banner"></div>
        <main>
            <div className="frame">
                <img src={frame1} />
                <p>Шрэк на своем болоте</p>
            </div>
            <div className="frame">
                <img src={frame2} />
                <p>Шрэк с другом ослом</p>
            </div>
        </main>
        <Footer />
    </>
  )
}

export default App

