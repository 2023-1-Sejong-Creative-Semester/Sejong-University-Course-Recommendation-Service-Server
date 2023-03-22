const router = require('express').Router();

//로드맵
router.get('/roadmap',async(req,res)=>{

    let roadmap = "https://roadmap.sh/";

    switch(req.query.job){
        case "Frontend":
            roadmap += req.query.job;
            break;
        case "Backend":
            roadmap += req.query.job;
            break;
        case "DevOps":
            roadmap += req.query.job;
            break;
        case "DBA":
            roadmap += req.query.job;
            break;
        case "Blockchain":
            roadmap += req.query.job;
            break;
        case "QA":
            roadmap += req.query.job;
            break;
        case "Software Architect":
            roadmap += req.query.job;
            break;
        case "ASP.NET Core":
            roadmap += req.query.job;
            break;
        case "Flutter":
            roadmap += req.query.job;
            break;
        case "Cyber Securiry":
            roadmap += req.query.job;
            break;
        case "Computer Science":
            roadmap += req.query.job;
            break;
        case "React":
            roadmap += req.query.job;
            break;
        case "Angular":
            roadmap += req.query.job;
            break;
        case "Vue":
            roadmap += req.query.job;
            break;
        case "JavaScript":
            roadmap += req.query.job;
            break;
        case "Node.js":
            roadmap += req.query.job;
            break;
        case "TypeScript":
            roadmap += req.query.job;
            break;
        case "Python":
            roadmap += req.query.job;
            break;
        case "System Desing":
            roadmap += req.query.job;
            break;
        case "Java":
            roadmap += req.query.job;
            break;
        case "Spring Boot":
            roadmap += req.query.job;
            break;
        case "Go Roadmap":
            roadmap += req.query.job;
            break;
        case "GraphQL":
            roadmap += req.query.job;
            break;
        case "Desing and Architecture":
            roadmap += req.query.job;
            break;
        case "Design System":
            roadmap += req.query.job;
            break;
        case "Kubernetes":
            roadmap += req.query.job;
            break;
        case "MongoDB":
            roadmap += req.query.job;
            break;
        default:
            return res.status(500).json({
                error: "No Roadmap"
            })
    }

    return res.status(200).json({
        roadmap: roadmap
    })

});

module.exports = router;