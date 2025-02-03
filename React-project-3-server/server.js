const http = require('http')
const dataBase = require('./dataBase') // импортируем файл, работающий с БД

const PORT = 3000

const server = http.createServer((req, res) => {
    // Разрешаем CORS (запросы из URL, отличающихся от URL на котором запущен сервер)
    res.setHeader('Access-Control-Allow-Origin', '*') // Разрешаем запросы с любого источника
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // Разрешаем методы
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // Разрешаем заголовки

    // Обработка предварительного запроса (preflight request)
    if (req.method === 'OPTIONS') {
        /* Когда браузер выполняет кросс-доменные запросы, он может сначала отправить
        запрос типа OPTIONS, чтобы узнать, разрешены ли определенные методы и заголовки
        для данного ресурса. Это называется предварительным запросом (preflight request).
        Он используется для проверки, может ли браузер безопасно взаимодействовать с сервером. */
        res.writeHead(204) // Код 204 указывает, что запрос успешно обработан, но без содержимого в ответе.
        res.end()
        return
    }

    // При необходимости - можно добавить проверку URL, откуда пришел запрос
    /* Проверка URL-адреса, от кого пришел запрос
    const allowedOrigin = 'https://test.com';
    const requestOrigin = req.headers.origin;
    if (requestOrigin === allowedOrigin) {
        res.writeHead(403) // Запрещено
        res.end()
        return
    } */

    // проверяем что используется метод GET, и запрос содержит '/games' или !== '/news'
    if(req.method !== 'GET' || ( req.url !== '/games' && req.url !== '/news' ) ) {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
        return
    }

    const sendResponse = ( responseData ) => {
        // Код ответа 200 (успешно), отправляемые данные в ответе - JSON
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify( responseData )) // Отправляем ответ в формате JSON
    }
    dataBase.getData( sendResponse, req.url.slice(1) )
})

// Запускаем сервер
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})

// Закрываем соединение с базой данных при остановке сервера
process.on('SIGINT', () => {
    console.log('Остановка сервера...')
    dataBase.close( () => process.exit(0) )
})