
const express = require('express');
const app = express();
const morgan = require('morgan'); 
const cors = require('cors');

//cors
app.use(cors());

//settings, establecer el puerto por defecto 
app.set('port', process.env.PORT || 4000); 
app.set('json spaces', 2); 

//middlewares para que la información recibida sea la adecuada 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

//routes, estas son las rutas válidas de la API 
app.use('/', require('./routes')); 
app.use('/api/users',require('./routes/users'));
app.use('/api/books',require('./routes/books')); 

//Si el cliente introduce una ruta que no existe el servidor la redirije aquí
app.use('*', (req, res) => {
    res.status(404).send("<h1>Not found page</h1>")
})

//starting the server 
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); 
}); 