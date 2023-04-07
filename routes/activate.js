const router = require('express').Router();
const db = require('../db');

router.get('/comparative',async(req,res)=>{
    try{
        const connection = db.return_connection();
        const SQL = "Select * from activate_comparative;";

        connection.query(SQL,function(err,results,fields){
            if(err){
                console.error(err);
                return res.status(400).json({
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

router.get('/career',async(req,res)=>{
    try{
        const connection = db.return_connection();
        const SQL = "Select * from activate;";

        connection.query(SQL,function(err,results,fields){
            if(err){
                console.error(err);
                return res.status(400).json({
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

module.exports = router;