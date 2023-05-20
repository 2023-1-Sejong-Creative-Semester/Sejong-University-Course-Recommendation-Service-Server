const router = require('express').Router();
const db = require('../db');

//직무 소개
router.get('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
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

//직무 소개
router.get('/stackinfo',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const SQL = "select distinct stack from job_tag;";
        const connection = db.return_connection();

        connection.query(SQL,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                })
            }

            const stack = [];

            results.map(element=>{
                stack.push(element.stack.split('\r')[0]);
            })

            return res.status(200).json({
                stack: stack
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