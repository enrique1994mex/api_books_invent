const {Router} = require('express'); 
const router = Router();

router.get('/', async (req, res) => {
    res.json({Message: "Successfully connected"}); 
})


module.exports = router; 