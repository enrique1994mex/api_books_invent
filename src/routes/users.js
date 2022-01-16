
const {myQueryUser1, myQueryUser2} = require('../../config/dbConnection');
const {Router} = require('express');
const signToken = require('../../config/auth');
const router = Router();
const bcrypt = require('bcrypt');
const saltRounds = 10; 

router.post('/register', async (req, res) => {
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);  
    await myQueryUser1("INSERT INTO Users (Email, Nombre, Contrasena) VALUES (?, ?, ?)", email, name, hash);
    const [user] = await myQueryUser1("SELECT * FROM Users WHERE Email = ?", email);
    const token = signToken(user); 
    res.json({
        token,
        name: user.Nombre,
        email: user.Email 
    });      
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await myQueryUser2("SELECT * FROM Users WHERE Email = ?", email);
    if(user.length === 0) {
        res.status(401).json({error: "Username doesn't exist"});
    } else if (bcrypt.compareSync(password, user[0].Contrasena)) {
        const [user2] = user; 
        const token = signToken(user2); 
        res.json({
            token,
            name: user2.Nombre,
            email: user2.Email 
        }); 
    } else  {
        res.status(401).json({error: "Invalid password"});
    }
});

router.put('/:id', (req, res) => {
    const {id} = req.params; 
});

router.delete('/:id', (req, res) => {
    console.log(req.params);
    res.send('eliminado');  
});

module.exports = router;