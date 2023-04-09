const router = require('express').Router();
const db = require('../db');

//직무 소개
router.get('/',async(req,res)=>{

    try{
        type = req.query.type;
    
        const connection = db.return_connection();
        let SQL = "select * from ??;";  //테이블명은 ??로 표현
    
        //Test
        console.log(type);
        //Test

        connection.query(SQL,[req.query.type],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(401).json({
                    error: err.toString()
                })
            }

            //테스트
            console.log(results);
            //테스트

            return res.json({
                data: results
            })
        })
    }
    
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }
    
})

module.exports = router;