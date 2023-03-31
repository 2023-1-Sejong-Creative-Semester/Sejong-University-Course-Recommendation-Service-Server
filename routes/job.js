const router = require('express').Router();

//직업 소개
router.get('/introduce',async(req,res)=>{

    const job = req.query.job;

    switch(job){
        case "전자정보통신공학대학":
            const track = req.query.track;
            let SQL = "Select * from job_list where json_contains(`data`, '1112', '$.players')";
            break;
        case "소프트웨어융합대학":
            const department = req.query.department;
            break;
        default:
            return res.status(500).json({
                error: "undefined job Name"
            })
    }
    let intro, roadmap, language = [];

    switch (job){
        case "Front":
            //나중에 DB 값 불러오기
            intro = "프론트엔드 개발자는 ~~";
            language = ["javascript"];
            roadmap = "https://roadmap.sh/" + job;
            break;
            
        case "Backend":
            //나중에 DB 값 불러오기
            intro = "백엔드 개발자는 ~~";
            language = ["javascript", "JAVA", "Python"];
            roadmap = "https://roadmap.sh/" + job;
            break;
            
        case "App":
            //나중에 DB 값 불러오기
            intro = "어플리케이션 개발자는 ~~";
            language = ["Swift", "JAVA", "Kotiln"];
            roadmap = "https://roadmap.sh/" + job;
            break;

        case "AI":
            //나중에 DB 값 불러오기
            intro = "인공지능 개발자는 ~~";
            language = ["Python", "JAVA", "javascript", "R", "Scala"];
            roadmap = "https://roadmap.sh/" + job;
            break;
    }

    return res.json({
        intro: intro,
        language: language,
        roadmap: roadmap
    })

});


module.exports = router;