const router = require('express').Router();
const db = require('../db');
const mysql = require('mysql');

router.post('/job',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods",["GET","POST"]);
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const category = req.body.category;

        let SQL = "Select job_list.*, replace((select group_concat(distinct stack) from job_tag where job_list.job = job_tag.job),'\r','') as stack from job_list ";
        SQL += "where job_list.job = ";
        SQL += "( select distinct(job_tag.job) from job_tag where job_list.job = job_tag.job )";
        
        //대학이 분류된 경우
        if(colleage === "전자정보공학대학"){
            SQL += " and category REGEXP '전자|정보/통신";
        }
        //대분류가 있는 경우 where절에 category 검색 추가
        if(category !== "*"){
            SQL += " and category REGEXP ? ";
        }

        SQL += " order by category desc, job ";
    
        const connection = db.return_connection();
        
        //stack 배열 포함된 친구 있는 지 비교

        let job_array = [];

        connection.query(SQL,[category],function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                });
            }
            
                results.map(result=>{
                    
                    if(result.stack != null){
                        console.log( result.stack);
                        result.stack = result.stack.split(',');
                    }
                    

                    result.instruction = ({
                        long_script : result.long_script,
                        short_script: result.short_script
                    });
                    delete result.long_script;
                    delete result.short_script;
                    
                    if(stack !== "*"){
                        for(let i=0;i<stack.length;i++){
                            if(result.stack.indexOf(stack[i])!== -1){
                                //정규식 이용하여 \r 제거 후 split으로 배열로 변환
                                job_array.push(result);
                                break;
                            }
                        }
                    }
                })
            if(stack === "*") job_array = results;
            
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
    res.header("Access-Control-Allow-Methods",["GET","POST"]);
    try{
        const job = req.body.job;
        const category = req.body.category;
        
        let job_info;
        let stack = [];

        const SQL1 = "Select * from job_list where job = ? and category = ?; ";
        const SQL1s = mysql.format(SQL1, [job,category]); 

        const SQL2 = "Select group_concat(distinct stack) as stack from job_tag where job = ?; ";
        const SQL2s = mysql.format(SQL2, [job]); 


        const SQL3 = "Select * from course_tag;";
        const SQL3s = mysql.format(SQL3);


        let SQL4 = "select collage, c_stack.c_name, department, replace(stack,'\r','') as stack, semeter, credit, long_script, short_script ";
        SQL4 += "from( select group_concat(distinct collage) as collage, c_t.c_name, group_concat(concat(department, concat(' ',c_type))) as department, stack, ";
        SQL4 += "group_concat(distinct semeter) as semeter, group_concat(distinct c_type) as c_type, group_concat(distinct credit) as credit "
        SQL4 += "from( select c_name, group_concat(stack) as stack from course_tag group by c_name ) as c_t ";
        SQL4 += "join re_main on re_main.c_name = c_t.c_name group by c_t.c_name ) as c_stack join course_list on course_list.c_name = c_stack.c_name;";

        const connection = db.return_connection();

        await connection.query(SQL1s,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                });
            }
                   
            results[0].instruction = {
                long_script: results[0].long_script,
                short_script: results[0].short_script
            }
            delete results[0].long_script;
            delete results[0].short_script;
            
            job_info = results[0];

        })

        await connection.query(SQL2s,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                });
            }

            /*
            if(results[0].stack != null){

            }
            */

            results[0].stack = results[0].stack.replace(/(?:\r\n|\r|\n)/g, '').split(',');
            stack = results[0].stack;

        })


        await connection.query(SQL4,async function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                });
            }

            const subject = [];
            await results.map((element,idx)=>{                
                element.stack = element.stack.split(',');
                for(let i=0;i<element.stack.length;i++){
                    if(stack.includes(element.stack[i])){
                        element.instruction = ({
                            long_script : element.long_script,
                            short_script: element.short_script
                        });

                        delete element.long_script;
                        delete element.short_script;

                        element.department = element.department.split(',');
                        element.numbering = idx;
                        subject.push({
                            element: element 
                        });
                        break;;
                    }
                }
            })

            return res.status(200).json({
                job_info: job_info,
                stack: stack,
                subject: subject
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
    res.header("Access-Control-Allow-Methods",["GET","POST"]);
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const semeter = req.body.semester;

        let SQL = "select collage, c_stack.c_name, department, replace(stack,'\r','') as stack, semeter, credit, long_script, short_script, image, ";
        SQL += "( SELECT group_concat(DISTINCT jt.category) AS category FROM course_tag ct JOIN job_tag jt ON replace(jt.stack,'\r','') = replace(ct.stack,'\r','') and replace(jt.stack,'\r','') != '' and replace(ct.stack,'\r','') != '' GROUP BY ct.c_name having ct.c_name = c_stack.c_name )as category "
        SQL += "from( select group_concat(distinct collage) as collage, c_t.c_name, group_concat(concat(department, concat(' ',c_type))) as department, stack, ";
        SQL += "group_concat(distinct semeter) as semeter, group_concat(distinct c_type) as c_type, group_concat(distinct credit) as credit "
        SQL += "from( select c_name, group_concat(stack) as stack from course_tag group by c_name ) as c_t ";
        SQL += "join re_main on re_main.c_name = c_t.c_name group by c_t.c_name ) as c_stack join course_list on course_list.c_name = c_stack.c_name ";

        const param = [];

        //여기서 WHERE 절 추가 stack 은 따로
        if(colleage !== "*" || semeter !== "*"){
            SQL += "WHERE ";
        }
        
        if(colleage !== "*"){
            SQL += "collage REGEXP ? ";
            param.push(colleage);
        }
        if(semeter !== "*"){
            if(param.length !== 0)
                SQL += "and "
            SQL += "semeter REGEXP ? ";
            param.push(semeter);
        }

        const connection = db.return_connection();
        
        let subject_array = [];

        connection.query(SQL,param,function(err,results,field){
            //console.log(results);
            results.map((result,idx)=>{
                result.department = result.department.split(',');
                result.instruction = {
                    long_script : result.long_script,
                    short_script: result.short_script
                };

                delete result.long_script;
                delete result.short_script;

                console.log(result);

                if(result.stack != null){
                    result.stack = result.stack.split(',').filter(stack=> stack !== '');
                }
                

                if(result.category != null)result.category = result.category.split(',');
                else result.category = [];

                result.numbering = idx+1;
                if(stack !== "*"){
                    for(let i=0;i<stack.length;i++){
                        if(result.stack.indexOf(stack[i]) !== -1){
                            //정규식 이용하여 \r 제거 후 split으로 배열로 변환
                            subject_array.push({
                                element: result
                            });
                            break;
                        }
                    }
                }
                else{
                    subject_array.push({
                        element: result
                    })
                }
            })
            
            return res.status(200).json({
                subject: subject_array
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
    res.header("Access-Control-Allow-Methods",["GET","POST"]);
    try{
        const colleage = req.body.colleage;
        const stack = req.body.stack;
        const category = req.body.category;
        const semeter = req.body.semester;
        const c_name = req.body.c_name;

        let SQL1 = "select collage as collage, c_stack.c_name, image, ";
        SQL1 += "( SELECT group_concat(DISTINCT jt.category) AS category FROM course_tag ct JOIN job_tag jt ON jt.stack = ct.stack GROUP BY ct.c_name having ct.c_name = c_stack.c_name )as category,"
        SQL1 += " department, replace(stack,'\r','') as stack, semeter, credit, long_script, short_script ";
        SQL1 += "from( select group_concat(distinct collage) as collage, c_t.c_name, group_concat(concat(department, concat(' ',c_type))) as department, stack, ";
        SQL1 += "group_concat(distinct semeter) as semeter, group_concat(distinct c_type) as c_type, group_concat(distinct credit) as credit "
        SQL1 += "from( select c_name, group_concat(stack) as stack from course_tag group by c_name ) as c_t ";
        SQL1 += "join re_main on re_main.c_name = c_t.c_name group by c_t.c_name ) as c_stack join course_list on course_list.c_name = c_stack.c_name ";
        
        const param = [];

        //여기서 WHERE 절 추가 stack 은 따로
        if(colleage !== "*" || semeter !== "*" || c_name !== "*"){
            SQL1 += "WHERE ";
        }
        
        if(colleage !== "*"){
            SQL1 += "collage = ? ";
            param.push(colleage);
        }
        if(semeter !== "*"){
            if(param.length !== 0)
                SQL1 += "and "
            SQL1 += "semeter = ? ";
            param.push(semeter);
        }
        if(c_name !== "*"){
            if(param.length !== 0)
                SQL1 += "and "
            SQL1 += "c_stack.c_name = ? ";
            param.push(c_name);
        }


        let subject_info = {};

        const connection = db.return_connection();
        
        await connection.query(SQL1,param,function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                })
            }

            results[0].department = results[0].department.split(',');

            results[0].instruction = {
                long_script: results[0].long_script,
                short_script: results[0].short_script
            }
            delete results[0].long_script;
            delete results[0].short_script;

            if(results[0].stack != null){
                results[0].stack = results[0].stack.split(',').filter(stack=> stack !== '');    
            }

            if(results[0].category != null)results[0].category = results[0].category.split(',');
                else results[0].category = [];

            results[0].numbering = 0;

            subject_info = results[0];


        });


        let SQL2 = "select numbering, category, long_script, short_script, image, job_stack.* ";
        SQL2 += "from job_list join( select replace(group_concat(distinct(stack)),'\r','') as stack, job ";
        SQL2 += "from job_tag group by job ) as job_stack on job_list.job = job_stack.job ";
        SQL2 += "where category = ? order by job asc"

        await connection.query(SQL2,[category],function(err,results,field){
            if(err){
                console.error(err);
                return res.status(401).json({
                    error: err
                })
            }

            results.map(result=>{
                result.instruction = ({
                        long_script : result.long_script,
                        short_script: result.short_script
                });
                delete result.long_script;
                delete result.short_script;
                if(typeof result.stack === "array")result.stack = result.stack.split(',');
            })

            return res.status(200).json({
                element: subject_info,
                job: results
            })
        });

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            error: err.toString()
        })
    }
})

module.exports = router;