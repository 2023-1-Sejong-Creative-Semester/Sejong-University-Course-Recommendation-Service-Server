const router = require('express').Router();

//로드맵
router.get('/roadmap',async(req,res)=>{

    const roadmap = "https://roadmap.sh/" + req.query.job;

    res.json({
        roadmap: roadmap
    })

});

module.exports = router;