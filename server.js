const express = require('express');
const app = express();
const db = require('./db');
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');

const collect = require('./collect');
const collection = new collect();

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"))

const roadmapRouter = require('./routes/roadmap');
const trendRouter = require('./routes/trend');
const introRouter = require('./routes/introduce');
const classifyRouter = require('./routes/classify');
const activityRouter = require('./routes/activity');

let corsOptions = {
    origin: ['*', 'null'],
    credentials: true
}

app.use(cors(corsOptions));

app.use('/roadmap',roadmapRouter);
app.use('/trend',trendRouter);
app.use('/introduce',introRouter);
app.use('/classify',classifyRouter);
app.use('/activity',activityRouter); 

db.connect();

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    /*
    res.json({
        success: true,
    });
    */
   res.sendFile(__dirname + "/index.html");
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
    db.connect();
    
}, 3600000*24); //24시간마다 두드림 크롤링 3600000*24


