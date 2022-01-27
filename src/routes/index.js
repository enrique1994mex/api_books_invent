const {Router} = require('express'); 
const router = Router();

router.get('/', async (req, res) => {
    res.json({Message: "¡Hi!"}); 
})


module.exports = router; 