const router = require('express').Router();

//과목 소개
router.get('/subject',async(req,res)=>{

    const job = req.query.job;

    let subject = [];

    switch (job){
        case "Front":
            subject = ["웹프로그래밍", "XML프로그래밍", "멀티미디어" ,"컴퓨터그래픽스", "데이터베이스"];
            break;
            
        case "Backend":
            //나중에 DB 값 불러오기
            subject = ["웹프로그래밍", "문제해결및실습: JAVA", "오픈소스SW개론", "데이터베이스"];
            break;
            
        case "App":
            //나중에 DB 값 불러오기
            subject = ["웹프로그래밍", "문제해결및실습: JAVA", "멀티미디어", "데이터베이스", "XML프로그래밍"];
            break;

        case "AI":
            //나중에 DB 값 불러오기
            subject = ["이산수학및프로그래밍", "선형대수및프로그래밍", "확률통계및프로그래밍", "인공지능", "패턴인식"];
            break;
    }

    return res.json({
        subject: subject
    })

});

module.exports = router;