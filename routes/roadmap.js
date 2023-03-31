const router = require('express').Router();

//로드맵
router.get('/roadmap',async(req,res)=>{

    let roadmap = "https://roadmap.sh/";

    if(req.query.job !== undefined){
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
                roadmap += "blockchain";
                break;
            case "QA":
                roadmap += req.query.job;
                break;
            case "Software Architect":
                roadmap += "software-architect";
                break;
            default:
                return res.status(500).json({
                    error: "No Such Job Roadmap"
                })
        }
    }
    
    else if(req.query.techstack !== undefined){
        switch(req.query.techstack){
            case "ASP.NET Core":
            roadmap += req.query.job;
            break;
            case "Flutter":
                roadmap += req.query.job;
                break;
            case "Cyber Security":
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
            case "System Design":
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
                    error: "No Such Stack Roadmap"
                })
        }
    }
    

    return res.status(200).json({
        roadmap: roadmap
    })

});

module.exports = router;