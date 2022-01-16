const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dwjqc_524183', 
    port: 3306, 
    database: 'bdinventariolibros'
});

connection.connect((error, result) => {
    if(error) {
        console.log('Error en la conexión');
    }
    console.log('Conectada a la BD...'); 
});

const myQueryUser1 = (query, param1, param2, param3) => {
    return new Promise( (resolve, reject) => {
        
        try {
            connection.query(query, [param1, param2, param3], (error, result) => {
                if(error) {
                    console.log('Error en ejecutar la query');
                    reject(error); 
                }
                
                resolve(result); 
            }); 
        } catch (error) {
            reject(error); 
        }
    }); 
}

const myQueryUser2 = (query, param) => {
    return new Promise( (resolve, reject) => {
        try {
            connection.query(query, [param], (error, result) => {
                if(error) {
                    console.log('Error en ejecutar la query');
                    reject(error);
                }
                resolve(result); 
            }); 
        } catch (error) {
            reject(error); 
        }
    }); 
}

const myQueryBook1 = (query) => {
    return new Promise( (resolve, reject) => {
        try {
            connection.query(query, (error, result) => {
                if(error) {
                    console.log('Error en ejecutar la query');
                    reject(error);
                }
                resolve(result); 
            }); 
        } catch (error) {
            reject(error); 
        }
    }); 
}

const myQueryBook2 = (query, param1, param2, param3, param4) => {
    return new Promise( (resolve, reject) => {
        try {
            connection.query(query, [param1, param2, param3, param4], (error, result) => {
                if(error) {
                    console.log('Error en ejecutar la query');
                    reject(error);
                }
                resolve(result); 
            }); 
        } catch (error) {
            reject(error); 
        }
    }); 
}

module.exports = {myQueryUser1, myQueryUser2, myQueryBook1, myQueryBook2};   