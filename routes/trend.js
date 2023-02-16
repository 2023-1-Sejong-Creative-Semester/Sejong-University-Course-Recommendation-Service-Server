const router = require('express').Router();

//개발 언어 트렌드
router.get('/trend',async(req,res)=>{

    language = ["Java", "javascript", "aws"];
    tech = ["Backend", "Front", "SW/Solution"];
    
    res.json({
        language: language,
        tech: tech
    })

});

module.exports = router;