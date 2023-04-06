const router = require('express').Router();
const db = require('../db');

router.post('/',async(req,res)=>{
    try{
        
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            error: err.toString()
        })
    }

})

module.exports = router;