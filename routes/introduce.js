const router = require('express').Router();
const db = require('../db');

//직무 소개
router.get('/',async(req,res)=>{

    type = req.query.type;
    
    const connection = db.return_connection();
    let SQL = "select * from ??;";  //테이블명은 ??로 표현

    console.log(type);
    connection.query(SQL,[req.query.type],function(err,results,field){
        if(err){
            console.error(err.toString());
            return res.status(500).json({
                error: err.toString()
            })
        }
        console.log(results);
        return res.json({
            data: results
        })
    })

    /*
    switch(type){
        case "job":
            break;
        case "department":
            SQL = "Select * from department;";
            connection.query(SQL,function(err,results,field){
                return res.json({
                    data: results
                })
            })
            break;
        case "language":
            SQL = "Select * from language;";
            connection.query(SQL,[type],function(err,results,field){
                return res.json({
                    data: results
                })
            })
            break;
    }
    */
    
    
    
})

module.exports = router;