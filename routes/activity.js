const router = require('express').Router();
const db = require('../db');

router.get('/comparative',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const connection = db.return_connection();
        const SQL = "Select * from activate_comparative Limit 5;";

        connection.query(SQL,function(err,results,fields){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                })
            }
            return res.json({
                results: results
            })
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            error: err.toString()
        })
    }

})

router.get('/curriculum',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        
        const connection = db.return_connection();
        const SQL = "Select * from activate_curriculum;";

        connection.query(SQL,function(err,results,fields){
            if(err){
                console.error(err);
                return res.status(400).json({
                    error: err
                })
            }

            const activate_curriculum = {};

            const career = [];
            const employment = [];
            const regional = [];

            //5개 제한
            results.map(element=>{
                if(element.class=="career" && career.length<5)career.push(element);
                else if(element.class=="employment" && employment.length<5)employment.push(element);
                else if(element.class=="regional" && regional.length<5)regional.push(element);
            })

            activate_curriculum.career = career;
            activate_curriculum.employment = employment;
            activate_curriculum.regional = regional;

            return res.json({
                results: activate_curriculum
            })
        })
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            error: err.toString()
        })
    }
    
})

module.exports = router;