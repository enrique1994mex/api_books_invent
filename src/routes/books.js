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
        //La función registerBook indica el resultado de insertar los datos en el BD
        const response = await registerBook(title, author, lastName, year)
        console.log(response)
        if (response.affectedRows) {
            //Enviar que la información se guardó adecuadamente
            res.json({ Message: "Saved information" }).end();
        } else if (response.name === 'Error' || response.name === 'TypeError') { 
            //Enviar que la información no se guardó por un error en la BD
            res.status(400).json({ error: response.message }).end()
        }
    } catch (error) {
        //Enviar un error que la información no se guardó porque se enviaron los datos incompletos 
        res.status(400).json({error: error.message})
    }
});

module.exports = router;