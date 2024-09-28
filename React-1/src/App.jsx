import './App.css'

import Header from './Header/Header'
import Button from './Button/Button'
import Footer from './Footer/Footer'

import reactLogoSrc from './assets/react-logo.png'
import jsLogoSrc from './assets/js-logo.png'

function App() {
  return (
    <>
        <Header />
        <main>
            
            <div>
                <img src={jsLogoSrc} />
                <p>
                    <b>JavaScript</b> — это легковесный, интерпретируемый язык программирования,
                    который широко используется для создания интерактивных веб-страниц. Он
                    является основным языком для веб-разработки и поддерживается всеми современными
                    браузерами. JavaScript позволяет разработчикам добавлять динамические элементы
                    на страницы, обрабатывать события и взаимодействовать с пользователем.
                </p>
            </div>
            <div>
                <img src={reactLogoSrc} />
                <p>
                    <b>React</b> — это библиотека JavaScript, предназначенная для создания
                    пользовательских интерфейсов. Она позволяет разработчикам строить компоненты,
                    которые могут быть повторно использованы и легко управляемы. Основная идея
                    React заключается в том, что интерфейс приложения состоит из компонентов,
                    которые могут обновляться в ответ на изменения состояния.
                </p>
            </div>
            <Button />
        </main>
        <Footer />
    </>
  )
}

export default App

