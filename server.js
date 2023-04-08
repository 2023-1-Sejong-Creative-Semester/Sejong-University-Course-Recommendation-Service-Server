const express = require('express');
const app = express();
const db = require('./db');
const port = 3001;
const bodyParser = require('body-parser');

const collect = require('./collect');
const collection = new collect();

app.use(bodyParser.json());

//const jobRouter = require('./routes/job');
//const subjectRouter = require('./routes/subject');

const roadmapRouter = require('./routes/roadmap');
const trendRouter = require('./routes/trend');
const introRouter = require('./routes/introduce');
const classifyRouter = require('./routes/classify');
const activityRouter = require('./routes/activity');

//app.use('',subjectRouter);

app.use('/roadmap',roadmapRouter);
app.use('/trend',trendRouter);
app.use('/introduce',introRouter);
app.use('/classify',classifyRouter);
app.use('/activity',activityRouter);

db.connect();

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

setInterval(async function () {

    function readfun() {
        return new Promise((res, rej) => {
            res(collection.refreshstart());
        })
    }
    readfun();

}, 3600000*24); //24시간마다 두드림 크롤링

