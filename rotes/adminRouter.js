const express = require('express');
const router = express.Router();
const auth = require('../controlers/authControler');


router.get('/', auth, (req, res)=>{

    if(req.user.admin){
        res.send("This data is private.")
    } else {
        res.status(401).send('Not Admin: Acesses Denied')
    }

});

router.get('/free', auth, (req, res)=>{

    res.send("Anypeople logged can see this.")
});

module.exports = router