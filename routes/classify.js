const router = require('express').Router();
const db = require('../db');
const { param, route } = require('./introduce');


router.post('/job',async(req,res)=>{
    try{
        const colleage = req.body.colleage;
        const track = req.body.track;
        const language = req.body.language;
        const category = req.body.category;

        let param2;
        let SQL = "Select * from job_list where";
    
        //param 어캐줄 지 생각
        switch(colleage){
            case "전자정보통신공학대학":
                SQL += "joblist.job = (select distinct(job_tag.job) from job_tag where stack LIKE ? and job_list.job = job_tag.job)";
                SQL += " and cotegory = ?;";
                param2 = track + '\r';
                break;
            case "소프트웨어융합대학":
                SQL += "joblist.job = (select distinct(job_tag.job) from job_tag where stack LIKE ? and job_list.job = job_tag.job)";
                param2 = language + '\r';
                SQL += " and cotegory = ?;";
            default:
                break;
        }
    
        const connection = db.return_connection();
    
        
        connection.query(SQL,[param2, category],function(err,results,field){
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
    const department = (req.body.department !== undefined?req.body.department:'*');
    const track = (req.body.track !== undefined?req.body.track:'*');
    const semester = (req.body.semester !== undefined?req.body.semester:'*');

    let SQL = "Select * from re_main where collage = ? and department = ? and semester = ?and json_contains('track',?,'$.stack')";
    connection.query(SQL,colleage, department, semester, track,function(err,results,field){
        console.log(results);
    })
})

module.exports = router;