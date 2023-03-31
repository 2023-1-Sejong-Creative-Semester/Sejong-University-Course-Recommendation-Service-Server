const router = require('express').Router();
const db = require('../db');

//로드맵
router.get('/roadmap',async(req,res)=>{

    const roadmap = "https://roadmap.sh/";

    let limit_date = new Date().getDate();
    console.log(limit_date);

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
            return res.status(400).json({
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

    

});

module.exports = router;