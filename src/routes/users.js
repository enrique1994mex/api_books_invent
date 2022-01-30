
const { registerUser, getUser } = require('../../config/dbConnection');
const { Router } = require('express');
const signToken = require('../../config/auth');
const router = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/register', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        //La función hashSync hashea el password enviado por el usuario
        const hash = bcrypt.hashSync(password, saltRounds);
        //La función registerUser registra los datos del usuario en la BD 
        const response = await registerUser(email, name, hash);
        if (response.affectedRows) {
            //Si la información se guardó adecuadamente se envian los datos del usuario con el Token
            const [user] = await getUser(email);
            const token = signToken(user);
            res.json({
                token,
                name: user.Nombre,
                email: user.Email
            }).end()
        } else if (response.name === 'Error') {
            //Si no se guardaron los datos se envía el error 
            res.status(400).json({error: "The email already exists" }).end()
        }
    } catch (error) {
        //Enviar un error que la información no se guardó porque se enviaron los datos incompletos 
        res.status(400).json({ error: "Bad request or incomplete" })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //Con la función getUser se obtiene un arreglo
        const user = await getUser(email);
        //Si el arreglo está vacío se envía un error 
        if (user.length === 0) {
            res.status(401).json({ error: "Username doesn't exist" }).end()
        } else if (bcrypt.compareSync(password, user[0].Contrasena)) {
            //Si el password es correcto se envian los datos del usuario con el Token
            const [user2] = user;
            const token = signToken(user2);
            res.json({
                token,
                name: user2.Nombre,
                email: user2.Email
            }).end()
        } else {
            //Si el password no existe se envía un error 
            res.status(401).json({ error: "Invalid password" }).end()
        }
    } catch (error) {
        //Se envía un error si los datos están incompletos 
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