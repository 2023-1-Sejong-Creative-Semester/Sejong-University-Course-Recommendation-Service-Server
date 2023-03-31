const router = require('express').Router();
const db = require('../db');

//개발 언어 트렌드
router.get('/',async(req,res)=>{

    const connection = db.return_connection();
    const SQL = "Select * from trend";

    recruit_language = ["Java", "javascript", "aws"];
    recruit_tech = ["서버/백엔드", "프론트엔드", "SW/솔루션"];

    search_language = ["Java", "React", "spring boot"];
    search_tech = ["Flutter", "Java", "프론트엔드"];
    
    return res.json({
        recruit:{
            language: recruit_language,
            tech: recruit_tech
        },
        search: {
            language: search_language,
            tech: search_tech
        }
    })

});

module.exports = router;