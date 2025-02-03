const sqlite3 = require('sqlite3').verbose()

// Открываем соединение с базой данных
const db = new sqlite3.Database('./database.db')

// эту функцию будет вызывать скрипт server.js
// responseCallback - функция сервера, в которую передадим запрошенные данные
function getData( responseCallback, contentName ) {
    // проверяем что обращение идет к существующим таблицам
    if (contentName !== 'games' && contentName !== 'news') {
        return responseCallback({error: `table ${contentName} is not exists`})
    }

    db.all(`SELECT * FROM ${contentName}`, (error, data) => {
        if (error) {
            return console.error(`Ошибка выборки из ${contentName}:`, err.message)
        } 

        // преобразуем все JSON-строки в массивы
        data.forEach( dataObject => {
            if ("descriptions" in dataObject) {
                dataObject.descriptions = JSON.parse(dataObject.descriptions)
            }
            if ("images" in dataObject) {
                dataObject.images = JSON.parse(dataObject.images)
            }
        })
        responseCallback(data)
    })
}
  
function close( closeCallback ) {
    // Закрываем соединение с базой данных
    db.close()
    closeCallback()
}
  
// Экспортируем функции
module.exports = {
    getData,
    close
}