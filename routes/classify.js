const router = require('express').Router();
const db = require('../db');
const mysql = require('mysql');

router.post('/job',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const category = req.body.category;

        console.log(req.body);

        console.log(stack);
        console.log(category);


        let SQL = "Select job_list.*, (select group_concat(distinct stack) from job_tag where job_list.job = job_tag.job) as stack from job_list ";
        SQL += "where job_list.job = ";
        SQL += "( select distinct(job_tag.job) from job_tag where job_list.job = job_tag.job )";
        
        //대분류가 있는 경우 where절에 category 검색 추가
        if(category !== "*"){
            SQL += " and category = ?;";
        }
    
        const connection = db.return_connection();
        
        //stack 배열 포함된 친구 있는 지 비교

        let job_array = [];

        console.log(SQL);

        connection.query(SQL,[category],function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                });
            }
            console.log(results);
            if(stack !== "*"){
                results.map(result=>{
                    for(let i=0;i<stack.length;i++){
                        if(result.stack.indexOf(stack[i]+'\r')!== -1){
                            //정규식 이용하여 \r 제거 후 split으로 배열로 변환
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
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const job = req.body.job;
        const category = req.body.category;
        
        let job_info;
        let stack = [];
        
        let job_image = "https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/job/";
        job_image += job + ".png?raw=true";
        console.log(job_image);

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
                return res.status(401).json({
                    error: err
                });
            }
                   
            job_info = results[0];

        })

        await connection.query(SQL2s,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                });
            }


            results[0].stack = results[0].stack.replace(/(?:\r\n|\r|\n)/g, '').split(',');
            stack = results[0].stack;

        })

        await connection.query(SQL3s,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                });
            }

            
            const subject = [];

            results.map(result=>{
                for(let i=0;i<stack.length;i++){
                    if(result.stack.indexOf(stack[i]+'\r')!== -1){
                        subject.push(result.c_name);
                        break;
                    }
                }
            })
               
            
            return res.status(200).json({
                job_info: job_info,
                stack: stack,
                c_name: subject,
                image: job_image
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

router.post('/subject',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const category = req.body.category;
        const semeter = req.body.semester;

        let SQL = "SELECT bbgs.*, rm.collage, rm.department, rm.semeter, rm.track ";
        SQL += "FROM (SELECT cl.numbering, bgs.*, cl.instruction ";
        SQL += "FROM (SELECT gj.c_name, gj.category,Group_concat(gj.job) AS job, gs.stack ";
        SQL += "FROM   (SELECT ct.c_name, Group_concat(ct.stack) AS stack ";
        SQL += "FROM   course_tag ct ";
        SQL += "GROUP  BY ct.c_name) AS gs ";
        SQL += "JOIN (SELECT ct.c_name, jt.* ";
        SQL += "FROM   course_tag ct JOIN job_tag jt ON jt.stack = ct.stack) AS gj ON gj.c_name = gs.c_name ";
        SQL += "GROUP  BY gj.c_name, gj.category) AS bgs JOIN course_list cl ON cl.c_name = bgs.c_name) AS bbgs ";
        SQL += "JOIN re_main rm ON rm.c_name = bbgs.c_name ";

        const param = [];

        //여기서 WHERE 절 추가 stack 은 따로
        if(colleage !== "*" || category !== "*" || semeter !== "*"){
            SQL += "WHERE ";
        }
        
        if(colleage !== "*"){
            SQL += "rm.collage = ? ";
            param.push(colleage);
        }
        if(category !== "*"){
            if(param.length !== 0)
                SQL += "and "
                
            SQL += "rm.category = ? ";
            
            param.push(category);
        }
        if(semeter !== "*"){
            if(param.length !== 0)
                SQL += "and "
            SQL += "rm.semeter = ? ";
            param.push(semeter);
        }

        SQL += "ORDER  BY c_name; ";

        const connection = db.return_connection();
        
        let subject_array = [];

        connection.query(SQL,param,function(err,results,field){
            if(stack !== "*"){
                results.map(result=>{
                    for(let i=0;i<stack.length;i++){
                        if(result.stack.indexOf(stack[i]+'\r')!== -1){
                            //정규식 이용하여 \r 제거 후 split으로 배열로 변환
                            result.stack = result.stack.replace(/(?:\r\n|\r|\n)/g, '').split(',');
                            subject_array.push(result);
                            break;
                        }
                    }
                })
            }
            else subject_array = results;
            return res.status(200).json({
                results: subject_array
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

router.post('/subject/intro',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const category = req.body.category;
        const semeter = req.body.semester;
        const department = req.body.department;
        const c_name = req.body.c_name;

        let SQL = "SELECT bbgs.*, rm.collage, rm.department, rm.semeter, rm.track ";
        SQL += "FROM (SELECT cl.numbering, bgs.*, cl.instruction ";
        SQL += "FROM (SELECT gj.c_name, gj.category,Group_concat(gj.job) AS job, gs.stack ";
        SQL += "FROM   (SELECT ct.c_name, Group_concat(ct.stack) AS stack ";
        SQL += "FROM   course_tag ct ";
        SQL += "GROUP  BY ct.c_name) AS gs ";
        SQL += "JOIN (SELECT ct.c_name, jt.* ";
        SQL += "FROM   course_tag ct JOIN job_tag jt ON jt.stack = ct.stack) AS gj ON gj.c_name = gs.c_name ";
        SQL += "GROUP  BY gj.c_name, gj.category) AS bgs JOIN course_list cl ON cl.c_name = bgs.c_name) AS bbgs ";
        SQL += "JOIN re_main rm ON rm.c_name = bbgs.c_name ";

        const param = [];

        //여기서 WHERE 절 추가 stack 은 따로
        if(colleage !== "*" || category !== "*" || semeter !== "*" || c_name !== "*" || department !== "*"){
            SQL += "WHERE ";
        }
        
        if(colleage !== "*"){
            SQL += "rm.collage = ? ";
            param.push(colleage);
        }
        if(category !== "*"){
            if(param.length !== 0)
                SQL += "and "
                
            SQL += "rm.category = ? ";
            
            param.push(category);
        }
        if(semeter !== "*"){
            if(param.length !== 0)
                SQL += "and "
            SQL += "rm.semeter = ? ";
            param.push(semeter);
        }

        if(c_name !== "*"){
            if(param.length !== 0)
                SQL += "and "
            SQL += "rm.c_name = ? ";
            param.push(c_name);
        }

        if(department !== "*"){
            if(param.length !== 0)
                SQL += "and "
            SQL += "rm.department = ? ";
            param.push(department);
        }

        SQL += "ORDER  BY c_name; ";

        let subject_array = [];

        const connection = db.return_connection();
        
        connection.query(SQL,param,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                })
            }
            if(stack !== "*"){
                results.map(result=>{
                    for(let i=0;i<stack.length;i++){
                        if(result.stack.indexOf(stack[i]+'\r')!== -1){
                            //정규식 이용하여 \r 제거 후 split으로 배열로 변환
                            result.stack = result.stack.replace(/(?:\r\n|\r|\n)/g, '').split(',');
                            subject_array.push(result);
                            break;
                        }
                    }
                })
            }
            else subject_array = results;
            return res.status(200).json({
                results: subject_array
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