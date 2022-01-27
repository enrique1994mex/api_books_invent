
const { registerUser, getUser } = require('../../config/dbConnection');
const { Router } = require('express');
const signToken = require('../../config/auth');
const router = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);
        const response = await registerUser(email, name, hash);
        if (response.name === 'Error') {
            res.status(400).json({ message: response.message }).end()
        } else {
            const [user] = await getUser(email);
            const token = signToken(user);
            res.json({
                token,
                name: user.Nombre,
                email: user.Email
            }).end()
        }
    } catch (error) {
        res.status(400).json({ error: "Bad request or incomplete" })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //Con la función getUser se obteniene un arreglo con un objeto o vacío  
        const user = await getUser(email);
        if (user.length === 0) {
            res.status(401).json({ error: "Username doesn't exist" }).end()
        } else if (bcrypt.compareSync(password, user[0].Contrasena)) {
            const [user2] = user;
            const token = signToken(user2);
            res.json({
                token,
                name: user2.Nombre,
                email: user2.Email
            }).end()
        } else {
            res.status(401).json({ error: "Invalid password" }).end()
        }
    } catch (error) {
        res.status(400).json({ error: "Bad request or incomplete" })
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
});

router.delete('/:id', (req, res) => {
    console.log(req.params);
    res.send('eliminado');
});

module.exports = router;