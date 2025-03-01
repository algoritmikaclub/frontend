const sqlite3 = require('sqlite3').verbose()

// Открываем соединение с базой данных
const db = new sqlite3.Database('database.db')

// SQL-запрос для добавления колонки rating со значением 0.0 по умолчанию
const addColumnQuery = `
    ALTER TABLE games
    ADD COLUMN rating REAL DEFAULT 0.0;
`

// Выполняем запрос
db.run(addColumnQuery, (err) => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('Column rating added to games table.')
    }
})

// Закрываем соединение с базой данных
db.close()

