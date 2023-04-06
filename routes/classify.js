const router = require('express').Router();
const db = require('../db');
const mysql = require('mysql');

router.post('/job',async(req,res)=>{
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const category = req.body.category;

        let SQL = "Select job_list.*, (select group_concat(distinct stack) from job_tag where job_list.job = job_tag.job) as stack from job_list ";
        SQL += "where job_list.job = ";
        SQL += "( select distinct(job_tag.job) from job_tag where job_list.job = job_tag.job";
        SQL += ") and category = ?;";
    
        const connection = db.return_connection();
        
        //stack 배열 포함된 친구 있는 지 비교

        let job_array = [];

        connection.query(SQL,[category, stack],function(err,results,field){
            if(err){
                console.error(err);
                return res.status(400).json({
                    error: err
                });
            }
           // console.log(results);
            if(stack !== "*"){
                results.map(result=>{
                    for(let i=0;i<stack.length;i++){
                        if(result.stack.indexOf(stack[i]+'\r')!== -1){
                            result.stack = result.stack.replace(/(?:\r\n|\r|\n)/g, '').split(',');
                            job_array.push(result);
                            break;
                        }
                    }
                })
            }
            else job_array = results;
            
            return res.status(200).json({
                results: job_array
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

router.post('/job/intro',async(req,res)=>{
    try{
        const job = req.body.job;
        const category = req.body.category;
        
        const result = [];
        let stack = [];

        const SQL1 = "Select * from job_list where job = ? and category = ?; ";
        const SQL1s = mysql.format(SQL1, [job,category]); 

        const SQL2 = "Select group_concat(distinct stack) as stack from job_tag where job = ?; ";
        const SQL2s = mysql.format(SQL2, [job]); 

        const SQL3 = "Select * from course_tag; ";
        const SQL3s = mysql.format(SQL3, [job]); 
    
        const connection = db.return_connection();

        await connection.query(SQL1s,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(400).json({
                    error: err
                });
            }
            console.log(results);
                        
            result.push({
                job_info: results[0]
            });
        })

        await connection.query(SQL2s,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(400).json({
                    error: err
                });
            }


            console.log(results);
            results[0].stack = results[0].stack.replace(/(?:\r\n|\r|\n)/g, '').split(',');
            stack = results[0].stack;
                        
            result.push({
                stack: results[0].stack
            });
            
        })

        await connection.query(SQL3s,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(400).json({
                    error: err
                });
            }


            console.log(results);
            const subject = [];

            results.map(result=>{
                for(let i=0;i<stack.length;i++){
                    if(result.stack.indexOf(stack[i]+'\r')!== -1){
                        subject.push(result.c_name);
                        break;
                    }
                }
            })
               
            result.push({
                subject: subject
            });
            
            return res.status(200).json({
                results: result
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