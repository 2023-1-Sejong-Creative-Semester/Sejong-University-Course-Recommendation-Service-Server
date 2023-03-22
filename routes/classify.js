const router = require('express').Router();
const db = require('../db');


router.get('job?colleage&classify&occupation',async(req,res)=>{
    let SQL = "Select * from subject where c_name = (";
    SQL += "Select c_name from tag where json_contains('data',?,'$.')";
    SQL = ");";
    
    const connection = db.return_connect();

    connection.query(SQL,)
})

router.get('subject?colleage&classify&occupation&Semester',async(req,res)=>{
    
})