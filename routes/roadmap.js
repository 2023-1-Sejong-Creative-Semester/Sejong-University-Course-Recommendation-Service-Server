const router = require('express').Router();
const db = require('../db');

//메인 페이지 로드맵
router.get('/main',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const roadmap = "https://roadmap.sh/";

        let limit_date = new Date().getDate();
            
        const arr = Array(6).fill();
        for(i=0;i<6;i++){
            if(limit_date>30)limit_date = 1;
            arr[i] = (limit_date-1);
            limit_date++;
        }
    
        const SQL = "select * from roadmap;";
        const connection = db.return_connection();
    
        connection.query(SQL,function(err,results,field){
            if(err){
                console.log(err.toString());
                return res.status(401).json({
                    error: err.toString()
                })
            }
            const list = [];
            arr.map(index=>{
                list.push(results[index]);
            })
    
            return res.status(200).json({
                homepage: roadmap,
                roadmap: list
            })
        })
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

});

//로드맵 세부 페이지
router.get('/detail',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const homepage = "https://roadmap.sh/";
        const index = parseInt(req.query.index);

        //현재 로드맵이 30개만 제공
        if(index>3){
            return res.status(402).json({
                error: "현재 로드맵 페이지는 3개만 제공"
            })
        }
        const SQL = "select * from roadmap order by numbering;";
        const connection = db.return_connection();
    
        connection.query(SQL,function(err,results,field){
            if(err){
                console.log(err.toString());
                return res.status(400).json({
                    error: err.toString()
                })
            }
            
            const roadmap = [];
            for(let i = (index-1)*10;i<(index)*10 && i<results.length;i++){
                roadmap.push(results[i]);
            }
            return res.status(200).json({
                homepage: homepage,
                roadmap: roadmap
            })
        })
    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

})

//로드맵 세부 페이지
router.post('/job',async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    try{

        const job = req.body.job;   //한글로 들어옴
        const category = req.body.category; 
        console.log(job,category);

        const SQL = "select name, numbering, link, logo as image from ( select roadmap from job_roadmap as B where job = ? and category = ? ) as job_roadmap_table join roadmap on job_roadmap_table.roadmap = roadmap.name;";
        
        const connection = db.return_connection();

        await connection.query(SQL,[job, category],async function(err,results,field){
            if(err){
                console.error(err);
                res.status(401).json({
                    error: err
                })
            }
            return res.status(200).json({
                roadmap: results
            })
        })

    }
    catch(err){
        console.error(err.toString());
        return res.status(400).json({
            error: err.toString()
        })
    }

})

module.exports = router;