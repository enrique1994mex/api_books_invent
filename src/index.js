
const express = require('express');
const app = express();
const morgan = require('morgan'); 
const cors = require('cors');

//cors
app.use(cors());

//settings
app.set('port', process.env.PORT || 4000); 
app.set('json spaces', 2); 

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

//routes
app.use('/', require('./routes')); 
app.use('/api/users',require('./routes/users'));
app.use('/api/books',require('./routes/books')); 
app.use('*', (req, res) => {
    res.status(404).send("<h1>Not found page</h1>")
})

//starting the server 
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); 
}); 