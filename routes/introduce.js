const router = require('express').Router();
const db = require('../db');

//직무 소개
router.get('/',async(req,res)=>{

    type = req.query.type;
    
    const connection = db.return_connection();
    let SQL = "select * from ?;";

    connection.query(SQL,type,function(err,results,field){
        console.log(results);
        return res.json({
            data: results
        })
    })
})

module.exports = router;