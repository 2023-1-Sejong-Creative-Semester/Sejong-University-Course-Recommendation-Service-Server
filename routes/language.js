const router = require('express').Router();
const db = require('../db');
const { connect } = require('./subject');

router.get('/introduce', async(req,res)=>{
    const connection = db.return_connection();
    let SQL = "select * from language;";

    res.json({
        l_name: "C언어",
        l_name_e: "C_lang",
        introduce: "C언어 소개입니다.",
        tag : ["C","IoT","임베이드"],
        logo: "url"
    })

    /*
    connection.query(SQL,function(err,results,field){
        const language = JSON.parse(results);
        
    })
    */
})