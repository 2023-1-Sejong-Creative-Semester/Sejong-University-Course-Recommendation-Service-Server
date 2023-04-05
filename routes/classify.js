const router = require('express').Router();
const db = require('../db');

router.post('/job',async(req,res)=>{
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack + '\r';
        const category = req.body.category;

        let SQL = "Select * from job_list ";
        SQL += "where job_list.job = ";
        SQL += "( select distinct(job_tag.job) from job_tag where stack = ? and job_list.job = job_tag.job )";
        SQL += " and category = ?;";
    
        const connection = db.return_connection();
        
        connection.query(SQL,[stack, category],function(err,results,field){
            console.log(results);
            return res.status(200).json({
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

router.get('/subject',async(req,res)=>{
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const category = req.body.category;

        let SQL = "Select * from job_list where";
        SQL += "joblist.job = ";
        SQL += "( select distinct(job_tag.job) from job_tag where stack LIKE ? and job_list.job = job_tag.job )";
        SQL += " and cotegory = ?;";
    
        const connection = db.return_connection();
        
        connection.query(SQL,[stack, category],function(err,results,field){
            console.log(results);
            return res.status(200).json({
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