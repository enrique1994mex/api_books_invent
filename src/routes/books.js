const {Router} = require('express');
const {myQueryBook1, myQueryBook2} = require('../../config/dbConnection'); 
const router = Router(); 

router.get('/', async (req, res) => {
    const books = await myQueryBook1("SELECT * FROM books");
    res.json(books); 
});

router.post('/', async (req, res) => {
    const{title, author, lastName, year} = req.body; 
    await myQueryBook2("INSERT INTO books (TituloLibro, NombreAutor, ApellidosAutor, Anio) VALUES (?, ?, ?, ?)", title, author, lastName, year);
    res.json({Message: "Saved information"}); 
});

module.exports = router;