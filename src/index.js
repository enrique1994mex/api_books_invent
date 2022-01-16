const { listen } = require("express/lib/application");

const express = require('express');
const app = express();
const morgan = require('morgan'); 
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 4000); 
app.set('json spaces', 2); 

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

//cors
app.use(cors()); 

//routes
app.use('/api/users',require('./routes/users'));
app.use('/api/books',require('./routes/books')); 

//starting the server 
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`); 
}); 