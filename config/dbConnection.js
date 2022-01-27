const mysql = require('mysql2/promise');

const dotenv = require('dotenv');
dotenv.config(); 

const connect = () => {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, 
        port: process.env.DB_PORT, 
        database: process.env.DB_DATABASE
    });
    //Esta función retorna una promesa
    return connection; 
}

const registerUser = async (email, name, hash) => {
    return connect()
    .then((conn) => {
        let result = conn.execute("INSERT INTO users (Email, Nombre, Contrasena) VALUES (?, ?, ?)", [email, name, hash])
        conn.end()
        return result 
    })
    .then(([rows, field]) => rows)
    .catch(error => error)
}

const getUser = async (email) => {
    return connect()
    .then(conn => {
        let result = conn.execute("SELECT * FROM users WHERE Email = ?", [email])
        conn.end()
        return result 
    })
    .then(([rows, field]) => rows)
    .catch(error => error) 
}

const getBooks = async () => {
    return connect()
    .then((conn) => {
        let result = conn.execute("SELECT * FROM books")
        conn.end()
        return result 
    })
    .then(([rows, field]) => rows)
    .catch(error => error)   
}

const registerBook = async (title, author, lastName, year) => {
    return connect()
    .then((conn) => {
        let result = conn.execute("INSERT INTO books (TituloLibro, NombreAutor, ApellidosAutor, Anio) VALUES (?, ?, ?, ?)", [title, author, lastName, year])
        conn.end()
        return result
    })
    .then(([rows, fields]) => rows)
    .catch(error => error) 
}

module.exports = { registerUser, getUser, getBooks, registerBook};   