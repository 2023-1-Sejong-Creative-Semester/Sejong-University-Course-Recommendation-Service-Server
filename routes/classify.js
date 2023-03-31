const router = require('express').Router();
const db = require('../db');


router.get('/job',async(req,res)=>{
    const colleage = (req.body.colleage !== undefined?req.body.colleage:'*');
    const department = (req.body.department !== undefined?req.body.department:'*');
    const language = (req.body.language !== undefined?req.body.language:'*');
    const category = (req.body.category !== undefined?req.body.category:'*');

    const connection = db.return_connect();

    let SQL = "Select * from re_main where collage = ? and department = ? and json_contains('track',?,'$.stack')";
    connection.query(SQL,colleage, department, track,function(err,results,field){
        console.log(results);
    })

})

router.get('/subject',async(req,res)=>{
    const colleage = (req.body.colleage !== undefined?req.body.colleage:'*');
    const department = (req.body.department !== undefined?req.body.department:'*');
    const track = (req.body.track !== undefined?req.body.track:'*');
    const semester = (req.body.semester !== undefined?req.body.semester:'*');

    let SQL = "Select * from re_main where collage = ? and department = ? and semester = ?and json_contains('track',?,'$.stack')";
    connection.query(SQL,colleage, department, semester, track,function(err,results,field){
        console.log(results);
    })
})