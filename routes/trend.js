const router = require('express').Router();
const db = require('../db');

//개발 언어 트렌드
router.get('/',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    //const connection = db.return_connection();
    //const SQL = "Select * from trend";

    recruit_stack = ["Java", "javascript", "aws"];
    recruit_stack_logo = [];
    recruit_stack_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/JAVA.png?raw=true");
    recruit_stack_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/JAVASCRIPT.png?raw=true");
    recruit_stack_logo.push("https://velog.velcdn.com/images/jjimgo2/post/42cbd74e-fd15-45d0-8639-1feac5c753a0/image.png");
    
    recruit_job = ["서버/백엔드", "프론트엔드", "SW/솔루션"];
    recruit_job_logo = [];
    recruit_job_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/job/%EC%84%9C%EB%B2%84%20%EA%B0%9C%EB%B0%9C%EC%9E%90.png?raw=true");
    recruit_job_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/job/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EA%B0%9C%EB%B0%9C%EC%9E%90.png?raw=true");
    recruit_job_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/job/%EC%86%94%EB%A3%A8%EC%85%98%20%EA%B0%9C%EB%B0%9C%EC%9E%90.jpg?raw=true");

    search_stack = ["Java", "React", "spring boot"];
    search_stack_logo = [];
    search_stack_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/JAVA.png?raw=true");
    search_stack_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/REACT.png?raw=true");
    search_stack_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/SPRING%20Boot.png?raw=true");

    search_job = ["Flutter", "Java", "프론트엔드"];
    search_job_logo = [];
    search_job_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/Flutter.png?raw=true");
    search_job_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/JAVA.png?raw=true");
    search_job_logo.push("https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/job/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EA%B0%9C%EB%B0%9C%EC%9E%90.png?raw=true");
    
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