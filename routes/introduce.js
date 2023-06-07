const router = require('express').Router();
const db = require('../db');

//직무 소개
router.get('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        type = req.query.type;
    
        const connection = db.return_connection();
        let SQL = "select * from ?? order by numbering;";  //테이블명은 ??로 표현

        connection.query(SQL,[req.query.type],function(err,results,field){
            if(err){
                console.error(err.toString());
                return res.status(401).json({
                    error: err.toString()
                })
            }

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

        return res.status(200).json({
            stack: ["Java","Spring","React","C","Python","Javascript","C++","C#","Git","SQL","Node.js","Linux","Android","iOS","Unity","AWS"]
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