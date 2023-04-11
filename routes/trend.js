const router = require('express').Router();
const db = require('../db');

//개발 언어 트렌드
router.get('/',async(req,res)=>{

    //const connection = db.return_connection();
    //const SQL = "Select * from trend";

    recruit_stack = ["Java", "javascript", "aws"];
    recruit_job = ["서버/백엔드", "프론트엔드", "SW/솔루션"];

    search_stack = ["Java", "React", "spring boot"];
    search_job = ["Flutter", "Java", "프론트엔드"];
    
    return res.json({
        recruit:{
            stack: recruit_stack,
            job: recruit_job
        },
        search: {
            stack: search_stack,
            job: search_job
        }
    })

});

module.exports = router;