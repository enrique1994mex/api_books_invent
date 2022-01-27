const { Router } = require('express');
const { getBooks, registerBook } = require('../../config/dbConnection');
const router = Router();

router.get('/', async (req, res) => {
    //Con la función getBooks se obteniene un arreglo de objetos 
    const books = await getBooks();
    res.json(books)
});

router.post('/', async (req, res) => {
    try {
        const { title, author, lastName, year } = req.body;
        const response = await registerBook(title, author, lastName, year)
        console.log(response.name)
        if (response.name === 'Error' || 'TypeError') {
            res.status(400).json({ message: response.message }).end()
        } else {
            res.json({ Message: "Saved information" }).end();
        }
    } catch (error) {
        res.status(400).json({ error: "Bad request or incomplete" })
    }
});

module.exports = router;