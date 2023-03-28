const router = require('express').Router();
const db = require('../db');

router.get('/introduce', async(req,res)=>{
    const connection = db.return_connection();
    let SQL = "select * from language;";

    res.json({
        d_name: "전자정보통신공학과",
        d_name_e: "Electronic Information Communication",
        introduce: "전자정보통신공학과 입니다.",
        tag : ["하드웨어","C","반도체"],
        logo: "url"
    })

    /*
    connection.query(SQL,function(err,results,field){

    })
    */
})
