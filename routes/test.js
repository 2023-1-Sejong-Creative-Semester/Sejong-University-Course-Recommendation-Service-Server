const router = require('express').Router();
const db = require('../db');

//메인 페이지 로드맵
router.get('/',async(req,res)=>{
    const SQL = "Select name from roadmap;";

    const connection = db.return_connection();

    await connection.query(SQL,function(err,results,field){
        if(err){
            console.error(err);
            return res.status(401).json({
                SQL: "SQL Error"
            });
        }
        results.map(element=>{
            const c = "?";
            let SQL1 = "update roadmap set logo = ";
            SQL1 += "'https://github.com/2023-1-Sejong-Creative-Semester/Sejong-University-Course-Recommendation-Service-Server/blob/main/image/roadmap/";
            SQL1 += encodeURIComponent(element.name);
            SQL1 += ".png?raw=type'";
            SQL1 += " where name = '" + element.name + "'";
            connection.query(SQL1,function(err,results,field){
                if(err){
                    console.error(err);
                }

            })
        })
    })

    return res.status(200).json({});
});

module.exports = router;