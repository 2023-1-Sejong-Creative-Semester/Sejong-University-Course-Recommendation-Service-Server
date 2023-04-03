const router = require('express').Router();
const db = require('../db');


router.get('/job',async(req,res)=>{
    try{
        const colleage = req.body.colleage;
        const track = req.body.track;
        const language = req.body.language;
        const category = req.body.category;
    
        let SQL = "Select * from job_list where";
    
        //param 어캐줄 지 생각
        switch(colleage){
            case "전자정보통신공학대학":
                SQL += "joblist.job = (select job_tag.job from job_tag where stack = ? and job_list.job = job_tag.job)";
                break;
            case "소프트웨어융합대학":
                SQL += "joblist.job = (select job_tag.job from job_tag where stack = ? and job_list.job = job_tag.job)";
            default:
                break;
        }

        
    
    
    
        const connection = db.return_connect();
    
        
        connection.query(SQL,colleage, department, track,function(err,results,field){
            console.log(results);
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
    const department = (req.body.department !== undefined?req.body.department:'*');
    const track = (req.body.track !== undefined?req.body.track:'*');
    const semester = (req.body.semester !== undefined?req.body.semester:'*');

    let SQL = "Select * from re_main where collage = ? and department = ? and semester = ?and json_contains('track',?,'$.stack')";
    connection.query(SQL,colleage, department, semester, track,function(err,results,field){
        console.log(results);
    })
})